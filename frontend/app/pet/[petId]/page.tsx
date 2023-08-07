"use server"
import PetProfile from '@/components/pets/PetProfile';
import { getAllEventsForPet, getAllMedicationsForPet, getPetById, getPetDetails, getPets } from '@/server_actions';
import { Pet, Details } from '@/components/pets';

export default async function PetPage({ params }: { params: { petId: string } }) {
    
    const { petId } = params;

    // const { userId } = auth();
    
    //TODO: if userid does not match current user or current user does not have permission to view
    //this pets info, return/redirect a 404 page.
    const pet : Pet = await getPetById(petId);
    
    console.log("Pet: " + JSON.stringify(pet));
    
    return (
        <div className="bg-neutral-100 min-h-screen">
            <PetProfile pet={pet} />
        </div>
    )
}