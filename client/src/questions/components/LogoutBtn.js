import React, { useContext } from 'react';
import { AuthContext } from '../../shared/Ath-context';

const LogoutBtn = () => {
  const auth = useContext(AuthContext);

  return (
    auth.token &&
    <div className='logout'>
      <button onClick={auth.logout} className='logout-btn'>Logout</button>
    </div>

  );
};
export default LogoutBtn;