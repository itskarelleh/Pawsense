import { NavArrowRight } from 'iconoir-react';
import Link from 'next/link';
import PetAvatar from "@/components/PetAvatar";

export interface Pet {
    id: string;
    name: string;
    type: string;
    avatar: string | null;
    birthdate: string | null;
    sex: string;
}


export default function PetSummary({ pet }: { pet: Pet }) {
    
    const placeholder = ""
    return (
        <div key={pet.id} className='flex flex-row space-x-2 items-center justify-between cursor-pointer p-4 bg-white hover:bg-neutral-200 rounded-full transition-all ease-in-out'>
            <div className='flex flex-row space-x-2 items-center'>
                <PetAvatar imgId="/samples/animals/cat" width={50} height={50} format='jpg' radius={100} />
                <h2 className="text-lg font-semibold">
                    {pet.name}
                </h2>
            </div>
            <Link href={`/pet/${pet.id}`} prefetch={false}>
                <button><NavArrowRight /></button>
            </Link>
        </div>
    )
}