import React from 'react';
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
