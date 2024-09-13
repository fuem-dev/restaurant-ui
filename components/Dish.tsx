

import React from 'react';




interface DishProps {
id: number;
name: string;
description: string;
difficulty: string;
title?: string;  // 'title' es opcional
image?: string;  // 'image' es opcional
onAddToCar: (id: number) => void;  // Función para agregar al carrito
onRemoveFromCar: (id: number) => void;  // Función para remover del carrito
hideButtons?: boolean;  // Propiedad para ocultar los botones
displayAsTable?: boolean;  // Nueva propiedad para mostrar como tabla
}




const Dish: React.FC<DishProps> = ({ title, id, image, difficulty, onAddToCar, onRemoveFromCar, hideButtons, displayAsTable }) => {
// Renderizar como tabla si displayAsTable es true
if (displayAsTable) {
  return (
    <tr>
      <td className="p-4">{id}</td>
      <td className="p-4">{title}</td>
      <td className="p-4">{difficulty}</td>
      <td className="p-4">
        {!hideButtons && (
          <div className="flex space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
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
      </td>
    </tr>
  );
}




// Renderizar como tarjeta si displayAsTable es false o no está presente
return (
  <article className="p-4 card-bg-css shadow-md rounded-md">
    <span className="pt-0 pb-0 pl-4 block mt-2 font-semibold">
      <span className="text-white">Difficulty:</span>
      <span className="text-green-500"> {difficulty}</span>
    </span>
    <figure className="p-4">
      {image && <img src={image} alt="image description" className='rounded-md' />}
      {title && <figcaption className='pt-4 font-bold'>{title}</figcaption>}
    </figure>
    <p className="text-green-500 pl-4">PRICE: {`$ ${id}.00`}</p>




    {/* Botones para agregar y remover, se ocultan si hideButtons es true */}
    {!hideButtons && (
      <div className="flex space-x-4 mt-4 justify-end pr-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
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