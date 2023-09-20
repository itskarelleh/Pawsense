import { useState } from "react";
import Modal from "../Modal";
import { PetStats, traits } from ".";
import { Formik, Field, FormikValues } from "formik";
import { EditPencil } from "iconoir-react";
import { ActionButton, ListboxField, MultiSelectListbox } from "../inputs";

interface EditPetStatsModalProps {
  title: string;
  stats: PetStats;
  handleSubmit: void | Promise<any>;
  petId: string | number;
}

interface PetStatsInitialValues {
  weight: number;
  size: string;
  birthDate: Date | string | null;
  adoptionDate: Date | string | null;
  petId: string | number;
}

export default function EditPetStatsModal({ title, stats, petId, handleSubmit }: EditPetStatsModalProps) {

  const { weight, size, birthDate, adoptionDate } = stats;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sizes: string[] = ["extra-small", "small", "average", "large", "extra-large"];

  const toggleEditing = () => setIsEditing(prev => !prev);

  const initialValues: PetStatsInitialValues = {
    weight: weight || 0.00,
    size: size || "",
    birthDate: birthDate || null,
    adoptionDate: adoptionDate || null,
    petId: petId
  };

  // Track the form's dirty state
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  const handleFormChange = (values: FormikValues) => {
    setIsFormDirty(true);
  };

  const handleCancel = () => {
    // Check if there are changed fields
    if (isFormDirty) {
      setIsOpen(true); // Open the child Modal
    } else {
      setIsEditing(false); // Close the parent Modal
    }
  };

  return (
    <>
      <ActionButton onClick={toggleEditing} title={`Edit details about ${name}`}>
        <EditPencil className="m-auto" />
      </ActionButton>
      <Modal title={title} isOpen={isEditing} closeModal={() => setIsEditing(false)}>
        <Formik initialValues={initialValues}
                onSubmit={handleSubmit}
                onChange={handleFormChange}>
          {props => (
            <form className="h-full w-full" onSubmit={props.handleSubmit}>
              <div>
                <label>Adopted at:
                  <Field
                    type="date"
                    id="adoptionDate"
                    name="adoptionDate"
                    className="w-full input outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </label>
                <label>Birthday:
                  <Field
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    className="w-full input outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </label>
                <label>Weight(lbs):
                  <Field type="number"
                         defaultValue={weight ? weight : 0.00}
                         min={0.00} step={0.01} max={199.99}
                         name="weight"
                         id="weight"
                         className="w-full input border focus:border-[#6A64F1] focus:shadow-md" />
                </label>
                <label>Size:
                  <ListboxField type="size" options={sizes} label="Size" />
                </label>
              </div>

              <div className="flex flex-row justify-end space-x-4">
                <button
                  className="button bg-red-400 hover:bg-neutral-800"
                  onClick={handleCancel}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="button hover:bg-neutral-800"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </Formik>
        <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="Cancel changes?">
          <div className="flex flex-row">
            <button className="">Yes</button>
            <button onClick={() => setIsOpen(false)} className="">No</button>
          </div>
        </Modal>
      </Modal>
    </>
  );
}
