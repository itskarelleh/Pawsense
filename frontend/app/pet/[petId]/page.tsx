"use server"
import PetDetails from '@/components/pets/PetDetails';
import { getAllEventsForPet, getPetById, getPetDetails } from '@/server_actions';
import { Event } from '@/components/events';
import { Medication } from '@/components/medications';
import { Pet, Details } from '@/components/pets';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

export default async function PetPage({ params }: { params: { petId: string } }) {
    
    const { petId } = params;

    const { userId } = auth();
    
    //TODO: if userid does not match current user or current user does not have permission to view
    //this pets info, return/redirect a 404 page.

    const pet : Pet = await getPetById(petId);

    // if(pet.userId != userId) redirect("/dashboard");
    const details : Details = { bio: 'Pinot is a big baby. He’s very vocal and will let you know how he feels. He looovvvees food a lot and always tries to steal extra cat food. He even tries to steal mine. He loves a lot of affection.', 
    adoptionDate: '02/26/2022', age: 8, size: 'large', weight: 14.2, birthDate: '02/26' };
    const events : any = await getAllEventsForPet(petId);
    const medications : any = [];
    
    return (
        <div className="bg-neutral-50 min-h-screen">
            <PetDetails pet={pet} details={details} events={events} medications={medications} />
        </div>
    )
}