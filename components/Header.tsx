

import Link from 'next/link';
import { FC } from 'react';


const Header: FC = () => {
 return (
   <header className="text-white py-4">
     <nav className="container mx-auto flex justify-between items-center">
       <div className="logo text-2xl font-bold">
         <Link href="/">
         Restaurant UI
         </Link>
       </div>
       <ul className="flex space-x-6">
         <li>
           <Link href="/admin" className="hover:underline">
             Admin Dishes
           </Link>
         </li>
         <li>
           <Link href="/shopping" className="hover:underline">
            Shopping Car
           </Link>
         </li>
       </ul>
     </nav>
   </header>
 );
};


export default Header;