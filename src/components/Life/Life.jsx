import React from 'react';
import { IoHeartCircle } from 'react-icons/io5';

const Life = ({ lifeCount }) => {
  return (
    <ul>
      {Array.from({ length: lifeCount }, (_, index) => (
        <li key={index}>
          <IoHeartCircle />
        </li>
      ))}
    </ul>
  );
};

export default Life;
