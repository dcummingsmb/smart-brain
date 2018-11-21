import React from 'react';

const Rank = ({name, entries}) => {
  return(
    <div>
      <div className='white f1' >
        {`Welcome ${name}!`}
      </div>
      <div className='white f3'>
        {`Images scanned: ${entries}`}
      </div>
    </div>
  )
}

export default Rank;