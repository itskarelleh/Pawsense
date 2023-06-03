"use client"
import { ChangeEvent, useState, useRef } from 'react'
import { Listbox } from '@headlessui/react'
import { Formik, Form, Field, FormikValues, useField } from 'formik';
import Image from 'next/image';
import Modal from '../Modal';
import { useUser } from '@clerk/nextjs';
import classnames from 'classnames';

const animalTypes = [
  "cat", "dog", "snake", "tiger", "alligator", "cow", "sheep", "spider", "horse", "rabbit", "other", "imaginary",
];

function addNewPet(data : any) {
  alert(JSON.stringify(data));
  // const res = fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/add`, {
  //   body: data
  // });

  // if(!res.ok) throw new Error('Failed to fetch data');

  // return res.json();
}

interface InitialValues {
  name: string;
  avatar: File | null;
  type: string;
  userId: string | undefined;
}

export default function AddNewPetModal() {

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  
  
  const initialValues : InitialValues = {
    name: '',
    avatar: null,
    type: '',
    userId: user?.id
  } 

  const handleSubmit = (values : FormikValues) => {
    addNewPet(values);
    closeModal();
  }


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
          className="rounded-full h-10 w-10 bg-cyan-500 hover:bg-purple-400 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          +
        </button>
      </div>
      <Modal title="Add New Pet" isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
        <div className='mt-2'>
        
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <PetAvatarField />

        <label htmlFor="name" className='flex flex-col mt-8 mb-2 text-sm'>
          Name (required)
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Fido"
            className="border-b-2 border-neutral-400"
          />
        </label>

        <label htmlFor="type" className='flex flex-col mb-2'>
          <AnimalTypeField />
        </label>

        <div className="mt-4">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Add New Pet
          </button>
        </div>
      </Form>
    </Formik>
        </div>
      </Modal>
    </>
  )
}

function AnimalTypeField() {
  const [field, ,helpers] = useField('type');

  return (
    <div>
      <label htmlFor="animalType" className="flex flex-col text-sm">Animal Type</label>
      <Listbox value={field.value} onChange={(value) => helpers.setValue(value)}>
        {({ open }) => (
          <>
            <Listbox.Button>{field.value || 'Select an animal type'}</Listbox.Button>
            {open && (
              <Listbox.Options>
                {animalTypes.map((type, index) => (
                  <Listbox.Option key={index} value={type}>
                    {type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
}

function PetAvatarField() {
  const [ avatar, setAvatar ] = useState(null);
  const [field, , helpers] = useField('avatar');
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = "/paw-silhouette.png";

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        helpers.setValue(imageDataUrl);
        setAvatar(file);
      };

      reader.readAsDataURL(file);

    } else {
      helpers.setValue(null);
    }
  }

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative mb-8">
      <div className="relative cursor-pointer w-28 h-28 rounded-full overflow-hidden bg-neutral-400">
        <img className="absolute left-0 top-0 w-full" src={field.value ? URL.createObjectURL(avatar) : placeholder} alt="Avatar" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute opacity-0 w-full h-full cursor-pointer"
            ref={inputRef}
            onClick={clearFileInput}
          />
      </div>
      <label className='text-sm mt-4'>
          Select an image
        </label>
    </div>
  );
}
