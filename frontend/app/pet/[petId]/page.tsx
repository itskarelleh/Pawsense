"use server"
import PetProfile from '@/components/pets/PetProfile';
import { getPetProfile } from '@/server_actions';
import { Pet } from '@/components/pets';

export default async function PetPage({ params }: { params: { petId: string } }) {
    
    const { petId } = params;

    const data : any = await getPetProfile(petId);

    return (
        <div className="bg-neutral-100 min-h-screen">
            <PetProfile pet={data} />
        </div>
    )
}