"use client"
import { Tab } from '@headlessui/react';
// import CurrentMood from "@/components/CurrentMood";
import classNames from 'classnames';
import PetAvatar from '../PetAvatar';
import { useState } from 'react';
import { EditPencil } from 'iconoir-react';
import { H1, H2, H3 } from '@/components/typography/index';
import AddNewEventModal from '../events/AddNewEventModal';
import { AddNewMedicationModal, Medication } from '../medications';
import { Pet, Details, PetSexAndTypeField } from '.';
import { Event, EventDetails, EventList, EventSummary } from '../events';

export default function PetDetails({ pet, pets, details, medications, events } : { pet : Pet, pets: Pet[], details: Details, medications: any, events: any  }) {
    
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-12">
            <header className="md:col-end-5 flex flex-row lg:flex-col mb-8">
                <PetAvatar imgId={pet.avatar} width={150} height={150} format='jpg' radius={360} />
                <div>
                    <H1>{pet && pet.name}</H1>
                    {pet.nicknames && pet.nicknames}
                    <PetSexAndTypeField type={pet.type} sex={pet.sex} />
                </div>
            </header>
            <section className='md:col-start-6 md:col-end-12'>
                <Tab.Group>
                    <Tab.List className="flex space-x-l  bg-neutral-100 shadow-inner">
                        <Tab className={({ selected }) =>
                            classNames(
                                'w-full py-2.5 text-sm font-medium leading-5 text-neutral-800',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-neutral-50 rounded-t-md text-neutral-900'
                                    : 'text-cyan-100 hover:bg-white/[0.12]'
                            )
                        }
                        >
                            About
                        </Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                                'w-full py-2.5 text-sm font-medium leading-5 text-neutral-800',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-neutral-50 rounded-t-md text-neutral-900'
                                    : 'text-cyan-100 hover:bg-white/[0.12]'
                            )
                        }
                        >
                            Event
                        </Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                                'w-full py-2.5 text-sm font-medium leading-5 text-cyan-600',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-neutral-50 rounded-t-md text-neutral-900'
                                    : 'text-neutral-800'
                            )
                        }
                        >
                            Medication
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2 w-full">
                        <Tab.Panel className={classNames(
                            'rounded-xl p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                        )}
                        >
                            <PetAboutPanel about={details} name={pet.name} />
                        </Tab.Panel>
                        <Tab.Panel className={classNames(
                            'rounded-xl p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                        )}
                        >
                            <EventsPanel events={events} />
                        </Tab.Panel>
                        <Tab.Panel className={classNames(
                            'rounded-xl p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                        )}
                        >

                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </div>
        </>
    )
}

function PetAboutPanel({ about, name } : { about : any, name: string }) {
    
    const { adoptionDate, birthDate, weight, size, bio } = about;
    const [ isEditing, setIsEditing ] = useState(false);
    
    return (
        <div className='p-8'>
            
            <div className="flex flex-row space-x-4 w-full justify-between">
                <h2>About</h2>
                
                <button title={`Edit details about ${name}`} className='transition-all ease-in-out text-xl text-center rounded-full w-10 h-10 hover:bg-cyan-200'>
                    <EditPencil className='m-auto'/>
                </button>
            </div>
           <div>

           <p className='w-full'>
                {bio ? bio : `${name} does not have a bio yet.`}
            </p>
            <div className="flex flex-row justify-between space-x-2">
                <span className="flex flex-row">Adopted at: {adoptionDate ? adoptionDate : '?'}</span>
                <span className="flex flex-row">Birthday: {birthDate ? birthDate : '?'}</span>
            </div>

            <div className="flex flex-row justify-between space-x-2">
                <span className="flex flex-row">Weight: {weight ? `${weight} lbs` : '?'}</span>
                <span className="flex flex-row">Size: {size ? size : '?'}</span>
            </div>
           </div>

           <section>
                <header>
                <H2>Photos of {name}</H2>
                
                <button title={`Edit details about ${name}`} className='transition-all ease-in-out text-xl text-center rounded-full w-10 h-10 hover:bg-cyan-200'>
                    <EditPencil className='m-auto'/>
                </button>
                </header>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='bg-neutral-300 h-auto'>
                        img
                    </div>
                    <div className='bg-neutral-300 h-auto'>
                        img
                    </div>
                    <div className='bg-neutral-300 h-auto'>
                        img
                    </div>
                    <div className='bg-neutral-300 h-auto'>
                        img
                    </div>
                    <div className='bg-neutral-300 h-auto'>
                        img
                    </div>
                    <div className='bg-neutral-300 h-auto'>
                        img
                    </div>
                </div>
           </section>
        </div>
    )
}

function NoEventsFound ({ pets } : { pets: Pet[] }) {
    return (
        <div className='p-8'>
            <h3>No events for this pet have been created yet.</h3>
            <AddNewEventModal pets={pets} />
        </div>
    )
}

function EventsPanel({ events, pets } : { events : any, pets : any }) {

    if(!events || events.length == 0) return <NoEventsFound pets={pets} />; 

    return (
        <section>
            {events && events.map((event : Event) => (
                <EventSummary event={event} />
            ))}
        </section>
    )
}

function NoMedicationsFound({ petName, petId } : { petName : string, petId: string }) {
    
    return (
        <div className="p-8">
            <H3>No Medications have been added for ${petName}</H3>
            <AddNewMedicationModal petId={petId} />
        </div>
    )
}

function MedicationPanel({ medications } : { medications: any }) {

    if(!medications) return <NoMedicationsFound petName={''} />
 
    return (
        <>
        
        </>
    )
}