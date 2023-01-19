import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '../components/create-post/Form';
import { Header } from '../components/header/Header';
import { Post } from '../components/post/Post';
import { UserContext } from '../context/ContextUser';
import './style.css';
import Loader from '../components/Loader/index';

const Home = () => {
    // const {posts} = useContext(UserContext);
    const {user, isLoading: userLoading, errors} = useSelector(state => state.user);
    const {posts, isLoading: postLoading} = useSelector(state => state.post);
    // const {isLoading, errors} = user;
    if(userLoading || postLoading) {
      return <Loader />
    }
  return (
    <div className='home__body'>
      <div className="home_content" >
        {user ? <Form /> : <Header />}
      </div>
      <div className='home_post_content' style={{ marginTop: "20px" }}>
        {posts.map((post, index) => {
          return (<span key={index}>
            <Post post={post} /> <br />
          </span>)
        }) }
      </div>
      
      <div className='footer'>
        <footer className='footer-basic' style={{ maringBottom: "10px" }}>
            <ul className="list-inline" style={{ display:"flex" }}>
                <li className="list-inline-item"><p>Home</p></li>
                <li className="list-inline-item"><p>Services</p></li>
                <li className="list-inline-item"><p>About</p></li>
                <li className="list-inline-item"><p>Terms</p></li>
                <li className="list-inline-item"><p>Privacy Policy</p></li>
            </ul>
            <p className="copyright">Company Name © 2022</p>
        </footer>
      </div>
    </div>
  )
}

export default Home