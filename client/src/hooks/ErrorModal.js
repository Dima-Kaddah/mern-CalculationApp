import React from 'react';
import ErrorGif from '../images/giphy/error.gif';
import Modal from './Modal';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header={<img className='errImg' src={ErrorGif} alt='Error' />}
      show={!!props.error}
      footer={<button className='errBtn' onClick={props.onClear}>Okay</button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
