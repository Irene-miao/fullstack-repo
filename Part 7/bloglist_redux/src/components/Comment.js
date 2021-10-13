import React from 'react'
import { useSelector } from 'react-redux'
//import { notify } from '../reducers/notificationReducer'



const Comment = () => {

  const comment = useSelector(state => state.comments)
  console.log(comment)


  return (
    <div>
      <h5>Comments</h5>
      <div>
        <ul>
          {comment.data?.comments.map(comment =>
            <div key={comment.id}>
              <li>{comment.content}</li>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Comment
