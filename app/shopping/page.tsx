"use client"; // Indicates that this is a Client Component




import { useState, useEffect } from "react";
import Dish from "@/components/Dish";





// Define the type for a dish
interface Dish {
name: string;
description: string;
difficulty: string;
id: number;
title:string
}




// Define the type for the cart item, including the quantity
interface CartItem extends Dish {
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
const [dishes, setDishes] = useState<Dish[]>([]); // Apply the type to the state
const [currentPage, setCurrentPage] = useState(1);
const [selectedDifficulty, setSelectedDifficulty] = useState("");
const [cart, setCart] = useState<CartItem[]>([]); // State for the shopping cart
const dishesPerPage = 10;




// Log the cart whenever it changes
useEffect(() => {
  console.log("Cart updated:", cart);
}, [cart]);




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
const handleDifficultyChange = (
  event: React.ChangeEvent<HTMLSelectElement>
) => {
  setSelectedDifficulty(event.target.value);
  setCurrentPage(1); // Reset to page 1 when the filter changes
};




// Function to add a dish to the cart
const handleAddToCart = (id: number) => {
  const dishToAdd = dishes.find((dish) => dish.id === id);
  if (dishToAdd) {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...dishToAdd, quantity: 1 }]);
    }
  }
};




// Function to decrease the quantity of a dish in the cart by one
const handleRemoveOneFromCart = (id: number) => {
  setCart(
    cart
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};




// Function to remove the dish completely from the cart
const handleRemoveFromCart = (id: number) => {
  setCart(cart.filter((item) => item.id !== id));
};




return (
  <div className="container mx-auto p-8">
    {/* Cart Section */}
    <div className="mt-8 mb-8 p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2">
              <div>
                <strong>{item.title}</strong> - {item.difficulty}{" "}
                <span>({item.quantity})</span>
                <p>{item.description}</p>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleRemoveOneFromCart(item.id)}
                >
                  Remove one
                </button>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove all
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>




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
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      ))}
    </section>
  </div>
);
}
