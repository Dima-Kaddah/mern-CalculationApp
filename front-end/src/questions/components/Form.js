import React from 'react';

const Form = ({ handleSubmit, answer, onChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='0' value={answer} onChange={onChange} autoFocus />
      <div className='play-btn-container'>
        <button type='submit' className='play-btn btn'>check</button>
      </div>
    </form>
  );
};
export default Form;







