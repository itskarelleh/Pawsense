"use server"
import PetDetails from '@/components/pets/PetDetails';
import { getPetById } from '@/actions';

export default async function PetPage({ params }: { params: { petId: string } }) {
    const { petId } = params;

    // const { userId, getToken } = useAuth();
    //     name: '',
    //     type: '',
    //     age: '',
    //     mood: '',        
    // });

    //if usedid does not match current user or current user does not have permission to view
    //this pets info, return/redirect a 404 page.

    const pet = await getPetById(petId);
    
    return (
        <>
        <PetDetails pet={pet} />
        </>
    )
}