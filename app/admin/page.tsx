
'use client'; // Necessary for using hooks in components within the App Router


import { useState } from 'react';
import Dish from '../../components/Dish'; // Ensure that the path to the Dish component is correct
import dishesList from '../static/dishes.json'; // Import the JSON file containing the initial list of dishes


export default function Menu() {
 const [dishes, setDishes] = useState(dishesList); // State to store the list of dishes
 const [newDish, setNewDish] = useState({
   id: 0,
   name: '',
   price: 0,
   description: '',
   difficulty: '',
   title: '',
   image: '',
   category: ''
 });


 // Function to handle adding a new dish
 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   setDishes([...dishes, { ...newDish, id: dishes.length + 1 }]); // Add the new dish to the list
   setNewDish({
     id: 0,
     name: '',
     price: 0,
     description: '',
     difficulty: '',
     title: '',
     image: '',
     category: ''
   }); // Reset the new dish form
 };


 // Function to handle adding a dish to the cart
 const handleAddToCart = (id: number) => {
   console.log(`Adding dish with ID: ${id} to cart`);
   // Add your logic for adding the dish to the cart
 };


 // Function to handle removing a dish from the cart
 const handleRemoveFromCart = (id: number) => {
   console.log(`Removing dish with ID: ${id} from cart`);
   // Add your logic for removing the dish from the cart
 };


 // Function to handle removing a dish from the menu
 const handleRemoveDish = (id: number) => {
   const updatedDishes = dishes.filter(dish => dish.id !== id); // Remove the dish from the list
   setDishes(updatedDishes);
 };


 return ( 
   <div className="container mx-auto p-8">
     <h1 className="text-3xl font-bold mb-4">Restaurant Menu</h1>


     {/* Form to add a new dish */}
     <form onSubmit={handleSubmit} className="mb-4 p-4 rounded-lg w-full">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 w-full">
         {/* Dish Name Input */}
         <div className="flex flex-col w-full">
           <label htmlFor="name" className="text-sm font-medium text-white">Dish Name</label>
           <input
             type="text"
             id="name"
             placeholder="Enter the dish name"
             value={newDish.name}
             onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
             className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
             required
           />
         </div>


         {/* Price Input */}
         <div className="flex flex-col w-full">
           <label htmlFor="price" className="text-sm font-medium text-white">Price ($)</label>
           <input
             type="number"
             id="price"
             placeholder="Enter the price"
             value={newDish.price}
             onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
             className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
             required
           />
         </div>


         {/* Category Input */}
         <div className="flex flex-col w-full">
           <label htmlFor="category" className="text-sm font-medium text-white">Category</label>
           <input
             type="text"
             id="category"
             placeholder="Enter the category"
             value={newDish.category}
             onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
             className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
             required
           />
         </div>


         {/* Difficulty Input */}
         <div className="flex flex-col w-full">
           <label htmlFor="difficulty" className="text-sm font-medium text-white">Difficulty Level</label>
           <input
             type="text"
             id="difficulty"
             placeholder="Enter the difficulty level"
             value={newDish.difficulty}
             onChange={(e) => setNewDish({ ...newDish, difficulty: e.target.value })}
             className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
             required
           />
         </div>


         {/* Title Input */}
         <div className="flex flex-col w-full">
           <label htmlFor="title" className="text-sm font-medium text-white">Title</label>
           <input
             type="text"
             id="title"
             placeholder="Enter the title"
             value={newDish.title}
             onChange={(e) => setNewDish({ ...newDish, title: e.target.value })}
             className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
             required
           />
         </div>


         {/* Image URL Input */}
         <div className="flex flex-col w-full">
           <label htmlFor="image" className="text-sm font-medium text-white">Image URL</label>
           <input
             type="text"
             id="image"
             placeholder="Enter the image URL"
             value={newDish.image}
             onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
             className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
           />
         </div>
       </div>


       {/* Description Input - Full Width */}
       <div className="flex flex-col w-full mb-4">
         <label htmlFor="description" className="text-sm font-medium text-white">Description</label>
         <textarea
           id="description"
           placeholder="Enter a brief description"
           value={newDish.description}
           onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
           className="p-2 border border-gray-300 rounded-md bg-[#2C2C2C] text-gray-300"
           required
         ></textarea>
       </div>


       {/* Submit Button */}
       <button type="submit" className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition-colors">
         Add Dish
       </button>
     </form>


     {/* List of dishes */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
       {dishes.map((dish) => (
         <div key={dish.id} className="relative">
           <Dish
             id={dish.id}
             name={dish.name}
             title={dish.title}
             description={dish.description}
             difficulty={dish.difficulty}
             image={dish.image}
             onAddToCar={handleAddToCart}
             onRemoveFromCar={handleRemoveFromCart}
             hideButtons={true}
             displayAsTable={true}
           />


           {/* Remove Dish Button */}
           <button
             onClick={() => handleRemoveDish(dish.id)}
             className="absolute top-4 right-4 bg-white-500 text-white p-1 rounded-full hover:bg-white-600 transition-colors"
           >
             X
           </button>
         </div>
       ))}
     </div>
   </div>
 );
}


