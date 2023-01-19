import { createSlice } from '@reduxjs/toolkit'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db, firebaseaddDoc, firebasecollection, firebasegetDocs, storage } from '../firebase';

const initialState = {
    posts: [],
    isLoading: false,
    errors: '',
    error: ''
}

export const postSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    STATE_INITIATE: (state) => {
        state.isLoading = true;
    },
    STATE_INITIATE_FINISH: (state) => {
        state.isLoading = false;
    },
    SET_POST: (state, action) => {
        state.posts = action.payload.posts
    },
    ADD_COMMENT: (state, action) => {
        let index = state.posts.findIndex(({id}) => id === action.payload.id);
        let newPosts = [...state.posts];
        newPosts[index].post.comments.push(action.payload.comment);
        state.posts = newPosts;
    },
    SET_ERROR: (state, action) => {
        state.error = action.payload.error
    },
    SET_ERRORS: (state, action) => {
        state.errors = action.payload.errors
    },
    SET_LOADING: (state, action) => {
        state.isLoading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { STATE_INITIATE, STATE_INITIATE_FINISH, SET_POST, ADD_COMMENT, SET_ERRORS, SET_ERROR, SET_LOADING } = postSlice.actions

export const getData = async (id) => {
    try {
        const docRef = doc(db, "post", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw Error('we cannot find the document!');
        }
    } catch {
        throw Error('we cannot find the document!');
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        const querySnapshot = await firebasegetDocs(firebasecollection(db, "post"));
        // console.log(querySnapshot);
        let list = querySnapshot.docs.map((doc) => {
            return {id: doc.id, post: doc.data()};
        }).sort((a, b) => {
            return new Date(b.post.posted) - new Date(a.post.posted)
        });
        dispatch(SET_POST({posts: list}));
    } catch (error) {
        dispatch(error.message ? SET_ERROR({error: error.message}) : SET_ERRORS({errors: error}));
    }
    
}

export const postComment = (comment, id, postsData) => async (dispatch) => {
    try {
     
        dispatch({type: 'STATE_INITIATE'});
        let postEdit = await getData(id);
        postEdit.comments.push(comment);
        await setDoc(doc(db, "post", id), {
            ...postEdit
        });
        dispatch(ADD_COMMENT({comment, id }));
    } catch (error) {
        // console.log(error)
        dispatch(error.message ? SET_ERROR({error: error.message}) : SET_ERRORS({errors: error}));
    } finally {
        dispatch({type: 'STATE_INITIATE_FINISH'});
    }
}

export const addNewPost = (storageRef, fileRef, ImageName, caption, user_photoUrl, uid, username, email, posted) => async (dispatch) => {
    uploadBytes(storageRef, fileRef.current.files[0]).then((snapshot) => {
        getDownloadURL(ref(storage, ImageName))
            .then(async(url) => {
              try {
                const docRef = await firebaseaddDoc(firebasecollection(db, "post"), {
                  caption,
                  image: url,
                  user_photoUrl,
                  // username: user.user.email,
                  uid, 
                  username,
                  email,
                  posted,
                  comments: []
                });
                await dispatch(getPosts());
              } catch (e) {
                dispatch(e.message ? SET_ERROR({error: e.message}) : SET_ERRORS({errors: e}));
              }
            })
            .catch((e) => {
                dispatch(e.message ? SET_ERROR({error: e.message}) : SET_ERRORS({errors: e}));
          });
      });
}

export const deletePost = (id) => async (dispatch) => {
    return await deleteDoc(doc(db, "post", id));
}

export const deleteImage = (imageName) => async (dispatch) => {
    const storage = getStorage();
    const desertRef = ref(storage, imageName);
    return await deleteObject(desertRef)
}

export default postSlice.reducer