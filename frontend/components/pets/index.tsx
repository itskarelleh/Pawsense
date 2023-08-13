import React, { useState } from 'react';
import PetAvatar from "../PetAvatar";
import { getPets } from "@/server_actions";
import { Female, Male, NavArrowRight, QuestionMark } from 'iconoir-react';
import Link from 'next/link';
import PetProfile from './PetProfile';
import Intersex from '../Intersex';
import PetCombobox from './PetCombobox';
import { Medication } from '../medications';
import { Event } from '../events';
import { Mood } from '../moods';
import { Note } from '../notes';
/**
 * Gets all the pets by current user and 
 * return them as a list of avatars
 */

async function PetList({ pets } : { pets : any}) {

    const selection : String[] = [];
    
    if(pets.length == 0) return (
        <div className="h-96 w-full flex flex-col justify-center items-center">
            No pets have been added yet
        </div>
    )
    
   return (
    <div className='w-full space-y-4'>
        {pets.map((pet: Pet) => (
            <PetSummary key={pet.id} pet={pet} selection={selection} />
        ))}
    </div>
   )
}

/**
 * 
 * 
 * @returns a summary of a pet
 */
function PetSummary({ pet, selection, key } : { pet: Pet, selection: String[], key: any }) {
    
    const placeholder = "/default-thumbnail.png";
    const checkboxName = "pet" + pet.id;
    
    return (
        <div key={key} className='flex flex-row space-x-2 items-center justify-between cursor-pointer p-2 bg-white hover:bg-neutral-200 rounded-full transition-all ease-in-out'>
            <div className='ml-4 flex flex-row space-x-2 items-center'>
                <input type="checkbox" name={checkboxName} className='form-checkbox rounded-full bg-sky-100' />
                {pet.avatar == '' || pet.avatar == null ? 
                <figure className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={placeholder} className='w-full' alt={pet.name} />
                </figure>
                :
                <PetAvatar imgId={pet.avatar} width={50} height={50} format='jpg' isRounded />
                }
                <h2 className="text-lg font-semibold">
                    {pet.name}
                </h2>
                <div>
                    <span>{pet.type}</span>
                    <span>{pet.sex}</span>
                </div>

            </div>
            <Link href={`/pet/${pet.id}`} prefetch={false}>
                <button className='mr-4'><NavArrowRight /></button>
            </Link>
        </div>
    )
}

function PetSexAndTypeField({ sex, type } : { sex: string, type: string }) {

    return (
        <span className='flex flex-row'>
          {sex == "M" && (
           <> <Male /> <span className="sr-only">male</span></>
          )}
          {sex == "F" && (
           <> <Female /> <span className="sr-only">female</span></>
          )}
          {sex == "I" && (
           <> <Intersex /><span className="sr-only">intersex</span></>
          )}
          {sex == "?" && (
           <> <QuestionMark /> <span className="sr-only">unknown sex</span></>
          )} <span className="ml-1 capitalize">{type && type}</span>
        </span>
    )
}

export interface PetBio {
    id: number | string | undefined;
    weight: number | undefined;
    size: string | undefined;
    about: string | undefined;
    birthDate: string | undefined;
    adoptionDate: string | undefined;
    isFosterPet: boolean | undefined;
    traits: string[] | null | undefined;
    photoIds: string[] | null | undefined;
}

export interface Pet {
    id: number;
    name: string;
    nicknames: string;
    type: string;
    breed: string;
    color: string;
    avatar: string;
    userId: string;
    sex: string;
    bio: PetBio | null | undefined;
    medications: Medication[] | null | undefined;
    events: Event[] | null | undefined;
    notes: Note[] | null | undefined;
    moods: Mood[] | null | undefined;
}

export interface Details {
    // id: number,
    weight: number,
    size: string,
    bio: string,
    birthDate: Date | string | null,
    adoptionDate: Date | string | null,
    age: number,
    // addedAt: Date | null,
    // lastUpdatedAt: Date | null
}

export { PetList, PetAvatar, PetSummary, PetSexAndTypeField }