import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className='error-popup'>
      <div className='error-popup__content'>
        <button className='error-popup__close' onClick={onClose}>
          &times;
        </button>
        <p className='error-popup__message'>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
