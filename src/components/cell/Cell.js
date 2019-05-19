import React from 'react';
import './Cell.css';

function Cell(props) {
  const colorStyle = `cell ${props.value}`
  return (
    <div className={colorStyle} />
  );
}

export default Cell;