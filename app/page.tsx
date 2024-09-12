"use client"; // Indicates that this is a Client Component


import { useState, useEffect } from "react";
import Dish from "../components/Dish";
import Link from "next/link";


// Define the type for a dish
interface Dish {
 name: string;
 description: string;
 difficulty: string;
 id:number;
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
 const [dishes, setDishes] = useState<Dish[]>([]); // Apply the type to the state
 const [currentPage, setCurrentPage] = useState(1);
 const [selectedDifficulty, setSelectedDifficulty] = useState("");
 const dishesPerPage = 10;


 // Function to load the data from the API
 const fetchDishesData = async () => {
   try {
     const response = await fetch(url, options);


     if (!response.ok) {
       throw new Error(`HTTP Error: ${response.status}`);
     }


     const result: Dish[] = await response.json(); // Ensure the result is typed
     setDishes(result); // Save the fetched data in the state
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };


 // useEffect to load the data when the component mounts
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


 // Calculate the total number of pages
 const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);


 // Go to the previous page
 const handlePreviousPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };


 // Go to the next page
 const handleNextPage = () => {
   if (currentPage < totalPages) {
     setCurrentPage(currentPage + 1);
   }
 };


 // Handle difficulty filter change
 const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedDifficulty(event.target.value);
   setCurrentPage(1); // Reset to page 1 when the filter changes
 };


 return (
   <div className="container mx-auto p-8">
     <h1 className="text-3xl font-bold mb-4">Restaurant Menu</h1>
     <Link href="/admin">Admin Dishes</Link>
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
               className="border rounded px-2 py-1 px-4 py-2 rounded bg-blue-500 text-white"
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
       {currentDishes.map((dish, index) => (
      
         <Dish key={index} {...dish} />
       ))}
     </section>
   </div>
 );
}
