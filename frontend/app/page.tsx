import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  
  const { userId } = auth();

  if(userId) redirect("/dashboard");
  
    return (
      <>

<div className="bg-white">
    <div className="grid grid-cols-12 py-28 px-5">
        <div className="col-span-6">
            <h2 className="text-5xl font-semibold text-gray-800">Fideliza Más</h2>
            <h3 className="text-xl font-semibold text-gray-600 mt-4">¡Únete a nuestro programa de lealtad y obtén increíbles recompensas!</h3>
            <p className="text-gray-600 mt-4"></p>
        </div>
        <div className="col-span-6">
          <Image width={600} height={600} 
          src="/hero-img-1.png" 
          alt="A shiba inu dog sitting in a person's lap" className="w-full h-auto" />
        </div>
    </div>
</div>

<div className="bg-white grid grid-cols-4 gap-10 p-10 mt-10">
</div>

<div className="bg-white p-10 mt-10">
  <h2 className="text-center text-3xl">Nuestra Misión</h2>
  <p className="mt-4">En FidelizaMás, nuestra misión es transformar la fidelización, conectando a empresas y clientes a través de emocionantes programas de recompensas basados en tokens...</p>
</div>

<div className="bg-gradient-to-r from-cyan-400 to-cyan-600 p-10 rounded-lg mt-10">
  <h2 className="text-white text-3xl text-center">Únete a FidelizaMás</h2>
  <p className="text-white mt-2 text-center">Descubre cómo podemos transformar la fidelización en una ventaja competitiva para tu empresa.</p>
  <div className="flex justify-center">
    <button className="mt-4 bg-white text-cyan-600 rounded-lg px-4 py-2">Saber más</button>
  </div>
</div>

<div className="bg-white p-10 mt-10">
  <h2 className="text-lg font-bold">Lo que dicen nuestros clientes</h2>
</div>

<div className="bg-white p-10 mt-10">
  <h2 className="text-lg font-bold">Con quienes trabajamos</h2>
</div>

<footer className="bg-gray-800 text-white p-4 mt-10">
  <center>
  <p>All rights Reserved. ©Pawsense. 2023</p>
  </center>
</footer>
      </>
  )
}
