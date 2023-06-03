import AddNewPetModal from "@/components/dashboard/AddNewPetModal";
import DashboardSection from '@/components/DashboardSection';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';
import { auth } from '@clerk/nextjs';

interface Pet {
    id: string;
    name: string;
    type: string;
    avatar: string;
    birthdate: string;
    sex: string;
}

async function getPets( userId : any ) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/current-user/${userId}`, {
        method: "GET"
    });

    console.log(res.status);


    return res.json();
}

export default async function Page() {

    const { userId } = auth();    

    const pets : any = await getPets(userId);
    // const pets : any = [];

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
            {pets.length <= 0 ? <div className="h-96 w-full flex flex-col justify-center items-center">
                No pets have been added yet
            </div>
             : <PetsList />}
        </DashboardSection>
        {/* <DashboardSection title="Events" actions={<></>}>
        </DashboardSection>  */}
        </>
    )
}

