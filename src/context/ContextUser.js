import React, { createContext, useEffect, useReducer } from 'react'
import { initialStateAuth, UserReducers } from '../reducer/UserReducer';
import {signinGoogle, signOutUser} from '../actions/AuthController'
import { auth, db, firebasecollection, firebasegetDocs } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import { collectionGroup } from 'firebase/firestore';
import { initialStatePost, PostReducers } from '../reducer/PostReducer';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';

export const UserContext = createContext();

export const ContextUser = ({children}) => {
    const [user, userdispatch] = useReducer(UserReducers, initialStateAuth);
    const [posts, postdispatch] = useReducer(PostReducers, initialStatePost);

    const signin = async() => {
        try {
            userdispatch({type: 'INITIAL_SIGNIN'});
            let response = await signinGoogle();
            userdispatch({type: 'SET_USER', payload: response.user});
        } catch (error) {
            userdispatch({type: 'SET_ERROR', payload: 'Soemthing wrong in Server'});
        } finally {
            userdispatch({type: 'SIGNIN_FINISH'});
        }
    }

    const authUser = async () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userdispatch({type: 'SET_USER', payload: user});
            } else {
                // User is signed out
                // ...
            }
        });
       
    }

    const getPosts = async () => {
        const querySnapshot = await firebasegetDocs(firebasecollection(db, "post"));
        // console.log(querySnapshot);
        let list = querySnapshot.docs.map((doc) => {
          return{id: doc.id, post: doc.data()};
        });
        postdispatch({type: 'SET_POST', payload: list})
    }

    const postComment = async (comment, id) => {
        try {
            postdispatch({type: 'STATE_INITIATE'});
            let post = await getData(id);
            post.comments.push(comment);
            await setDoc(doc(db, "post", id), {
                ...post
            });
            let newPosts = [...posts.posts]
            let index = newPosts.findIndex((post) => post.id === id);
            newPosts[index].post.comments.push(comment);
            postdispatch({type: "ADD_COMMENT", id, post:newPosts});
        } catch (error) {
            throw Error('we cannot add you comment!');
        } finally {
            postdispatch({type: 'STATE_INITIATE_FINISH'});
        }
    }

    const getData = async (id) => {
        try {
            const docRef = doc(db, "post", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
        } catch {
            console.log("No such document!");
        }
    }

    const deletePost = async (id) => {
        postdispatch({type: 'STATE_INITIATE'});
        await deleteDoc(doc(db, "post", id));
        postdispatch({type: 'STATE_INITIATE_FINISH'});
    }

    const handleSignOut = async() => {
     try {
         await signOutUser();
        userdispatch({type: 'SET_USER', payload: null});
     } catch {
        userdispatch({type: 'SET_USER', payload: null});
     }
    }

    const deleteImage = (imageName) => {
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, imageName);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }

    useEffect(() => {
        authUser();
        getPosts();
    }, [])

    return (
        <UserContext.Provider value={{ user, signin, posts, getPosts, handleSignOut, getData, deletePost, deleteImage, postComment }}>
            {children}
        </UserContext.Provider>
    )
}
