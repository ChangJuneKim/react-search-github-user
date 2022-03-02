import React from 'react';

const Item = ({ icon, label, value, color }) => {
  return (
    <article className='item'>
      <span className={color}>{icon}</span>
      <div style={{ textAlign: 'center' }}>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
};

export default Item;
