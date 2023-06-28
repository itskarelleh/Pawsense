"use client"
import { Tab } from '@headlessui/react';
import CurrentMood from "@/components/CurrentMood";
import classNames from 'classnames';
import PetAvatar from '../PetAvatar';
import { useState } from 'react';

export default function PetDetails({ pet } : { pet : any }) {
    
    const [ details, setDetails ] = useState({
        about: pet,
        medications: [],
        events: [],
    });

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-12">
            <header className="md:col-end-5 flex flex-col">
                <h1 className='text-3xl font-bold'>{pet && pet.name}</h1>
                {/* TODO: still working on pet avatar and cloudinary */}
                <PetAvatar imgId="/pets/zfo2tzlds17ne1xcx0fu" width={250} height={250} format='jpg' radius={0} />
            </header>
            <section className='md:col-start-6 md:col-end-12'>
                <Tab.Group>
                    <Tab.List className="flex space-x-l p-1 bg-neutral-200 dark:bg-neutral-900">
                        <Tab className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-600',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-cyan-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >
                            About
                        </Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-600',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-cyan-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >
                            Event
                        </Tab>
                        <Tab className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-600',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-cyan-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >
                            Medication
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2 w-full">
                        <Tab.Panel className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                        )}
                        >
                        </Tab.Panel>
                        <Tab.Panel className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2'
                        )}
                        >
                        </Tab.Panel>
                        <Tab.Panel className={classNames(
                            'rounded-xl bg-white p-3',
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