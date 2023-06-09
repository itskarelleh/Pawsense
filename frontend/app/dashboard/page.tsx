import AddNewPetModal from "@/components/dashboard/AddNewPetModal";
import DashboardSection from '@/components/DashboardSection';
import { NavArrowRight } from 'iconoir-react';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { NextResponse } from "next/server";

interface Pet {
    id: string;
    name: string;
    type: string;
    avatar: string | null;
    birthdate: string | null;
    sex: string;
}


export default async function Home() {
    async function getPets() {
        'use server'

        const { userId, getToken } = auth();

  if(!userId) NextResponse.redirect("/sign-in");

  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/current-user/${userId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

        const data = await res.json();
        const pets = data;

        console.log(pets);

        return pets;
    }
    
    const pets: any = await getPets();


    const PetsList = () => (
        <div className='w-full space-y-4'>
            {pets.map((pet: Pet) => (
                <div key={pet.id} className='flex flex-row space-x-2 items-center justify-between cursor-pointer p-4 bg-white hover:bg-neutral-200 rounded-full hover:px-8 transition-all ease-in-out'>
                    <div className='flex flex-row space-x-2 items-center'>
                        <figure>
                            {/* <img className="rounded-full w-10" src={pet.avatar}  alt={pet.name} /> */}
                        </figure>
                        <h2 className="text-lg font-semibold">
                            {pet.name}
                        </h2>
                    </div>
                    <Link href={`/pet`} prefetch={false}>
                        <button><NavArrowRight /></button>
                    </Link>
                </div>
            ))}
        </div>
    )

    return (
        <>
            <h1>Pawsense</h1>
            <DashboardSection title="Pets" actions={<></>}>
                {pets.length <= 0 ? <div className="h-96 w-full flex flex-col justify-center items-center">
                    No pets have been added yet
                </div>
                    : <PetsList />
                }
            </DashboardSection>
            {/* <DashboardSection title="Events" actions={<></>}>
          </DashboardSection>  */}
        </>
    )
}
