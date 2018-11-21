import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return(
    <div>
      <div className='mw7 center'>
      <p className='f3 b'>
        {'This app finds faces in images. Enter an image URL below and hit "Detect" to try.'}
      </p>
      </div>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' 
            type='text' 
            placeholder='URL' 
            onChange={onInputChange}
          />
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;