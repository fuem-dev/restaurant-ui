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
   <section
     className="fixed top-[70px] right-0 p-4 border-t-2 border-b-2 border-l-2 border-gray-300 rounded-l-lg shadow-md z-50 w-[30%] text-white bg-[#2C2C2C]"
   >
     <h2 className="text-xl font-bold mb-2 md:text-lg">Shopping Car</h2>
     {car.length === 0 ? (
       <p className="text-sm md:text-xs">Your car is empty.</p>
     ) : (
       <ul>
         {car.map((item) => (
           <li key={item.id} className="mb-2 text-sm md:text-xs">
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






