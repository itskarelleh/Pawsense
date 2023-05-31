import AddNewPetModal from "@/components/dashboard/AddNewPetModal";
import DashboardSection from '@/components/DashboardSection';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';
import { auth } from '@clerk/nextjs';

interface Pet {
    id: string;
    name: string;
    type: string;
    birthdate: string;
    sex: string;
    photo: string;
}

async function getPets( userId : any ) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/current-user/${userId}`, {
        method: "GET"
    });

    if(!res.ok) throw new Error("No pets were found for this user");

    return res.json();
}


export default async function Page() {

    const { userId } = auth();    

    // const pets = await getPets(userId);
    const pets : any = [];

    const PetsList = () => (
        <div className='w-full space-y-4'>
            {pets.map((pet : Pet) => (
                <div key={pet.id} className='flex flex-row space-x-2 items-center justify-between cursor-pointer p-4 bg-white hover:bg-neutral-200 rounded-full hover:px-8 transition-all ease-in-out'>
                   <div className='flex flex-row space-x-2 items-center'>
                        <figure>
                            <img className="rounded-full w-10" src={pet.photo}  alt={pet.name} />
                        </figure>
                        <h2 className="text-lg font-semibold">
                            {pet.name}
                        </h2>
                    </div>
                    <Link href={`/dashboard/pet`}>
                        <button><NavArrowRight /></button>
                    </Link>
                </div>
            ))}
        </div>
    )

    return (
        <>
        <DashboardSection title="Pets" actions={<AddNewPetModal />}>
            <PetsList />
        </DashboardSection>
        {/* <DashboardSection title="Events" actions={<></>}>
        </DashboardSection>  */}
        </>
    )
}

