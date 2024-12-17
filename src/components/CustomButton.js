import React from 'react'

const CustomButton = ({
  className,
  buttonName,
  customOnclick
}) => {


  return (
    <button className={className} onClick={customOnclick}>
      {buttonName}
    </button>
  )
}

export default CustomButton
