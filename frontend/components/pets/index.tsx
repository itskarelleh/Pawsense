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
    <div className='w-full grid grid-cols-12'>
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
        <Link key={key} href={`/pet/${pet.id}`} className='col-span-4 w-full flex flex-col items-center justify-between cursor-pointer transition-all ease-in-out'>
            <div className='w-full ml-4 flex flex-col space-y-2 items-center group'>
                <div className="w-[100px] h-[100px] rounded-full group-hover:p-2 transition-all ease-in bg-white group group-hover:bg-neutral-200">
                    {pet.avatar == '' || pet.avatar == null ? 
                    <figure className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img src={placeholder} className='w-full' alt={pet.name} />
                    </figure>
                    :
                    <PetAvatar imgId={pet.avatar} width={100} height={100} format='jpg' isRounded />
                    }
                </div>
                <h2 className="text-lg font-semibold group-hover:text-black">
                    {pet.name}
                </h2>
            </div>
        </Link>
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

export interface PetStats {
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
    id: string | number;
    name: string;
    nicknames: string;
    type: string;
    breed: string;
    color: string;
    avatar: string;
    userId: string;
    sex: string;
    petStats: PetStats;
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

export const traits = [
    { value: "Playful", icon: "🎈", description: "Enjoys engaging in playful activities." },
    { value: "Curious", icon: "🔍", description: "Shows interest in exploring new things." },
    { value: "Affectionate", icon: "❤️", description: "Displays warmth and fondness toward others." },
    { value: "Reserved", icon: "🙈", description: "Keeps a certain distance and is less outgoing." },
    { value: "Fearful", icon: "😨", description: "Easily frightened or anxious." },
    { value: "Bold", icon: "💪", description: "Confident and unafraid in various situations." },
    { value: "Aggressive", icon: "😠", description: "Quick to show hostility or dominance." },
    { value: "Gentle", icon: "🐾", description: "Displays kindness and tenderness." },
    { value: "Stubborn", icon: "🐶", description: "Resistant to change and firm in its actions." },
    { value: "Independent", icon: "🦉", description: "Prefers to be self-reliant and do things alone." },
    { value: "Loyal", icon: "🐕", description: "Devoted and faithful to a specific individual or group." },
    { value: "Territorial", icon: "🏠", description: "Protective of its territory and boundaries." },
    { value: "Adventurous", icon: "🌄", description: "Excited about new experiences and challenges." },
    { value: "Calm", icon: "😌", description: "Exhibits a relaxed and composed demeanor." },
    { value: "Energetic", icon: "⚡", description: "Full of vitality and enthusiasm." },
    { value: "Shy", icon: "🙊", description: "Nervous or reserved in unfamiliar situations." },
    { value: "Social", icon: "👫", description: "Enjoys the company of others and forms bonds easily." },
    { value: "Laid-back", icon: "🌴", description: "Takes things easy and is not easily stressed." },
    { value: "Timid", icon: "😳", description: "Shy and hesitant, avoids attention." },
    { value: "Intelligent", icon: "🧠", description: "Displays problem-solving skills and learns quickly." },
    { value: "Stubborn", icon: "🤦‍♂️", description: "Resistant to change and persistent in its preferences." },
    { value: "Cautious", icon: "🕵️‍♂️", description: "Acts carefully and avoids risks." },
    { value: "Adaptable", icon: "🔄", description: "Easily adjusts to new environments or situations." },
    { value: "Dominant", icon: "👑", description: "Asserts control and authority in interactions." },
    { value: "Submissive", icon: "🙇‍♂️", description: "Yielding to others, not inclined to dominate." },
    { value: "Confident", icon: "😎", description: "Self-assured and sure of its actions." },
    { value: "Inquisitive", icon: "🧐", description: "Eager to learn and discover new things." },
    { value: "Protective", icon: "🛡️", description: "Guards and defends its loved ones or territory." },
    { value: "Sociable", icon: "🤝", description: "Enjoys being around others and seeks companionship." },
    { value: "Aloof", icon: "🌌", description: "Distant and detached from others." },
    { value: "Impulsive", icon: "💥", description: "Acts without much forethought or consideration." },
    { value: "Patient", icon: "⏳", description: "Can wait calmly without becoming agitated." },
    { value: "Anxious", icon: "😰", description: "Worries and gets stressed easily." },
    { value: "Easygoing", icon: "😌", description: "Relaxed and adaptable in various situations." },
    { value: "Assertive", icon: "🗣️", description: "Confidently expresses its needs and desires." },
    { value: "Mellow", icon: "🌼", description: "Calm and easy to get along with." },
    { value: "Clever", icon: "🧙‍♂️", description: "Quick-witted and resourceful." },
    { value: "Agreeable", icon: "🤗", description: "Friendly and willing to cooperate." },
  ];

export { PetList, PetAvatar, PetSummary, PetSexAndTypeField }