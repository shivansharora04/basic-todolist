import React from 'react'

const Card = (props) => {
  return (
    <div className='cards'>
      <p>{props.userId}</p>
      <p>{props.id}</p>
      <p>{props.title}</p>
      <p>{props.body}</p>
    </div>
  )
}

export default Card
