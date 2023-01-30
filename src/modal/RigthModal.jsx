import React from 'react';
import './right.scss';

function RightModal({ active, setActive, children }) {
  return (
    <div className={active ? 'modalRigth active' : 'modalRigth'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modalRigth__content active' : 'modalRigth__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setActive(false)}>&times;</button>
        {children}
      </div>
    </div>
  );
}

export default RightModal;
