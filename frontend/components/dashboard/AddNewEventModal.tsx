"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Plus } from "iconoir-react";
import Modal from "../Modal";
import { ActionButton } from "../inputs";
import { Pet } from "../pets/PetSummary";
import { Field, Formik, FormikHelpers, FormikValues } from 'formik';
import { useUser } from "@clerk/nextjs";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface InitialValues {
    "title": string;
    "description": string;
    "type": string;
    "startsAt": Date | null;
    "endsAt": Date | null;
    "attendees": Pet[] | null;
    "userId": string | undefined;
    "isPublic": boolean;
}

export default function AddNewEventModal() {

    //on load, get user location, if permission is granted

    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(true);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const toggleModal = () => setIsOpen(prev => !prev);

    const initialValues: InitialValues = {
        "title": "",
        "description": "",
        "type": "",
        "startsAt": null,
        "endsAt": null,
        "attendees": null,
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
                                <label htmlFor="title" className="flex flex-col mt-8 mb-2 text-sm">
                                    Title
                                    <Field className="border-l-0 border-r-0 border-t-0 border-b-2 border-neutral-400 focus:bg-cyan-100" name="title" type="text" />
                                </label>
                                <div className="flex flex-row justify-evenly w-full">
                                    <label>
                                        Starts At (Required)
                                        <DatePicker showTimeSelect selected={startDate} onChange={(date: any) => setStartDate(date)} />
                                    </label>
                                    <label>
                                        Ends At
                                        <DatePicker showTimeSelect selected={endDate} onChange={(date: any) => setEndDate(date)} />
                                    </label>
                                </div>
                                <label>
                                    Location
                                    {/** TODO: add autocomplete field and if valid, show a Map component */}
                                    {/* <Map address="1148 Prospect Street, Ewing Township, NJ" /> */}
                                </label>
                                <label htmlFor="description" className="flex flex-col mt-8 mb-2 text-sm">
                                    Description / Details
                                    <Field as="textarea" name="description" rows={5}
                                        className="border-2 border-neutral-400 focus:bg-cyan-100"
                                    />
                                </label>
                                <label htmlFor="attendees">
                                    {/* //TODO: implement an autocomplete for pets */}
                                </label>
                            </form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}

interface MapProps {
    address: string;
}

