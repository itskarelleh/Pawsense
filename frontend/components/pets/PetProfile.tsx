"use client"
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import classNames from 'classnames';
import PetAvatar from '../PetAvatar';
import { EditPencil } from 'iconoir-react';
import AddNewEventModal from '../events/AddNewEventModal';
import { AddNewMedicationModal, Medication, MedicationSummary } from '../medications';
import { Pet, Details, PetSexAndTypeField, PetBio } from '.';
import { Event, EventSummary } from '../events';
import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Field, Formik, FormikHelpers, FormikValues } from 'formik';
import ListboxField from '../ListboxField';
import { updatePetBio } from '@/server_actions';
import { ActionButton } from '../inputs';
import Modal from '../Modal';
import EditPetBioModal from './EditPetBioModal';
export default function PetProfile({ pet }: { pet: Pet }) {

    const { bio, events, medications } = pet;
    // const bio : any = { bio: 'Pinot is a big baby. He’s very vocal and will let you know how he feels. He looovvvees food a lot and always tries to steal extra cat food. He even tries to steal mine. He loves a lot of affection.', adoptionDate: '02/26/2022', age: 8, size: 'large', weight: 14.2, birthDate: '02/26' };

    return (
        <>
            <div className="w-screen grid grid-cols-1 md:grid-cols-12 gap-4 p-0 md:p-12">
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
                                <PetAboutPanel bio={bio} name={pet.name} />
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

function PetProfileHeader({ pet }: { pet: Pet }) {

    return (
        <header className="grid grid-cols-12 md:grid-cols-1 md:col-end-4 mb-8 md:mb-0 p-10 gap-8 md:gap-2">
            <div className="col-span-5 md:col-span-1 flex flex-col items-center justify-center">
                <div className="w-30 md:w-44">
                    {pet.avatar ? <PetAvatar imgId={pet.avatar} width={500} height={500} format='jpg' isRounded />
                        :
                        <Image src="/default-thumbnail.png" width={500} height={500} alt="generic" />
                    }
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



function PetAboutPanel({ bio, name }: { bio?: PetBio, name: string }) {

    const bioData: PetBio = bio || {};

    const { about, adoptionDate, birthDate, weight, size } = bioData

    
    async function handleSubmit(values : FormikValues | any) {
            
        const res = await updatePetBio(values);
    }

    return (
        <div className='p-8 mb-4'>
            <div className="flex flex-row space-x-4 w-full justify-between mb-8">
                <h2>About</h2>
                <EditPetBioModal title={`Editing ${name}'s Details`} bio={bioData} handleSubmit={handleSubmit} />
            </div>
            <div>
                <p className='w-full'>
                    {about ? about : `${name} does not have a bio yet.`}
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


function EventsPanel({ events, petId }: { events: any, petId: string | number }) {

    if (!events || events.length == 0) return (
        <div className='p-8'>
            <h3>No events for this pet have been created yet.</h3>
            <AddNewEventModal preselectedPets={[petId]} />
        </div>
    )

    return (
        <section>
            {events && events.map((event: Event) => (
                <EventSummary key={event.id} event={event} />
            ))}
        </section>
    )
}


function MedicationsPanel({ medications, pet }: { medications: any, pet: Pet }) {

    if (medications.length === 0) return (
        <div className="p-8">
            <h3>No Medications have been added for {pet.name}</h3>
            <AddNewMedicationModal pet={pet} />
        </div>
    )

    return (
        <>
            {medications && medications.map((medication: Medication) => (
                <MedicationSummary key={medication.id} medication={medication} />
            ))}
        </>
    )
}