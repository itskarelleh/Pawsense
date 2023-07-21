"use client"
import { Tab } from '@headlessui/react';
// import CurrentMood from "@/components/CurrentMood";
import classNames from 'classnames';
import PetAvatar from '../PetAvatar';
import { useState } from 'react';
import { EditPencil } from 'iconoir-react';
import AddNewEventModal from '../events/AddNewEventModal';
import { AddNewMedicationModal, Medication, MedicationSummary } from '../medications';
import { Pet, Details, PetSexAndTypeField } from '.';
import { Event, EventSummary } from '../events';

export default function PetDetails({ pet, details, medications, events } : { pet : Pet, details: Details, medications: any, events: any  }) {
    
    return (
        <>
        <div className="w-screen grid grid-cols-1 md:grid-cols-12 gap-4">
            <PetProfileHeader pet={pet} />
            <section className='md:t-4 md:col-start-5 col-span-8 bg-white min-h-screen'>
                <Tab.Group>
                    <Tab.List className="pt-4 flex space-x-l  bg-neutral-100">
                        <Tab className={({ selected }) =>
                            classNames(
                                'tab-default',
                                'tab-focus',
                                selected
                                    ? 'tab-active'
                                    : ''
                            )
                        }
                        >
                            About
                        </Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                                'tab-default',
                                'tab-focus',
                                selected
                                    ? 'tab-active'
                                    : ''
                            )
                        }
                        >
                            Event
                        </Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                                'tab-default',
                                'tab-focus',
                                selected
                                    ? 'tab-active'
                                    : ''
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
                            <EventsPanel events={events} petId={pet.id} />
                        </Tab.Panel>
                        <Tab.Panel className={classNames(
                            'rounded-xl p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                        )}
                        >
                            <MedicationsPanel medications={medications} pet={pet} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </div>
        </>
    )
}


function PetProfileHeader({ pet } :  { pet : Pet }) {

    return (
        <header className="grid grid-cols-12 md:grid-cols-1 md:col-end-4 mb-8 md:mb-0 p-10 gap-8 md:gap-2">
            <div className="col-span-5 md:col-span-1 flex flex-col items-center justify-center">
                <div className="w-30 md:w-44">
                    <PetAvatar imgId={pet.avatar} width={500} height={500} format='jpg' isRounded />
                </div>
            </div>
            <div className="col-span-7 md:col-span-1 md:flex md:flex-col md:items-center">
                <div className="flex flex-row items-center space-x-4">
                    <h1>{pet && pet.name}</h1>
                    <PetSexAndTypeField type={pet.type} sex={pet.sex} />
                </div>
                {pet.nicknames && pet.nicknames}
            </div>
        </header>
    )
}
function PetAboutPanel({ about, name } : { about : any, name: string }) {
    
    const { adoptionDate, birthDate, weight, size, bio } = about;
    
    return (
        <div className='p-8 mb-4'>
            <div className="flex flex-row space-x-4 w-full justify-between mb-8">
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
        </div>
    )
}


function EventsPanel({ events, petId } : { events : any, petId : string }) {

    if(!events || events.length == 0) return (
        <div className='p-8'>
            <h3>No events for this pet have been created yet.</h3>
            <AddNewEventModal preselectedPets={[petId]} />
        </div>
    ) 

    return (
        <section>
            {events && events.map((event : Event) => (
                <EventSummary key={event.id} event={event} />
            ))}
        </section>
    )
}


function MedicationsPanel({ medications, pet } : { medications: any, pet: Pet }) {

    if(medications.length === 0) return (
        <div className="p-8">
            <h3>No Medications have been added for {pet.name}</h3>
            <AddNewMedicationModal pet={pet} />
        </div>
    )
 
    return (
        <>
            {medications && medications.map((medication : Medication) => (
                <MedicationSummary key={medication.id} medication={medication} />
            ))}
        </>
    )
}