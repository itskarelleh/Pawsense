import React, { useState, useEffect, useRef, ReactNode, ButtonHTMLAttributes } from 'react';
import { Field, useField, useFormikContext, ErrorMessage } from 'formik';
import { RadioGroup, Listbox } from '@headlessui/react';
import Intersex from './Intersex';
import { Female, Male, QuestionMark, Cancel } from 'iconoir-react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { getCroppedImg} from "@/utils";
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'

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

export const ListboxField = ({
  type,
  label,
  options,
  defaultValue,
  errorMessageName
}: {
  type: string;
  label: string;
  options: any;
  defaultValue?: string;
  errorMessageName?: string;
}) => {
  const [field, , helpers] = useField(type);

  return (
    <div className="w-full">
      {errorMessageName && (<ErrorMessage className="text-xs text-red-500" name={errorMessageName} />)}
      <Listbox value={field.value} onChange={(value) => helpers.setValue(value)}>
        {({ open }) => (
          <div className="input cursor-pointer relative w-full">
            <Listbox.Button
              as="button"
              className="h-10 px-4 capitalize text-sm w-full text-left"
            >
              <div>{field.value || label}</div>
            </Listbox.Button>
            {open && (
              <Listbox.Options
                defaultValue={defaultValue}
                as="ul"
                className="scrollbar-thumb-sky-200 scrollbar absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white transition-all ease-in-out 
                py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40 px-2"
              >
                {options.map((option: string, index: number) => ( // Change options.map
                  <Listbox.Option
                    className="hover:bg-rose-200 cursor-pointer capitalize h-full transition-all ease-in-out"
                    key={index}
                    value={option}
                  >
                    {option}
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


export const PetAvatarField: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [avatar, setAvatar] = useState<File | string | null>(null);

  const [field, , helpers] = useField<any>('avatar');
  const inputRef = useRef<HTMLInputElement>(null);

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
      if(imageUrl)
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

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) setAvatar(imageUrl);
  }, [imageUrl]);

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
          {/*<img*/}
          {/*  className="absolute left-0 top-0 w-full"*/}
          {/*  src={avatar instanceof File*/}
          {/*    ? URL.createObjectURL(avatar)*/}
          {/*    : avatar*/}
          {/*    ? avatar // Use the provided image URL if it exists*/}
          {/*    : "/default-thumbnail.png"}*/}
          {/*  alt="Avatar"*/}
          {/*/>*/}
          <Image width={300} height={300}
            className="absolute left-0 top-0 w-full"
            src={avatar instanceof File
              ? URL.createObjectURL(avatar)
              : avatar
                ? avatar // Use the provided image URL if it exists
                : "/default-thumbnail.png"}
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
      <>
        <label className="text-sm -mt-4">Select an image</label>
      </>
    </div>
  );
};

export const SexRadioGroup: React.FC = () => {
  return (
    <div>
      <Field name="sex">
        {({ field: { value }, form: { setFieldValue } }: { field: { value: any }; form: { setFieldValue: any } }) => (
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
      <ErrorMessage name="sex" className='text-xs text-red-500' />
    </div>
  );
};

export const MultiSelectListbox: React.FC<{ label: string; options: string[]; name: string }> = ({ label, options, name }) => {
  const [field] = useField<string>(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (selectedOption: any) => {
    const isSelected = field.value.some((option : any) => option.value === selectedOption.value);

    if (isSelected) {
      // Remove the option if it's already selected
      const updatedOptions = field.value.filter((option : string) => option.value !== selectedOption.value);
      setFieldValue(name, updatedOptions);
    } else {
      // Add the option if it's not selected
      setFieldValue(name, [...field.value, selectedOption]);
    }
  };

  return (
    <Listbox as="div" className="space-y-2">
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:border-blue">
            <span className="block truncate">
                {field.value.length === 0 ? 'Select options...' : field.value.join(', ')}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Listbox.Options
              className={`${
                open ? 'block' : 'hidden'
              } absolute w-full py-1 mt-2 scroll bg-white border rounded-md shadow-lg focus:outline-none overflow-y-auto max-h-48`}
            >
              {options.map((option) => (
                <Listbox.Option title={option.description} key={option.value} value={option.value}>
                  {({ active, selected }) => (
                    <div
                      onClick={() => handleChange(selected ? field.value.filter((v) => v !== option) : [...field.value, option])}
                      className={`${
                        active ? 'text-white bg-blue-600' : ''
                      } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                    >
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } block truncate`}
                      >
                        {option.icon}
                        {option.value}
                      </span>
                      {selected && (
                        <span
                          className={`${
                            active ? 'text-white' : 'text-blue-600'
                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </>
      )}
    </Listbox>
  );
};




// export function PetAvatarField({ imageUrl } : { imageUrl : string }) {
//   const [avatar, setAvatar] = useState<File | string | null>(null);

//   const [field, , helpers] = useField<any>('avatar');
//   const inputRef = useRef<HTMLInputElement>(null);

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];

//     if (file) {
//       helpers.setValue(file);
//       setAvatar(URL.createObjectURL(file));
//     } else {
//       helpers.setValue(null);
//     }
//   }

//   const clearFileInput = () => {
//     if (inputRef.current) {
//       inputRef.current.value = '';
//       setAvatar(null);
//       helpers.setValue(null); // Clear the field value in Formik as well
//     }
//   };

//   const handleClick = () => {
//     if (inputRef.current) {
//       inputRef.current.click(); // Trigger the file input click event
//     }
//   };

//   useEffect(() => {
//     if(imageUrl && (imageUrl.length > 0)) setAvatar(imageUrl);
//   }, [imageUrl]);

//   return (
//     <div className="w-full flex flex-col items-center justify-center">
//       <div className="w-24 h-24 flex flex-col items-center justify-center relative mb-8">
//         {field.value && (
//           <button
//             onClick={clearFileInput}
//             className="bg-red-300 rounded-full w-6 h-6 absolute z-40 bottom-[2px] right-[2px] flex flex-col items-center justify-center"
//             title="Remove image"
//           >
//             <Cancel className="w-full text-white font-semibold" />
//           </button>
//         )}
//         <div className="relative cursor-pointer w-full h-full rounded-full overflow-hidden bg-neutral-400" onClick={handleClick}>
//           <img
//             className="absolute left-0 top-0 w-full"
//             src={field.avatar ? URL.createObjectURL(avatar) : "/deafult-thumbnail.png"}
//             alt="Avatar"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="absolute opacity-0 w-full h-full cursor-pointer"
//             ref={inputRef}
//             onClick={(e) => e.stopPropagation()} // Stop propagation to prevent triggering handleClick twice
//           />
//         </div>
//       </div>
//       <>
//         <label className="text-sm -mt-4">Select an image</label>
//       </>
//     </div>
//   );
// }

// export function SexRadioGroup() {

//   return (
//     <div>
//     <Field name="sex">
//       {({ field: { value }, form: { setFieldValue } } : { field: { value : any }, form: { setFieldValue : any }}) => (
//         <RadioGroup value={value} onChange={setFieldValue} className="w-full">
//           <RadioGroup.Label>Sex</RadioGroup.Label>
//           <div className="flex flex-row space-x-2 w-full [&>div]:w-1/4">
//             <RadioGroup.Option value="F">
//               {({ checked }) => (
//                 <label className={`rounded-md cursor-pointer text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-pink-200' : ''}`}>
//                   <Field type="radio" name="sex" value="F" className="sr-only" />
//                   <Female />
//                   Female
//                 </label>
//               )}
//             </RadioGroup.Option>
//             <RadioGroup.Option value="M">
//               {({ checked }) => (
//                 <label className={`rounded-md cursor-pointer text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-blue-200' : ''}`}>
//                   <Field type="radio" name="sex" value="M" className="sr-only" />
//                   <Male />
//                   Male
//                 </label>
//               )}
//             </RadioGroup.Option>
//             <RadioGroup.Option value="I">
//               {({ checked }) => (
//                 <label className={`rounded-md cursor-pointer relative text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-purple-200' : ''}`}>
//                   <Field type="radio" name="sex" value="I" className="sr-only" />
//                   <Intersex />
//                   Intersex
//                 </label>
//               )}
//             </RadioGroup.Option>
//             <RadioGroup.Option value="?">
//               {({ checked }) => (
//                 <label className={`rounded-md cursor-pointer text-xs text-center flex flex-col items-center justify-center p-2 transition-all ease-in-out ${checked ? 'bg-yellow-200' : ''}`}>
//                   <Field type="radio" name="sex" value="?" className="sr-only" />
//                   <QuestionMark />
//                   Unknown
//                 </label>
//               )}
//             </RadioGroup.Option>
//           </div>
//         </RadioGroup>
//       )}
//     </Field>
//     <ErrorMessage name="sex" className='text-xs text-red-500' />
//     </div>
//   );
// }


// export function MultiSelectListbox({ label, options, name } : { label: string, options: any[], name: string }) {
//   const [field] = useField(name);
//   const { setFieldValue } = useFormikContext();

//   const handleChange = (selectedOption: any) => {
//     const isSelected = field.value.some((option) => option.value === selectedOption.value);

//     if (isSelected) {
//       // Remove the option if it's already selected
//       const updatedOptions = field.value.filter((option) => option.value !== selectedOption.value);
//       setFieldValue(name, updatedOptions);
//     } else {
//       // Add the option if it's not selected
//       setFieldValue(name, [...field.value, selectedOption]);
//     }
//   };

//   return (
//     <Listbox as="div" className="space-y-2">
//       {({ open }) => (
//         <>
//           <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
//           <div className="relative">
//             <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:border-blue-300">
//               <span className="block truncate">
//                 {field.value.length === 0 ? 'Select options...' : field.value.join(', ')}
//               </span>
//               <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-gray-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </span>
//             </Listbox.Button>
//             <Listbox.Options
//               className={`${
//                 open ? 'block' : 'hidden'
//               } absolute w-full py-1 mt-2 scroll bg-white border rounded-md shadow-lg focus:outline-none overflow-y-auto max-h-48`}
//             >
//               {options.map((option) => (
//                 <Listbox.Option title={option.description} key={option.value} value={option.value}>
//                   {({ active, selected }) => (
//                     <div
//                       onClick={() => handleChange(selected ? field.value.filter((v) => v !== option) : [...field.value, option])}
//                       className={`${
//                         active ? 'text-white bg-blue-600' : ''
//                       } cursor-pointer select-none relative py-2 pl-10 pr-4`}
//                     >
//                       <span
//                         className={`${
//                           selected ? 'font-semibold' : 'font-normal'
//                         } block truncate`}
//                       >
//                         {option.icon}
//                         {option.value}
//                       </span>
//                       {selected && (
//                         <span
//                           className={`${
//                             active ? 'text-white' : 'text-blue-600'
//                           } absolute inset-y-0 left-0 flex items-center pl-3`}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-5 h-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                             aria-hidden="true"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </div>
//         </>
//       )}
//     </Listbox>
//   );
// };
