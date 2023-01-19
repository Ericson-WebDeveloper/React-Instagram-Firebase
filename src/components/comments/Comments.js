import React from 'react'
import { Comment } from '../comment/Comment'

export const Comments = ({comment}) => {
  return (
    <div className='comment__section'>
        {/* <div className='cooment_caption_title'>
          <span>Comment's</span>
        </div> */}
        
        <Comment comment={comment} />
    </div>
  )
}
