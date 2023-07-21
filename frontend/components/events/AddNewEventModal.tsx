"use client"
import { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Plus } from "iconoir-react";
import Modal from "../Modal";
import { ActionButton } from "../inputs";
import { Pet } from "../pets";
import PetCombobox from "../pets/PetCombobox";
import { Field, Formik, FormikHelpers, FormikValues, useField } from 'formik';
import { useUser } from "@clerk/nextjs";
import { Listbox } from "@headlessui/react";

interface InitialValues {
    "title": string;
    "description": string;
    "type": string;
    "startsAt": string;
    "endsAt": string | null;
    "attendees": Pet[] | null;
    "userId": string | undefined;
    "isPublic": boolean;
}

export default function AddNewEventModal({ preselectedPets }: { preselectedPets: string[] }) {

    //on load, get user location, if permission is granted
    const { user } = useUser();
    const [isOpen, setIsOpen ] = useState(false);

    const toggleModal = () => setIsOpen(prev => !prev);

    const initialValues: InitialValues = {
        "title": "",
        "description": "",
        "type": "",
        "startsAt": "",
        "endsAt": "",
        "attendees": [],
        "userId": user?.id,
        "isPublic": false
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <ActionButton onClick={toggleModal}>
                    <Plus />
                </ActionButton>
            </div>
            <Modal title="Add New Event" isOpen={isOpen} closeModal={toggleModal}>
                <div className="mt-2">
                    <Formik initialValues={initialValues} onSubmit={function (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
                        throw new Error("Function not implemented.");
                    }}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="title" className="flex flex-col">
                                    <span><span className="text-red-400 mr-2">*</span>Title</span>
                                    <Field className="input-text" name="title" type="text" />
                                </label>
                                <label htmlFor="eventType" className="flex flex-col">
                                    <span><span className="text-red-400 mr-2">*</span>Description</span>
                                </label>
                                <div className="w-full grid grid-cols-12 gap-8">
                                    <label className="col-span-6">
                                        <span><span className="text-red-400 mr-2">*</span>Starts At</span>
                                        <CustomDateTimeField fieldName="startsAt" />
                                    </label>
                                    <label className="col-span-6">
                                        Ends At
                                        <CustomDateTimeField fieldName="endsAt"/>
                                    </label>
                                </div>
                                {/* <label>
                                    Location
                                    <Map address="1148 Prospect Street, Ewing Township, NJ" />
                                </label> */}
                                <div className="grid grid-cols-12 gap-8">
                                    <label htmlFor="description" className="col-span-6 flex flex-col">
                                        Description / Details
                                        <Field as="textarea" name="description" rows={5}
                                            className=""
                                        />
                                    </label>
                                    <label htmlFor="attendees" className="col-span-6">
                                        Pets that are attending
                                        <PetCombobox defaultIds={preselectedPets && preselectedPets} />
                                    </label>
                                </div>
                                <button className="button">Add Event</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}


function EventTypeSelectField() {
  const [ field, , helpers ] = useField("type");

  const eventTypeOptions = ["vet", "playdate", "grooming", "other"];

  return (
    <Listbox value={field.value} onChange={() => helpers.setValue(field.value)}>
      <Listbox.Button>{field.value}</Listbox.Button>
      <Listbox.Options className="w-full">
        {eventTypeOptions.map((eventTypeOption) => (
              <Listbox.Option className="capitalize text-gray-900 dark:text-gray-100" value={eventTypeOption}>
                {eventTypeOption}
              </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

interface CustomDateTimeFieldProps {
  fieldName: string;
}

function CustomDateTimeField({ fieldName }: CustomDateTimeFieldProps) {
  const [field, , helpers] = useField(fieldName);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    const time = getTimeFromDateTime(field.value); // Extract time from existing datetime value
    const datetime = `${date}T${time}`;
    helpers.setValue(datetime);

    console.log(field.value)
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = getDateFromDateTime(field.value); // Extract date from existing datetime value
    const time = event.target.value;
    const datetime = `${date}T${time}`;
    helpers.setValue(datetime);
    console.log(field.value)
  };

  const getTimeFromDateTime = (datetime: string | null | undefined) => {
    if (datetime && datetime.includes('T')) {
      return datetime.split('T')[1];
    }
    return '';
  };

  const getDateFromDateTime = (datetime: string | null | undefined) => {
    if (datetime && datetime.includes('T')) {
      return datetime.split('T')[0];
    }
    return '';
  };

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
          <label htmlFor="date" className="">
            Date
          </label>
          <Field name="date">
            {() => (
              <input
                type="date"
                id="date"
                className="w-full input-text outline-none focus:border-[#6A64F1] focus:shadow-md"
                defaultValue={getDateFromDateTime(field.value)} // Extract date from datetime value
                onChange={handleDateChange} // Handle date change
              />
            )}
          </Field>
        </div>
      </div>
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
          <label htmlFor="time" className="">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="w-full input-text outline-none focus:border-[#6A64F1] focus:shadow-md"
            value={getTimeFromDateTime(field.value)} // Extract time from datetime value
            onChange={handleTimeChange} // Handle time change
          />
        </div>
      </div>
    </div>
  );
}


interface MapProps {
    address: string;
}

