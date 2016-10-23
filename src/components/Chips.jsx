import React, { PropTypes } from 'react';
import ChipItem from './ChipItem';

export default function Chips({ items, onDelete }) {
  return (
    <div>
      {items.map(item => (
        <ChipItem
          key={item}
          text={item}
          onDelete={onDelete}
        />
    ))}
    </div>
  );
}

Chips.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
};
