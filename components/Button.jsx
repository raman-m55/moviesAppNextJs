import React from 'react'

const Button = ({item , style}) => {
  return (
    <div className={`${style}`}>
        {item}
    </div>
  )
}

export default Button