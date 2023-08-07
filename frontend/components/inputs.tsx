import React, { useState, useRef, ReactNode, ButtonHTMLAttributes } from 'react';
import { Formik, Field, useField, FormikValues } from 'formik';
import { RadioGroup, Listbox } from '@headlessui/react';
import Intersex from './Intersex';
import { Plus, Female, Male, QuestionMark, Cancel } from 'iconoir-react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="rounded-full transition-all ease-in-out h-10 w-10 bg-sky-500 items-center justify-center flex flex-col hover:bg-rose-400 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    {children}
  </button>
);

export function AnimalTypeField() {

  const [field, , helpers] = useField('type');

  return (
    <div className=''>
      <Listbox value={field.value} onChange={(value) => helpers.setValue(value)}>
        {({ open }) => (
          <div className="cursor-pointer relative mt-1 border-b-2 border-neutral-400">
            <Listbox.Button className="flex flex-col mt-8 mb-2 text-sm w-full">{field.value || 'Select an animal type'}</Listbox.Button>
            {open && (
              <Listbox.Options className="scrollbar scrollbar-thumb-sky-200 scrollbar-thin absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
                {animalTypes.map((type, index) => (
                  <Listbox.Option className="hover:bg-sky-100 cursor-pointer" key={index} value={type}>
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

export function PetAvatarField() {
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

export function SexRadioGroup() {

  return (
    <Field name="sex">
      {({ field: { value }, form: { setFieldValue } } : { field: { value : any }, form: { setFieldValue : any }}) => (
        <RadioGroup value={value} onChange={setFieldValue} className="w-full">
          <RadioGroup.Label>Sex</RadioGroup.Label>
          <div className="flex flex-row space-x-2 w-full [&>div]:w-1/4">
            <RadioGroup.Option value="F">
              {({ checked }) => (
                <label className={`rounded-md cursor-pointer text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-pink-200' : ''}`}>
                  <Field type="radio" name="sex" value="F" className="sr-only" />
                  <Female />
                  Female
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="M">
              {({ checked }) => (
                <label className={`rounded-md cursor-pointer text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-blue-200' : ''}`}>
                  <Field type="radio" name="sex" value="M" className="sr-only" />
                  <Male />
                  Male
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="I">
              {({ checked }) => (
                <label className={`rounded-md cursor-pointer relative text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-purple-200' : ''}`}>
                  <Field type="radio" name="sex" value="I" className="sr-only" />
                  <Intersex />
                  Intersex
                </label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="?">
              {({ checked }) => (
                <label className={`rounded-md cursor-pointer text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-yellow-200' : ''}`}>
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