import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../context/ContextUser';
import {signin, handleSignOut} from '../../redux/userSlice';

import './style.css';


const NavBar = () => {
  // const { user, handleSignOut} = useContext(UserContext);
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch();

  const handleSignin = async () => {
    await dispatch(signin());
  }

  const handleLogout = async () => {
    await dispatch(handleSignOut());
  }
  return (
    <div className='navBar__head'>
        <div className='navbar__title__head'>
            <h3 className='navbar__title'>Insta App</h3>
        </div>
        <div className='navbar__btn__head'>
          {!user ? <button type='button' className='navbar__btn' onClick={handleSignin}>Google Sign in</button> : 
          <button type='button' className='navbar__btn__signout' onClick={handleLogout}>Sign Out</button> }
        </div>
    </div>
  )
}

export default NavBar