'use client'; // Necesario para usar hooks en componentes en el App Router


import { useState } from 'react';
import Dish from '../../components/Dish'; // Asegúrate de que la ruta del componente Dish sea correcta


// Dishes iniciales para mostrar en el menú
const dishesList = [
 { id: 1, name: 'Pizza Margarita', description: 'Tomate, mozzarella y albahaca.', difficulty: 'easy', title: 'Pizza', image: 'path_to_image1', category: 'new category' },
 { id: 2, name: 'Pasta Carbonara', description: 'Pasta con salsa carbonara y panceta.', difficulty: 'medium', title: 'Pasta', image: 'path_to_image2', category: 'salad'  },
];


export default function Menu() {
 const [dishes, setDishes] = useState(dishesList);
 const [newDish, setNewDish] = useState({ id: 0, name: '', price: 0, description: '', difficulty: '', title: '', image: '', category:'' });


 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   setDishes([...dishes, { ...newDish, id: dishes.length + 1 }]);
   setNewDish({ id: 0, name: '', price: 0, description: '', difficulty: '', title: '', image: '', category:'' });
 };


 const handleAddToCart = (id: number) => {
   console.log(`Adding dish with ID: ${id} to cart`);
   // Add your logic for adding the dish to the cart
 };


 const handleRemoveFromCart = (id: number) => {
   console.log(`Removing dish with ID: ${id} from cart`);
   // Add your logic for removing the dish from the cart
 };


 return (
   <div className="container mx-auto p-8">
     <h1 className="text-3xl font-bold mb-4">Menú del Restaurante</h1>


     {/* Formulario para agregar un nuevo plato */}
     <form onSubmit={handleSubmit} className="mb-4">
       <input
         type="text"
         placeholder="Nombre del plato"
         value={newDish.name}
         onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
         required
       />
       <input
         type="number"
         placeholder="Precio"
         value={newDish.price}
         onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
         required
       />
       <input
         type="text"
         placeholder="Category"
         value={newDish.category}
         onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
         required
       />
       <input
         type="text"
         placeholder="Dificultad"
         value={newDish.difficulty}
         onChange={(e) => setNewDish({ ...newDish, difficulty: e.target.value })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
         required
       />
       <input
         type="text"
         placeholder="Título"
         value={newDish.title}
         onChange={(e) => setNewDish({ ...newDish, title: e.target.value })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
         required
       />
       <textarea
         placeholder="Descripción"
         value={newDish.description}
         onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
         required
       ></textarea>
       <input
         type="text"
         placeholder="URL de la Imagen"
         value={newDish.image}
         onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
         className="block p-2 border border-gray-300 rounded-md mb-2"
       />
       <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
         Agregar Plato
       </button>
     </form>


     {/* Listado de platos */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {dishes.map((dish, index) => (
         <Dish
           key={index}
           id={dish.id}
           name={dish.name}
           title={dish.title}
           description={dish.description}
           difficulty={dish.difficulty}
           image={dish.image}
           onAddToCart={handleAddToCart}
           onRemoveFromCart={handleRemoveFromCart}
           hideButtons={true}
         />
       ))}
     </div>
   </div>
 );
}
