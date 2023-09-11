"use client"
import { useState } from "react";
import { Plus } from "iconoir-react";
import Modal from "../Modal";
import { ActionButton, ListboxField } from "../inputs";
import { Pet } from "../pets";
import { Field, Formik,  FormikValues, useField } from 'formik';
import { useUser } from "@clerk/nextjs";
import { Listbox } from "@headlessui/react";
import CustomToast from "../CustomToast";
import { toast } from "react-toastify";
import { addNewEvent } from "@/server_actions";

interface InitialValues {
    "title": string;
    "description": string;
    "type": string;
    "startsAt": string;
    "endsAt": string | null;
    "petId": string | null;
    "userId": string | undefined;
    "isPublic": boolean;
}

export default function AddNewEventForPetModal({ pet } : { pet: Pet}) {

    const { user } = useUser();
    const [isOpen, setIsOpen ] = useState(false);

    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (values : FormikValues) => {
      
      try {
        const res = await addNewEvent(values);

        console.log(res.json());
        toast.success(<CustomToast>
          New event added successfully!
          <a href="/event/${res.event-name}">View</a>
        </CustomToast>)
        closeModal();
      } catch (err) {
        toast.error("Failed to add new event");
      }

    }

    const initialValues: InitialValues = {
        title: "",
        description: "",
        type: "",
        startsAt: "",
        endsAt: "",
        petId: `${pet?.id}`,
        userId: user?.id,
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <ActionButton onClick={() => setIsOpen(true)}>
                    <Plus />
                </ActionButton>
            </div>
            <Modal title="Add New Event" isOpen={isOpen} closeModal={closeModal}>
                <div className="mt-2">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="title" className="flex flex-col">
                                    <span><span className="text-red-400 mr-2">*</span>Title</span>
                                    <Field className="input-text" name="title" type="text" />
                                </label>
                                <ListboxField type="type" label="Type" options={["Vet", "Grooming", "Playdate", "Other"]} />
                                <label className="flex flex-col">
                                    <span><span className="text-red-400 mr-2">*</span>Description</span>
                                    <Field as="textarea" name="description" rows={5}
                                            className=""
                                        />
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
      <Listbox.Button>{field.value ? field.value : "Type"}</Listbox.Button>
      <Listbox.Options className="w-full">
        {eventTypeOptions.map((eventTypeOption, index) => (
          <Listbox.Option key={index} className="capitalize text-gray-900 dark:text-gray-100" value={eventTypeOption}>
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

