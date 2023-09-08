"use client"
import { Menu, Tab, Transition } from '@headlessui/react';
import Image from 'next/image';
import classNames from 'classnames';
import PetAvatar from '../PetAvatar';
import AddNewEventForPetModal from '../events/AddNewEventForPetModal';
import { AddNewMedicationModal, Medication, MedicationSummary } from '../medications';
import { Pet, PetSexAndTypeField, PetStats } from '.';
import { Event, EventSummary } from '../events';
import { Note, NotesList, AddNewNoteModal } from '../notes';
import { FormikValues } from 'formik';
import { deletePet, updatePet, updatePetStats } from '@/server_actions';
import EditPetStatsModal from './EditPetStatsModal';
import { toast } from 'react-toastify';
import { Fragment, useState } from 'react';
import { redirect } from 'next/navigation';
import PetForm from './PetForm';
import Modal from '../Modal';
import { uploadImage } from '@/functions';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({ 
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
});

export default function PetProfile({ pet }: { pet: Pet }) {

    const { petStats, events, medications, notes, moods } = pet;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-0 md:p-12">
                <PetProfileHeader pet={pet} />
                <section className='md:t-4 md:col-span-8 bg-white min-h-screen'>
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
                                Notes
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2 w-full">
                            <Tab.Panel className={classNames(
                                'rounded-xl p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                            )}
                            >
                                <PetAboutPanel id={pet.id} bio={petStats} name={pet.name} />
                            </Tab.Panel>
                            <Tab.Panel className={classNames(
                                'rounded-xl p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                            )}
                            >
                                <EventsPanel events={events} pet={pet} />
                            </Tab.Panel>
                            <Tab.Panel className={classNames(
                                'rounded-xl p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                            )}
                            >
                                <MedicationsPanel medications={medications} pet={pet} />
                            </Tab.Panel>
                            <Tab.Panel className={classNames(
                                'rounded-xl p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                            )}
                            >
                                <NotesPanel notes={notes} pet={pet} />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </section>
            </div>
        </>
    )
}

function PetProfileHeader({ pet }: { pet: Pet }) {
    
    const [ isOpen, setIsOpen ] = useState(false);
    const closeModal = () => setIsOpen(prev => !prev);

    const initialValues : any = {
        name: pet.name, 
        type: pet.type, 
        breed: pet.breed, 
        color: pet.color, 
        sex: pet.sex,
        avatar: pet.avatar ? pet.avatar : '',
        userId: pet.userId 
    }

    const onUpdate = async (values : any) => {
        try {
            if(values.avatar != pet.avatar) {
                const avi = await uploadImage(values.avatar);
                values.avatar = avi;
            }
            const res = await updatePet(values);

            toast.success(`${pet.name}'s info has been updated!`);
        } catch(err) {
            toast.error("Pet could not be updated. Please try again")
        }
    }


    const onDelete = async () => {

        try {
            const res = await deletePet(pet.id);
            return redirect('/dashboard');
        } catch(err) {
            toast.error("Pet could not be deleted. Please try again.");
        }
    }

    const DropDown = () => (
        <Menu as="div" className="absolute right-0 inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Options
                </Menu.Button>
            </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setIsOpen(true)}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block w-full px-4 py-2 text-sm text-left`}
                >
                  Update
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block w-full px-4 py-2 text-sm text-left`}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    );

    return (
        <>
            <header className="grid grid-cols-12 md:grid-cols-1 md:col-span-4 mb-8 md:mb-0 p-10 gap-8 md:gap-2 relative">
            <div className="col-span-5 md:col-span-1 flex flex-col items-center justify-center">
                <div className="w-30 md:w-44">
                    {pet.avatar ? 
                        <PetAvatar imgId={pet.avatar} width={500} height={500} format='jpg' isRounded />
                        :
                        <Image src="/default-thumbnail.png" width={500} height={500} alt="generic" />
                    }
                </div>
            </div>
            <div className="col-span-7 md:col-span-1 md:flex md:flex-col md:items-center">
                <div className="flex flex-row items-center space-x-4">
                    <h1>{pet.name}</h1>
                    <PetSexAndTypeField type={pet.type} sex={pet.sex} />
                </div>
                {pet.breed}
                {pet.color}
            </div>
            <DropDown />
        </header>
        <Modal title="Update Pet" isOpen={isOpen} closeModal={closeModal}>
            <PetForm 
            onSubmitButtonLabel="Update"
            imageUrl={pet.avatar.length > 0 ? cld.image(pet.avatar).toURL() : ''}
            initialValues={initialValues} 
            onSubmit={onUpdate}
            closeModal={closeModal} />
        </Modal>
        </>
    )
}

function TabPanel({ title, actions, children } : { title: string, actions : React.ReactNode, children : React.ReactNode }) {

    return (
        <div className='p-8 mb-4'>
            <div className="flex flex-row space-x-4 w-full justify-between mb-8">
                <h2>{title}</h2>
                {actions}
            </div>
            <div>
               {children}
            </div>
        </div>
    )
}

function NotesPanel({ notes, pet } : { notes : Note[] | undefined | null, pet: Pet }) {
    if (!notes || notes.length == 0) return (
        <TabPanel title="Notes" actions={
        <>
            <AddNewNoteModal pet={pet} />
            </>}>
            <h3>No events for this pet have been created yet.</h3>
        </TabPanel>
    );

    return (
        <TabPanel title="Notes" actions={<AddNewNoteModal pet={pet} />}>
            {notes === undefined || notes === null  ? (
            <h3>No notes for {pet.name}</h3>
            ) : (
                <NotesList notes={notes} />
            )}
        </TabPanel>
    )
}

function PetAboutPanel({ bio, name, id }: { bio?: PetStats, name: string, id: string | number }) {

    const bioData: PetStats = bio || {};

    const { about, adoptionDate, birthDate, weight, size } = bioData;
    
    async function handleSubmit(values : FormikValues | any) {
        try {
            console.log(values)
            const res = await updatePetStats(values);
            toast.success("Pet bio updated successfully");
        } catch(e) {
            toast.error("Error updating");
        }
    }

    return (
        <TabPanel title={`${name}'s Bio`} actions={<><EditPetStatsModal title={`Editing ${name}'s Details`} bio={bioData} petId={id} handleSubmit={handleSubmit} /></>}>
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
        </TabPanel>
    )
}

function EventsPanel({ events, pet }: { events: any, pet : Pet }) {

    if (!events || events.length == 0) return (
        <TabPanel title="Events" actions={
        <>
            <AddNewEventForPetModal pet={pet} />
            </>}>
            <h3>No events for this pet have been created yet.</h3>
        </TabPanel>
    );

    return (
        <TabPanel title={`Events`} actions={<><AddNewEventForPetModal pet={pet} /></>}>
            <div>
            {events && events.map((event: Event) => (
                <EventSummary key={event.id} event={event} />
            ))}
            </div>
        </TabPanel>
    )
}


function MedicationsPanel({ medications, pet } : { medications: any, pet: Pet }) {

    if (medications.length === 0) return (
        <div className="p-8">
            <h3>No Medications have been added for {pet.name}</h3>
            <AddNewMedicationModal pet={pet} />
        </div>
    )

    return (
        <TabPanel title="Medications" actions={<><AddNewMedicationModal pet={pet} /></>}> 
            <div>
                {medications && medications.map((medication: Medication) => (
                    <MedicationSummary key={medication.id} medication={medication} />
                ))}
            </div>
        </TabPanel>
    )
}