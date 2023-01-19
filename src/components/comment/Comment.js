import React from 'react'
import './style.css';


export const Comment = ({comment}) => {
  return (
    <>
      <div className='comments__section'>
          <span className='comment_username' style={{ fontSize: "14px" }}><b>{comment.username}</b>:</span>
          <p style={{ margin: "0px", padding: "5px 7px", fontSize: "14px"}}>{comment.comment}</p>
      </div> 
      <p style={{ margin: "0px", padding: "5px 7px", fontSize: "9px"}}>{comment.posted}</p>
    </>
    
  )
}
