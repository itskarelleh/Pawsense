import { get } from "cypress/types/lodash";
import { Pet } from "./PetSummary";
import PetSummary from "./PetSummary";
import { getPets } from "@/actions";

export default async function PetList() {

    const pets : any = await getPets();

    if(pets.length == 0) return (
        <div className="h-96 w-full flex flex-col justify-center items-center">
            No pets have been added yet
        </div>
    )
    
   return (
    <div className='w-full space-y-4'>
        {pets && pets.map((pet: Pet) => (
            <PetSummary pet={pet} />
        ))}
    </div>
   )
}