"use server"
import PetProfile from '@/components/pets/PetProfile';
import { getAllEventsForPet, getAllMedicationsForPet, getPetById, getPetDetails, getPets } from '@/server_actions';
import { Pet, Details } from '@/components/pets';

export default async function PetPage({ params }: { params: { petId: string } }) {
    
    const { petId } = params;

    const pet : Pet = await getPetById(petId);
    
    console.log("Pet: " + JSON.stringify(pet));
    
    return (
        <div className="bg-neutral-100 min-h-screen">
            <PetProfile pet={pet} />
        </div>
    )
}