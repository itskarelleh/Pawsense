"use client"
import { useState, useEffect } from 'react';
import AddNewPetModal from "@/components/dashboard/AddNewPetModal";
import { fakePets } from "../../data";
import Image from 'next/image';
import DashboardSection from '@/components/DashboardSection';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';

interface Pet {
    id: string;
    name: string;
    type: string;
    birthdate: string;
    sex: string;
    photo: string;
}

interface PageState {
    pets: Pet[],
}


export default function Page() {
    
    const [ state, setState ] = useState<PageState>({pets: [...fakePets]});

    function pushToPetsList(pet: Pet) {
        setState(prev => ({
            ...prev,
            pets: [pet],
        }));
    }

    const PetsList = () => (
        <div className='w-full space-y-4'>
            {state.pets.map((pet : Pet) => (
                <div key={pet.id} className='flex flex-row space-x-2 items-center justify-between cursor-pointer p-4 bg-white hover:bg-neutral-200 rounded-full hover:px-8 transition-all ease-in-out'>
                   <div className='flex flex-row space-x-2 items-center'>
                        <figure>
                            <img className="rounded-full w-10" src={pet.photo}  alt={pet.name} />
                        </figure>
                        <h2 className="text-lg font-semibold">
                            {pet.name}
                        </h2>
                    </div>
                    <Link href={`/dashboard/pet/${pet.id}`} prefetch={false}>
                        <button><NavArrowRight /></button>
                    </Link>
                </div>
            ))}
        </div>
    )

    return (
        <>
        <DashboardSection title="Pets" actions={<AddNewPetModal onSubmit={pushToPetsList} />}>
            <PetsList />
        </DashboardSection>
        {/* <DashboardSection title="Events" actions={<></>}>
        </DashboardSection>  */}
        </>
    )
}

