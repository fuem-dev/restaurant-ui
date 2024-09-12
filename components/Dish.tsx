import React from 'react';


interface DishProps {
 id: number;
 name: string;
 description: string;
 difficulty: string;
 title: string;  // Make 'title' optional
 image?: string;  // Make 'image' optional
 onAddToCart: (id: number) => void;  // Function to add to cart
 onRemoveFromCart: (id: number) => void;  // Function to remove from cart
}


const Dish: React.FC<DishProps> = ({ title, id, image, difficulty, onAddToCart, onRemoveFromCart }) => {
 return (
   <article className="p-4 card-bg-css shadow-md rounded-md">
     <span className="pt-0 pb-0 pl-4 block mt-2 font-semibold">
 <span className="text-white">Difficulty:</span>
 <span className="text-green-500"> {difficulty}</span>
</span>
     <figure className="p-4">
       <img src={image} alt="image description" className='rounded-md'/>
       <figcaption className='pt-4 font-bold'>{title}</figcaption>
     </figure>
     <p className="text-green-500 pl-4">PRICE: {`$ ${id}.00`}</p>
    
    
     {/* Buttons for Add and Remove */}
     <div className="flex space-x-4 mt-4 justify-end pr-4">
     <button
         className="bg-red-500 text-white px-4 py-2 rounded-md"
         onClick={() => onRemoveFromCart(id)}
       >
         -
       </button>
       <button
         className="bg-green-500 text-white px-4 py-2 rounded-md"
         onClick={() => onAddToCart(id)}
       >
         +
       </button>
     </div>
   </article>
 );
}


export default Dish;