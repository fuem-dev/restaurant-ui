
"use client"; // Indicates that this is a Client Component


import { useState, useEffect } from "react";
import Dish from "@/components/Dish";
import Car from "@/components/Car"; // Import the new Car component


// Define the type for a dish
interface Dish {
 name: string;
 description: string;
 difficulty: string;
 id: number;
 title: string;
}


// Define the type for the car item, including the quantity
interface CarItem extends Dish {
 quantity: number;
}


const url = "https://chinese-food-db.p.rapidapi.com/";
const options = {
 method: "GET",
 headers: {
   "x-rapidapi-key": "2361c7524dmsh2d5b5fd8aec8dc8p12ac68jsnf3a452be8364",
   "x-rapidapi-host": "chinese-food-db.p.rapidapi.com",
 },
};


export default function Home() {
 const [dishes, setDishes] = useState<Dish[]>([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [selectedDifficulty, setSelectedDifficulty] = useState("");
 const [car, setCar] = useState<CarItem[]>([]); // State for the shopping car
 const dishesPerPage = 10;


 // Log the car whenever it changes
 useEffect(() => {
   console.log("Car updated:", car);
 }, [car]);


 // Function to load the data from the API
 const fetchDishesData = async () => {
   try {
     const response = await fetch(url, options);


     if (!response.ok) {
       throw new Error(`HTTP Error: ${response.status}`);
     }


     const result: Dish[] = await response.json();
     setDishes(result);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };


 useEffect(() => {
   fetchDishesData();
 }, []);


 // Filter the dishes by the selected difficulty
 const filteredDishes = selectedDifficulty
   ? dishes.filter((dish) => dish.difficulty === selectedDifficulty)
   : dishes;


 // Calculate the index of the dishes to show on the current page
 const indexOfLastDish = currentPage * dishesPerPage;
 const indexOfFirstDish = indexOfLastDish - dishesPerPage;
 const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);


 const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);


 const handlePreviousPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };


 const handleNextPage = () => {
   if (currentPage < totalPages) {
     setCurrentPage(currentPage + 1);
   }
 };


 const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedDifficulty(event.target.value);
   setCurrentPage(1);
 };


 const handleAddToCar = (id: number) => {
   const dishToAdd = dishes.find((dish) => dish.id === id);
   if (dishToAdd) {
     const existingItem = car.find((item) => item.id === id);
     if (existingItem) {
       setCar(
         car.map((item) =>
           item.id === id ? { ...item, quantity: item.quantity + 1 } : item
         )
       );
     } else {
       setCar([...car, { ...dishToAdd, quantity: 1 }]);
     }
   }
 };


 const handleRemoveOneFromCar = (id: number) => {
   setCar(
     car
       .map((item) =>
         item.id === id && item.quantity > 1
           ? { ...item, quantity: item.quantity - 1 }
           : item
       )
       .filter((item) => item.quantity > 0)
   );
 };


 const handleRemoveFromCar = (id: number) => {
   setCar(car.filter((item) => item.id !== id));
 };


 return (
   <div className="container mx-auto p-8">
     {/* Car Section */}
     <Car
       car={car}
       handleRemoveOneFromCar={handleRemoveOneFromCar}
       handleRemoveFromCar={handleRemoveFromCar}
     />


     <nav className="container mx-auto p-8">
       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <li>
           {/* Pagination controls */}
           <div className="flex justify-between mt-4">
             <button
               onClick={handlePreviousPage}
               disabled={currentPage === 1}
               className={`px-4 py-2 rounded bg-blue-500 text-white ${
                 currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
               }`}
             >
               Previous
             </button>


             <span className="text-lg">
               Page {currentPage} of {totalPages}
             </span>


             <button
               onClick={handleNextPage}
               disabled={currentPage === totalPages}
               className={`px-4 py-2 rounded bg-blue-500 text-white ${
                 currentPage === totalPages
                   ? "opacity-50 cursor-not-allowed"
                   : ""
               }`}
             >
               Next
             </button>
           </div>
         </li>
         <li>
           {/* Filter by difficulty */}
           <div className="mb-4">
             <label htmlFor="difficulty" className="mr-2">
               Filter by Difficulty:
             </label>
             <select
               id="difficulty"
               value={selectedDifficulty}
               onChange={handleDifficultyChange}
               className="border rounded px-2 py-1"
             >
               <option value="">All</option>
               <option value="Easy">Easy</option>
               <option value="Medium">Medium</option>
               <option value="Hard">Hard</option>
             </select>
           </div>
         </li>
       </ul>
     </nav>


     {/* Dishes */}
     <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
       {currentDishes.map((dish) => (
         <Dish
           key={dish.id}
           {...dish}
           onAddToCar={handleAddToCar}
           onRemoveFromCar={handleRemoveFromCar}
         />
       ))}
     </section>
   </div>
 );
}




