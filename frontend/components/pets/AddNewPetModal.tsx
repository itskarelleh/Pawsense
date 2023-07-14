"use client"
import { Plus, Female, Male, QuestionMark, Cancel } from 'iconoir-react';
import { useState, useRef } from 'react'
import { Listbox } from '@headlessui/react'
import { Formik, Field, useField, FormikValues } from 'formik';
import Modal from '../Modal';
import { useUser } from '@clerk/nextjs';
import { ActionButton } from '../inputs';
import { addNewPet } from '@/server_actions';
import { uploadImage } from '@/functions';
import { RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import CustomToast from '../CustomToast';
import Intersex from '../Intersex';

interface InitialValues {
  name: string;
  type: string;
  sex: string;
  avatar: any;
  userId: string | undefined;
}

const animalTypes = [
  "cat", "dog", "raccoon", "turtle", "snake", "tiger", "alligator", "cow", "human", "sheep", "spider", "hedgehog", "fox", "fish", "octopus", "horse", "rabbit", "other", "imaginary",
];

export default function AddNewPetModal() {

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const initialValues : InitialValues = {
    name: '',
    type: '',
    sex: '',
    avatar: null,
    userId: user?.id
  } 
  
  function closeModal() {
    setIsOpen(prev => !prev);
  }

  function openModal() {
    setIsOpen(true)
  }

  async function handleSubmit(values : FormikValues | any) {
    
    const img = await uploadImage(values.avatar);

    const publicId = img.public_id;

    const body = {name: values.name, type: values.type, sex: values.sex, avatar: publicId, userId: values.userId }

    const newPet = await addNewPet(body);
    
    toast.success(
      <CustomToast>
        {newPet.name} has been added! <a href={`/pet/${newPet.id}`}>View new profile</a>
      </CustomToast>
    )
    
    closeModal();
  }
  
  return (
    <div>
      <div className="flex items-center justify-center">
        <ActionButton
          onClick={openModal}
        >
          <Plus />
        </ActionButton>
      </div>
      <Modal title="Add New Pet" isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
        <div className='mt-2'>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {props => (
      <form onSubmit={props.handleSubmit}>
        <PetAvatarField />
        <label htmlFor="name" className='flex flex-col mt-8 mb-2 text-sm'>
          Name (required)
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Fido"
            className="border-l-0 border-r-0 border-t-0 border-b-2 border-neutral-400 focus:bg-cyan-100"
          />
        </label>

          <label htmlFor="type" className='flex flex-col mb-2'>
            <AnimalTypeField />
          </label>
          <SexRadioGroup />
          <Field id="userId" name="userId" className="hidden" type="text" value={user?.id} />
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
      </form>
        )}
    </Formik>
        </div>
      </Modal>
    </div>
  )
}

function AnimalTypeField() {

  const [field, ,helpers] = useField('type');

  return (
    <div className=''>
      <Listbox value={field.value} onChange={(value) => helpers.setValue(value)}>
        {({ open }) => (
          <div className="cursor-pointer relative mt-1 border-b-2 border-neutral-400">
            <Listbox.Button className="flex flex-col mt-8 mb-2 text-sm w-full">{field.value || 'Select an animal type'}</Listbox.Button>
            {open && (
              <Listbox.Options className="scrollbar scrollbar-thumb-cyan-200 scrollbar-thin absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
                {animalTypes.map((type, index) => (
                  <Listbox.Option className="hover:bg-cyan-100 cursor-pointer" key={index} value={type}>
                    {type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </div>
        )}
      </Listbox>
    </div>
  );
}

function PetAvatarField() {
  const [avatar, setAvatar] = useState<File | null>(null);

  const [field, , helpers] = useField('avatar');
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = "/default-thumbnail.png";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      helpers.setValue(file);
      setAvatar(file);
    } else {
      helpers.setValue(null);
    }
  }

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setAvatar(null);
      helpers.setValue(null); // Clear the field value in Formik as well
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input click event
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-24 h-24 flex flex-col items-center justify-center relative mb-8">
        {field.value && (
          <button
            onClick={clearFileInput}
            className="bg-red-300 rounded-full w-6 h-6 absolute z-40 bottom-[2px] right-[2px] flex flex-col items-center justify-center"
            title="Remove image"
          >
            <Cancel className="w-full text-white font-semibold" />
          </button>
        )}
        <div className="relative cursor-pointer w-full h-full rounded-full overflow-hidden bg-neutral-400" onClick={handleClick}>
          <img
            className="absolute left-0 top-0 w-full"
            src={field.value ? URL.createObjectURL(avatar) : placeholder}
            alt="Avatar"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute opacity-0 w-full h-full cursor-pointer"
            ref={inputRef}
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent triggering handleClick twice
          />
        </div>
      </div>
      <label className="text-sm -mt-4">Select an image</label>
    </div>
  );
}

function SexRadioGroup() {

 
  return (
    <Field name="sex">
      {({ field: { value }, form: { setFieldValue } }) => (
        <RadioGroup value={value} onChange={setFieldValue} className="w-full">
          <RadioGroup.Label>Sex</RadioGroup.Label>
          <div className="flex flex-row space-x-2 w-full [&>div]:w-1/4">
            <RadioGroup.Option value="F">
              {({ checked }) => (
                <label className={`cursor-pointer text-center flex flex-col items-center justify-center p-2 ${checked ? 'bg-pink-200' : ''}`}>
                  <Field type="radio" name="sex" value="F" className="sr-only" />
                  <Female />
                  Female
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="M">
              {({ checked }) => (
                <label className={`cursor-pointer text-center flex flex-col items-center justify-center p-2 ${checked ? 'bg-blue-200' : ''}`}>
                  <Field type="radio" name="sex" value="M" className="sr-only" />
                  <Male />
                  Male
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="I">
              {({ checked }) => (
                <label className={`cursor-pointer relative text-center flex flex-col items-center justify-center p-2 ${checked ? 'bg-purple-200' : ''}`}>
                  <Field type="radio" name="sex" value="I" className="sr-only" />
                  <Intersex />
                  Intersex
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="?">
              {({ checked }) => (
                <label className={`cursor-pointer text-center flex flex-col items-center justify-center p-2 ${checked ? 'bg-yellow-200' : ''}`}>
                  <Field type="radio" name="sex" value="?" className="sr-only" />
                  <QuestionMark />
                  Unknown
                </label>
              )}
            </RadioGroup.Option>
          </div>
        </RadioGroup>
      )}
    </Field>
  );
}