import React from 'react'
import { useDispatch } from 'react-redux';
import {signin} from '../../redux/userSlice'
import './style.css';

export const Header = () => {
  // const {signin} = useContext(UserContext);
  const dispatch = useDispatch();

  const handleSignin = async (e) => {
    e.preventDefault();
    await dispatch(signin());
  }
  return (
    <div className='header__head'>
        <div className='header__btn__head' onClick={handleSignin}>
            <button type='button' className='header__btn'>Google Sign in</button>
        </div>
        <div className='header__text' style={{ marginLeft: "5px" }}>
            <h4> ? to post Something</h4>
        </div>
    </div>
  )
}
