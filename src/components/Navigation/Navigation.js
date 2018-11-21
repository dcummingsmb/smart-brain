import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

if (isSignedIn) {
  return(
    //sign out
    <nav className="flex justify-end bb b--white-10">
      <div className="flex-grow pa3 flex items-center">
        <a onClick={() => onRouteChange('signout')} 
          className="f6 dib black b bg-animate hover-bg-white hover-black no-underline pv2 ph3 mh2 br-pill ba b--white-20 bg-light-blue shadow-5 o-80" href="#0">Sign Out</a>
      </div>
    </nav>

  );
} else {
  return(
    //sign out
    <nav className="flex justify-end bb b--white-10">
      <div className="flex-grow pa3 flex items-center">
        <a onClick={() => onRouteChange('signin')} 
          className="f6 dib black b bg-animate hover-bg-white hover-black no-underline pv2 ph3 mh2 br-pill ba b--white-20 bg-light-blue shadow-5 o-80" href="#0">Sign In</a>
        <a onClick={() => onRouteChange('register')} 
          className="f6 dib black b bg-animate hover-bg-white hover-black no-underline pv2 ph3 mh2 br-pill ba b--white-20 bg-light-blue shadow-5 o-80" href="#0">Register</a>
      </div>
    </nav>

  );
}

  
/*
  if (isSignedIn){
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signout')} classNameName='f4 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'>SignIn</p>
        <p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
*/
}

export default Navigation;