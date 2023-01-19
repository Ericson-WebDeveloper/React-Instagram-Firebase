import React, { useRef, useState } from 'react'
import './style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from '../../firebase';
import { ref } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Loader from '../Loader/index';
import {addNewPost, SET_ERROR, SET_ERRORS} from '../../redux/postSlice'
import { useDispatch, useSelector } from 'react-redux';
import {SET_LOADING} from '../../redux/postSlice';



export const Form = () => {
  const [caption, setCaption] = useState("");
  const {user} = useSelector(state => state.user);
  const {isLoading} = useSelector(state => state.post);

  const fileRef = useRef("");
  const [image, setImage] = useState(false);
  const imageprev = useRef('');
  // const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch()

  const handlePost = async () => {
    if(fileRef.current.files.length <= 0) {
      alert('Image is required');
      return false;
    }
    if(caption === "") {
      alert('Caption for Post is required');
      return false;
    }
    let ext = fileRef.current.files[0].type.split('/')[1];
    let ImageName = `${uuidv4()}.${ext}`;
    const storageRef = ref(storage, ImageName);
    // 'file' comes from the Blob or File API;
    try {
        dispatch(SET_LOADING(true));
        await dispatch(addNewPost(storageRef, fileRef, ImageName, caption, user.photoURL, user.uid, user.displayName, user.email,
          moment().format('LLLL')));
        setCaption("");
        fileRef.current = '';
        imageprev.current.src = '';
        setImage(false);
    } catch (error) {
      dispatch(error.message ? SET_ERROR({error: error.message}) : SET_ERRORS({errors: error}));
    } finally {
      dispatch(SET_LOADING(false));
    }
  }

  const imagePreview = () => {
    if(fileRef.current.files.length > 0) {
      let url = URL.createObjectURL(fileRef.current.files[0]);
      imageprev.current.src = url; 
      setImage(true)
    } else {
      setImage(false)
    }
  }
  return (
    <div className='form__head'>
        <h3>Creat Post</h3>
        <form>
            <textarea style={{ width:"100%", border: "none" }} value={caption} onChange={(e) => setCaption(e.target.value)} 
            id="" cols="30" rows="5" placeholder='add caption'></textarea>
        </form>
        <div className='img__preview' style={{ display: image ? '' : 'none' }}>
            <img src="" alt="" ref={imageprev} />
        </div>
        <div className='bottom_btn'>
            <input type='file' id='file' ref={fileRef} onChange={imagePreview} style={{ display:"none" }} />
            <label htmlFor="file">
              <CloudUploadIcon className='btn__icon__upload' />
            </label>
            {caption && <button className='btn_upload' onClick={handlePost}>upload</button>}
        </div>

        {isLoading && <Loader />}
    </div>
  )
}
