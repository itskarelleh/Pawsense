// 'use client'
import { Fragment, ReactComponentElement, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import Dropzone from 'react-dropzone-uploader';
import Datepicker from 'react-tailwindcss-datepicker';


interface FormData {
  photo: FileList;
  name: string;
  adoptionDate: string;
  type: string;
  sex: string;
}

const animalTypes = [
  "cat", "dog", "snake", "tiger", "alligator", "cow", "sheep", "spider", "rabbit", "other"
];

export default function AddNewPetModal({ onSubmit } :any ) {
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let [isOpen, setIsOpen] = useState(false);
  
  function closeModal() {
      setIsOpen(false)
    }
  
  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          +
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Pet
                  </Dialog.Title>
                  <div className='mt-2'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="photo" className='flex flex-col mb-2'>
                      Photo
                      <input {...register("photo")} className="border-neutral-400" type="file" id="photo" />
                    </label>
                    <label htmlFor="name" className='flex flex-col mb-2'>
                      Name (required)
                      <input {...register("name", { required: true })} className="border-b-2 border-neutral-400" type="text" id="name" placeholder="Fido" />
                    </label>
                    <label htmlFor="type" className='flex flex-col mb-2'>
                      Type (required)
                      <Listbox {...register("type")} name='type'>
                        <Listbox.Button></Listbox.Button>
                        <Listbox.Options>
                          {animalTypes.map((type, index) => (
                            <Listbox.Option key={index} value={type} as={Fragment}>
                              {type}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                    </label>
                    <label htmlFor="adoptionDate" className='flex flex-col mb-2'>
                      Adoption Date
                      <input {...register("adoptionDate")} className="border-neutral-400" type="text" id="adoptionDate" />
                    </label>
                    <button type="submit">Submit</button>
                  </form>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button onClick={() => {
                      onSubmit();
                      closeModal();
                    }}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Add New Pet
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}