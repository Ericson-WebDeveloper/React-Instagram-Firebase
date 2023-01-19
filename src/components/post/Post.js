import React from 'react'
import { Feed } from '../feed/Feed'
import './style.css'


export const Post = ({post}) => {
  return (
    <div className='post__body'>
        <Feed post={post} />
    </div>
  )
}
