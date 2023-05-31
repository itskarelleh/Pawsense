import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { fakePets, fakeEvents } from "@/data"
import classNames from 'classnames';
import CurrentMood from "@/components/CurrentMood";

// function getPetById(id : string) {
//     const res = fakePets.map((pet) => pet.id === id);

//     return res;
// }

export default function Page() {

    const [data, setData] = useState(fakePets[0]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <header className="md:col-end-2 flex flex-col">
                <h1 className='text-3xl font-bold'>{data.name}</h1>
                <figure className="overflow-hidden">
                    <img className='w-full' src={data.photo} />
                </figure>
                <CurrentMood mood={data.mood} />
            </header>
            <section className='md:col-start-2 md:col-end-4'>
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
    )
}


