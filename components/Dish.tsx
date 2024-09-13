

import React from 'react';




interface DishProps {
id: number;
name: string;
description: string;
difficulty: string;
title?: string;  // 'title' is optional
image?: string;  // 'image' is optional
onAddToCar: (id: number) => void;  // Function to add to cart
onRemoveFromCar: (id: number) => void;  // Function to remove from cart
hideButtons?: boolean;  // Property to hide buttons
displayAsTable?: boolean;  // New property to display as table
}




const Dish: React.FC<DishProps> = ({
title,
id,
image,
difficulty,
onAddToCar,
onRemoveFromCar,
hideButtons,
displayAsTable,
}) => {
// Render as table if displayAsTable is true
if (displayAsTable) {
  return (
    <article className="p-4 card-bg-css shadow-md rounded-md">
      <span className="pt-0 pb-0 pl-4 block mt-2 font-semibold text-sm md:text-xs">
        {/* Font size is small on tablets */}
        <span className="text-white">Difficulty:</span>
        <span className="text-green-500"> {difficulty}</span>
      </span>
      <figure className="p-4">
        {image && <img src={image} alt="image description" className="rounded-md" />}
        {title && <figcaption className="pt-4 font-bold text-sm md:text-xs">{title}</figcaption>}
      </figure>
      <p className="text-green-500 pl-4 text-sm md:text-xs">PRICE: {`$ ${id}.00`}</p>
    </article>
  );
}




// Render as card if displayAsTable is false or not present
return (
  <article className="p-4 card-bg-css shadow-md rounded-md">
    <span className="pt-0 pb-0 pl-4 block mt-2 font-semibold text-sm md:text-xs">
      {/* Font size is small on tablets */}
      <span className="text-white">Difficulty:</span>
      <span className="text-green-500"> {difficulty}</span>
    </span>
    <figure className="p-4">
      {image && <img src={image} alt="image description" className="rounded-md" />}
      {title && <figcaption className="pt-4 font-bold text-sm md:text-xs">{title}</figcaption>}
    </figure>
    <p className="text-green-500 pl-4 text-sm md:text-xs">PRICE: {`$ ${id}.00`}</p>




    {/* Buttons to add and remove, hidden if hideButtons is true */}
    {!hideButtons && (
      <div className="flex space-x-4 mt-4 justify-end pr-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => onRemoveFromCar(id)}
        >
          -
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => onAddToCar(id)}
        >
          +
        </button>
      </div>
    )}
  </article>
);
};




export default Dish;