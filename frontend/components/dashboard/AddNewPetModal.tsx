"use client"
import { Plus, Female, Male, QuestionMark, Cancel } from 'iconoir-react';
import { ChangeEvent, useState, useRef } from 'react'
import { Listbox } from '@headlessui/react'
import { Formik, Field, useField } from 'formik';
import Modal from '../Modal';
import { useUser } from '@clerk/nextjs';
import { ActionButton } from '../inputs';
import { addNewPet } from '@/actions';
import { RadioGroup } from '@headlessui/react'
interface InitialValues {
  name: string;
  type: string;
  sex: string;
  avatar: File | string | null;
  userId: string | undefined;
}

const animalTypes = [
  "cat", "dog", "raccoon", "turtle", "snake", "tiger", "alligator", "cow", "human", "sheep", "spider", "hedgehog", "fox", "fish", "octopus", "horse", "rabbit", "other", "imaginary",
];

export default function AddNewPetModal() {
  //TODO: make isOpen false by default
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();

  const initialValues : InitialValues = {
    name: '',
    type: '',
    sex: '',
    avatar: null,
    userId: user?.id
  } 

  const uploadImage = async( values : any ) => {
    if(values.avatar === undefined || values.avatar === '' || values.avatar === null) return null;

    const formData = new FormData();

    formData.append("file", values.avatar);
    formData.append("upload_preset", "jpttrz2h");

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });
          
    const avatarData = await res.json();

    return avatarData.public_id;

  }
  
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
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
        <Formik initialValues={initialValues} onSubmit={async (values, actions) => {
        
          const avatarRes = await uploadImage(values);
        
          const modifiedBody = {...values, avatar: avatarRes, userId: user?.id }
        
          const res = await addNewPet(modifiedBody);

          const d = await res.json();

          console.log(d);

          closeModal();
          
       }}>
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
            className="border-b-2 border-neutral-400 focus:bg-cyan-100"
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
      {/* <label htmlFor="animalType" className="flex flex-col text-sm sr-only">Animal Type</label> */}
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

  const placeholder = process.env.THUMBNAIL_PLACEHOLDER;

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

  const Intersex = () => (
    <>
      <svg width="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 322.187 322.187">
        <path id="XMLID_484_" d="M281.439,14.934c-0.002-0.471-0.025-0.941-0.071-1.411c-0.023-0.236-0.067-0.466-0.101-0.699  c-0.037-0.25-0.065-0.502-0.115-0.75c-0.052-0.264-0.124-0.52-0.19-0.778c-0.055-0.215-0.102-0.431-0.165-0.644  c-0.077-0.254-0.172-0.5-0.262-0.748c-0.077-0.212-0.146-0.426-0.232-0.636c-0.098-0.235-0.212-0.462-0.321-0.691  c-0.101-0.213-0.195-0.429-0.307-0.638c-0.121-0.226-0.258-0.44-0.39-0.659c-0.121-0.2-0.233-0.403-0.364-0.599  c-0.167-0.25-0.353-0.487-0.534-0.727c-0.114-0.15-0.218-0.305-0.338-0.452c-0.631-0.77-1.336-1.476-2.106-2.106  c-0.138-0.113-0.285-0.211-0.426-0.318c-0.248-0.189-0.494-0.381-0.754-0.554c-0.186-0.124-0.379-0.231-0.569-0.346  c-0.229-0.139-0.455-0.282-0.691-0.409c-0.196-0.104-0.397-0.192-0.596-0.287c-0.244-0.117-0.485-0.237-0.736-0.341  c-0.191-0.079-0.386-0.141-0.579-0.212c-0.268-0.098-0.533-0.2-0.807-0.282c-0.187-0.056-0.377-0.097-0.565-0.145  c-0.285-0.074-0.568-0.152-0.859-0.21c-0.204-0.04-0.41-0.063-0.615-0.094c-0.278-0.043-0.553-0.093-0.836-0.121  c-0.325-0.031-0.65-0.039-0.977-0.049C266.768,0.019,266.607,0,266.442,0h-47.359c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15  h11.148l-22.598,22.598C190.188,39.471,168.51,31.68,145.046,31.68c-57.512,0-104.302,46.79-104.302,104.303  c0,52.419,38.871,95.923,89.301,103.219l0.001,19.497h-18.487c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h18.488l0.001,18.488  c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15.001l-0.001-18.487h18.487c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15h-18.487  l-0.001-19.497c50.43-7.295,89.302-50.8,89.302-103.219c0-23.251-7.65-44.748-20.562-62.111l22.656-22.657V62.36  c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V15C281.442,14.978,281.439,14.957,281.439,14.934z M145.046,210.285  c-40.97,0-74.302-33.332-74.302-74.302c0-40.971,33.331-74.303,74.302-74.303c40.97,0,74.302,33.332,74.302,74.303  C219.348,176.953,186.016,210.285,145.046,210.285z"/>
      </svg>
    </>
)

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