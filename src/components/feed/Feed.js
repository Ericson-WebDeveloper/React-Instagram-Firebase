import React, { useState } from 'react'
import './style.css'
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { Comments } from '../comments/Comments';
import moment from 'moment';
import Loader from '../Loader/index'
import { useDispatch, useSelector } from 'react-redux';
import {deletePost, deleteImage, getPosts, postComment, SET_LOADING} from '../../redux/postSlice';
import { toast } from 'react-toastify';
export const Feed = ({post}) => {
    const [comment, setComment] = useState("");
    // const {deletePost, getPosts, deleteImage, postComment} = useContext(UserContext);
    const {user} = useSelector(state => state.user);
    const {isLoading, posts} = useSelector(state => state.post);
    const dispatch = useDispatch()
    const handlingDeletePost = (id) => {
        try {
            dispatch(SET_LOADING(true));
            let imageName = post.post.image.split('/')[7].split('?')[0];
            dispatch(deleteImage(imageName));
             dispatch(deletePost(id));
            dispatch(getPosts());
        } catch (error) {
            toast.error(`Error in Deleting Post. Please try Again`, {
                theme: 'dark',
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
              });
        } finally {
            dispatch(SET_LOADING(false));
        }
    }

    const handlingPostComment = () => {
        try {
           if(comment === "") {
                toast.error(`Comment is required`, {
                    theme: 'dark',
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                  });
                return false;
            }
            let newComment = {
                uid: user.uid, 
                username: user.displayName,
                email: user.email, 
                posted: moment().format('LLLL'),
                comment
            }
            let newPosts = {...posts};            
            dispatch(postComment(newComment, post.id, newPosts));
            setComment("");
        } catch (error) {
            toast.error(`Cannot Post Comment. Please try Again`, {
                theme: 'dark',
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
              });
        }
        
    }

  return (
    <div className='post_feed'>
        <div className="user_post_feed">
            <div className='user_profile_post_feed'>
                <img src={post.post.user_photoUrl} alt="" className='user_image_post w-full' />
                <p style={{ marginLeft: "15px" }}>{post.post.username}</p>
            </div>
            {user && user.uid === post.post.uid ? <div className='post_feed_delete'>
                <button className='post_feed_delete_btn' onClick={() => handlingDeletePost(post.id)}>Delete</button>
            </div> : <></>}
        </div>
        <div className='post_feed_content' style={{ marginBottom: "15px" }}>
            <div className="post_feed_image">
                <img src={post.post.image} alt="" style={{ width:"100%", height: "400px", marginBottom: "10px" }} />
                <span><b>{post.post.caption}</b></span>
            </div>
            <span style={{ fontSize: "10px" }}>{post.post.posted}</span>
        </div>

        <div className="post__comment__feed" style={{ marginBottom:"20px" }}>
            <div className='cooment_caption_title'>
                <span style={{ fontSize: "14px" }}>Comment's</span>
            </div>
            {post.post.comments.map((comment, index) => <Comments key={index} comment={comment} />)}
        </div>

        {user && <div className="post_feed_comment_section">
            <textarea name="" id="" cols="30" rows="3" placeholder='comment here' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <MapsUgcIcon className='comment__btn' onClick={handlingPostComment} />
        </div>}

        {isLoading && <Loader />}
    </div>
  ) 
}
