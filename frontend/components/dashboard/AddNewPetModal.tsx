"use client"
import { ChangeEvent, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { useForm, Controller } from "react-hook-form";
import Datepicker from 'react-tailwindcss-datepicker';
import Image from 'next/image';
import Modal from '../Modal';

const animalTypes = [
  "cat", "dog", "snake", "tiger", "alligator", "cow", "sheep", "spider", "horse", "rabbit", "other", "imaginary",
];

function addNewPet(data: any) {
  console.log("Data: ");
  console.log(data);
  // const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/add`, {
  //   body: {
  //     userId: userId
  //   }
  // });

  // if(!res.ok) throw new Error('Failed to fetch data');

  // return res.json();
}

export default function AddNewPetModal() {

  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: {
    avatar: '',
    name: '',
    age: null,
    type: null,
    sex: null,
    adoptionDate: null
  } });

  const placeholder = "/paw-silhouette.png";

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {

        const imageDataUrl = reader.result as string;

        setAvatar(imageDataUrl);
      }

      reader.readAsDataURL(file);
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function PetAvatarField() {

    return (
      <div className="flex items-center justify-center relative mb-8">
        <div className="relative cursor-pointer w-28 h-28 rounded-full overflow-hidden bg-neutral-400">
          <Image fill
            className="absolute left-0 top-0 w-full"
            src={avatar || placeholder}
            alt="Avatar"
          />
          <input
            {...register('avatar')}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute opacity-0 w-full h-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    )
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
      <Modal title="Add New Pet" isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
        <div className='mt-2'>
          <form onSubmit={() => {
            handleSubmit(addNewPet);
            closeModal();
          }}>
            <PetAvatarField />
            <label htmlFor="name" className='flex flex-col mt-8 mb-2'>
              Name (required)
              <input {...register("name", { required: true })} className="border-b-2 border-neutral-400" type="text" id="name" placeholder="Fido" />
            </label>
            <label htmlFor="type" className='flex flex-col mb-2'>
              <AnimalTypeField control={control} />
            </label>
            <label htmlFor="adoptionDate" className='flex flex-col mb-2'>
              Adoption Date
              {/* <Datepicker {...register("adoptionDate")} /> */}
            </label>
            <div className="mt-4">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Add New Pet
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

const AnimalTypeField = ({ control }: { control: any }) => {
  return (
    <div>
      <label htmlFor="animalType" className="flex flex-col">Animal Type</label>
      <Controller
        control={control}
        name="animalType"
        render={({ field }) => (
          <Listbox value={field.value} onChange={field.onChange}>
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
        )}
      />
    </div>
  );
};

