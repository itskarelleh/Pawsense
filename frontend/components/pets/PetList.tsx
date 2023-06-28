import { Pet } from "./PetSummary";
import PetSummary from "./PetSummary";
import { getPets } from "@/server_actions";

export default async function PetList() {

    const selection : String[] = [];
    const pets : any = await getPets();

    if(pets.length == 0) return (
        <div className="h-96 w-full flex flex-col justify-center items-center">
            No pets have been added yet
        </div>
    )
    
   return (
    <div className='w-full space-y-4'>
        {pets && pets.map((pet: Pet) => (
            <PetSummary pet={pet} selection={selection} />
        ))}
    </div>
   )
}