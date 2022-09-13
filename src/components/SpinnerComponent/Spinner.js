import React from 'react';
import loading from '../../images/loading.gif';
import './Spinner.css';

export const Spinner = () => {
  return (
    <div className='spinner-container'>
        <img src={loading} alt="Loading..." />
    </div>
  )
}
