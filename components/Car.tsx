import React from "react";


interface CarItem {
 id: number;
 title: string;
 description: string;
 difficulty: string;
 quantity: number;
}


interface CarProps {
 car: CarItem[];
 handleRemoveOneFromCar: (id: number) => void;
 handleRemoveFromCar: (id: number) => void;
}


const Car: React.FC<CarProps> = ({ car, handleRemoveOneFromCar, handleRemoveFromCar }) => {
 return (
   <section className="mt-8 mb-8 p-4 border rounded-md shadow-md bg-blue-500">
     <h2 className="text-xl font-bold mb-2">Shopping Car</h2>
     {car.length === 0 ? (
       <p>Your car is empty.</p>
     ) : (
       <ul>
         {car.map((item) => (
           <li key={item.id} className="mb-2">
             <div>
               <strong>{item.title}</strong> - {item.difficulty}{" "}
               <span>({item.quantity})</span>
               <p>{item.description}</p>
               <button
                 className="text-red-500 ml-4"
                 onClick={() => handleRemoveOneFromCar(item.id)}
               >
                 Remove one
               </button>
               <button
                 className="text-red-500 ml-4"
                 onClick={() => handleRemoveFromCar(item.id)}
               >
                 Remove all
               </button>
             </div>
           </li>
         ))}
       </ul>
     )}
   </section>
 );
};


export default Car;