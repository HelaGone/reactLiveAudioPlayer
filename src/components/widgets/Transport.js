import React from 'react';
import ff from '../../images/fast_forward.svg';
import rwd from '../../images/fast_rewind.svg';

const Transport = (props)=>{
  const {isFF, isRWD, rewind, fastForward} = props;
  return(
    <picture className="transport_control">
        {isFF && <button onClick={ fastForward }><img src={ff} alt="Fast Forward Button"/></button>}
        {isRWD && <button onClick={ rewind }><img src={rwd} alt="Rewind Button"/></button>}
    </picture>
  );
}

export default Transport;
