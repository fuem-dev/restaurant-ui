import React from 'react';
interface DishProps {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    title?: string;  // Make 'title' optional
    image?: string;  // Make 'image' optional
   }
   
/*
interface DishProps {
  name: string;
  price: number;
  description: string;
  category: string;
}
*/
const Dish: React.FC<DishProps> = ({ title, id, image, difficulty }) => {
  return (
    <article className="p-4 card-bg-css shadow-md rounded-md">
        <figure className="p-4">
            {/* <Image src={image} alt="Descripción de la imagen" width={100} height={100} /> */}
            <img src={image} alt="image description" className='rounded-md'/>
            <figcaption>Image description</figcaption>
        </figure>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{id}</p>
      <span className="block mt-2 font-semibold text-green-500">${difficulty}</span>
    </article>
  );
}

export default Dish;