import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden -mt-20 ">
      <div className="inline-block rounded-lg text-center">
        <img src="/mainImage.png" alt="Descripción de la imagen" className="rounded-lg -p-10px" />
        {/* Botón verde debajo de la imagen utilizando Link sin el tag <a> */}
        <Link href="/shopping" className="mt-4 px-20 py-4 text-2xl font-bold bg-green-500 text-white rounded-full hover:bg-green-700">
            Get started
        </Link>
      </div>
    </div>
  );
}