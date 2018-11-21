import React from 'react';
import './FaceRecognition.css';
import Box from '../Box/Box';

const FaceRecognition = ({ box, imageURL }) => {

  const boxArray = box.map((coords, i) => {
    return (
      <Box
        key={i}
        box={coords}
      />
    )
  })

  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='face detection' src={ imageURL } width='500px' height='auto'/>
        {boxArray}
      </div>
    </div>
  )
}

export default FaceRecognition;