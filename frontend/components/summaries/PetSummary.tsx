import { NavArrowRight } from 'iconoir-react';
import Link from 'next/link';

export interface Pet {
    id: string;
    name: string;
    type: string;
    avatar: string | null;
    birthdate: string | null;
    sex: string;
}

export default function PetSummary({ pet }: { pet: Pet }) {

    return (
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
    )
}