import { NavArrowRight } from 'iconoir-react';
import Link from 'next/link';
import PetAvatar from "@/components/PetAvatar";
import React from 'react';

export interface Pet {
    id: string;
    name: string;
    type: string;
    avatar: string | null;
    sex: string;
}

export default function PetSummary({ pet, selection }: { pet: Pet, selection: String[] }) {
    
    const placeholder = "/default-thumbnail.png";
    const checkboxName = "pet" + pet.id;

    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue = e.target.value;
    // }

    return (
        <div key={pet.id} className='flex flex-row space-x-2 items-center justify-between cursor-pointer p-2 bg-white hover:bg-neutral-200 rounded-full transition-all ease-in-out'>
            <div className='flex flex-row space-x-2 items-center'>
                <input type="checkbox" name={checkboxName} className='form-checkbox rounded-full bg-cyan-100' />
                {pet.avatar == '' || pet.avatar == null ? 
                <figure className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={placeholder} className='w-full' alt={pet.name} />
                </figure>
                :
                <PetAvatar imgId={pet.avatar} width={50} height={50} format='jpg' radius={100} />
                }
                <h2 className="text-lg font-semibold">
                    {pet.name}
                </h2>
                <div>
                    <span>{pet.type}</span>
                    <span>{pet.sex}</span>
                </div>

            </div>
            <Link href={`/pet/${pet.id}`} prefetch={false}>
                <button><NavArrowRight /></button>
            </Link>
        </div>
    )
}