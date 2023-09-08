import { PetAvatarField, SexRadioGroup } from "../inputs";
import ListboxField from "../ListboxField";
import * as Yup from 'yup';
import { Listbox } from '@headlessui/react';
import { Formik, Field, ErrorMessage, useField } from "formik";

interface PetFormProps {
  initialValues: any;
  onSubmit: any; 
  closeModal: any;
  imageUrl?: string;
  onSubmitButtonLabel: string;
}

  const animalTypes = [
    "cat", "dog", "raccoon", "turtle", "snake", "tiger", "alligator", "cow", "sheep", "spider", "hedgehog", "fox", "fish", "octopus", "horse", "rabbit", "other", "imaginary",
  ];
  
  const animalColors = [
    "Auburn","Beige","Black","Blue","Brown","Buff","Caramel",
    "Cream", "Gray", "Green", "Golden", "Lavender", "Orange", "Pink", "Purple", "Red", "Silver", "Tan", "Turquoise",
    "White", "Yellow", "Amber", "Apricot", "Ash", "Brindle", "Cameo", "Chartreux", "Chinchilla", "Chocolate", "Cinnamon", "Dilute",
    "Ebony","Fawn","Flame","Ginger","Havana","Lilac","Mahogany","Mink","Mitted","Patchwork","Pearl","Point","Russet","Sable","Sorrel","Tiger", "Other"
  ].sort();
  
  const breedsByAnimalType = {
    cat: ["Abyssinian", "American Bobtail", "American Curl", "American Shorthair", "Balinese", "Bengal", "Birman", "Bombay",
    "British Shorthair", "Burmese", "Chartreux", "Cornish Rex", "Devon Rex", "Egyptian Mau", "Exotic Shorthair", "Havana Brown", 
    "Himalayan", "Japanese Bobtail", "Maine Coon", "Manx", "Norwegian Forest Cat", "Ocicat", "Oriental Shorthair", "Persian", "Ragdoll", 
    "Russian Blue", "Scottish Fold", "Siamese", "Siberian", "Singapura", "Somali", "Sphynx", "Tonkinese", "Turkish Van"].sort(),
    dog: [  "Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Dachshund", "Siberian Husky", "Pug",
    "Chihuahua", "Boxer", "Shih Tzu", "Yorkshire Terrier", "Border Collie", "Dalmatian", "Doberman Pinscher", "Cavalier King Charles Spaniel", "Australian Shepherd", "Miniature Schnauzer", "Shetland Sheepdog", "Boston Terrier", "Pembroke Welsh Corgi", "Great Dane", "Bichon Frise", "Bernese Mountain Dog", "Basset Hound", "West Highland White Terrier", "Havanese", "Cocker Spaniel", "Saint Bernard", "Miniature Pinscher", "Rhodesian Ridgeback", "Shiba Inu", "Bull Terrier", "Cane Corso",].sort(),
    raccoon: ["Common Raccoon", "Ringtail", "Red Panda", /* Add more raccoon breeds here */],
    turtle: ["Green Sea Turtle", "Loggerhead Sea Turtle", "Hawksbill Sea Turtle", "Leatherback Sea Turtle", "Olive Ridley Sea Turtle", "Kemp's Ridley Sea Turtle", "Box Turtle", "Painted Turtle", "Red-eared Slider",
    "Spotted Turtle", "Russian Tortoise", "Sulcata Tortoise", "Aldabra Tortoise", "Galapagos Tortoise", "Indian Star Tortoise", "Greek Tortoise", "Eastern Box Turtle", "Western Pond Turtle", "Blanding's Turtle", 
    "Common Snapping Turtle", "Alligator Snapping Turtle"].sort(),
    snake: ["Ball Python", "Corn Snake", "Boa Constrictor", "Green Tree Python", "King Cobra", "Reticulated Python", "Black Mamba", "Anaconda", "Garter Snake", "Coral Snake", "Milk Snake", "Eastern Diamondback Rattlesnake", "Western Diamondback Rattlesnake", "Copperhead", "Cottonmouth", "Timber Rattlesnake", "Gaboon Viper", "Bush Viper", "Emerald Tree Boa", "Rosy Boa", "Gopher Snake", "California Kingsnake", "Black Rat Snake", 
    "Gray-banded Kingsnake", "Burmese Python", "African Rock Python", "Carpet Python"].sort(),
    tiger: ["Bengal", "Siberian", "Sumatran", "Sumatran", "Malayan", /* Add more tiger breeds here */],
    alligator: ["American Alligator", "Chinese Alligator", "Black Caiman", /* Add more alligator breeds here */],
    cow: ["Holstein Friesian", "Jersey", "Hereford", /* Add more cow breeds here */],
    sheep: ["Merino", "Suffolk", "Dorset", /* Add more sheep breeds here */],
    spider: ["Jumping Spider", "Tarantula", "Orb Weaver", /* Add more spider breeds here */],
    hedgehog: ["African Pygmy Hedgehog", "European Hedgehog", /* Add more hedgehog breeds here */],
    fox: ["Red Fox", "Arctic Fox", "Fennec Fox", /* Add more fox breeds here */],
    fish: ["Goldfish", "Betta", "Guppy", "Angelfish", /* Add more fish breeds here */],
    octopus: ["Common Octopus", "Blue-ringed Octopus", /* Add more octopus breeds here */],
    horse: ["Thoroughbred", "Quarter Horse", "Arabian Horse", /* Add more horse breeds here */],
    rabbit: ["Dutch Rabbit", "Lionhead Rabbit", "Mini Rex Rabbit", /* Add more rabbit breeds here */],
    other: [], // Empty array, you can add other animal types here
    imaginary: [], // Empty array, you can add imaginary animal types here
  };

  
export default function PetForm({ initialValues, onSubmit, closeModal, imageUrl, onSubmitButtonLabel } : PetFormProps) {

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      type: Yup.string().required('Type is required'),
      breed: Yup.string(),
      color: Yup.string(),
      sex: Yup.string().required('Sex is required'),
      avatar: Yup.string(),
      userId: Yup.string(),
    })

    return (
        <>
        <div className='mt-2'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {props => (    
              <form onSubmit={props.handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-12 col-end-4 mb-8 p-10 gap-8">
                  <div className="sm:col-span-5 w-full sm:w-auto flex flex-row sm:flex-col items-center justify-center">
                      <div className="w-30 md:w-44">
                          <PetAvatarField imageUrl={imageUrl} />
                      </div>
                  </div>
                  <div className="sm:col-span-7 flex flex-col md:items-center">
                      <div className="flex flex-col items-center [&>label]:w-full">
                          <label htmlFor="name">
                            <ErrorMessage name="name" className="text-xs text-red-500" />
                            <Field type="text" name="name" className="input-text" placeholder="Name" />
                          </label> 
                          <ListboxField type="type" options={animalTypes} label="Type" defaultValue="cat" />
                          <ListboxField type="breed" options={breedsByAnimalType[props.values.type]} label="Breed" />
                          <ListboxField type="color" options={animalColors} label="Color" />
                          <SexRadioGroup />  
                      </div> 
                  </div>
                </div>
                
                <div className="flex flex-row justify-end space-x-4">
                  <button
                    className="button bg-red-400 hover:bg-neutral-800"
                    onClick={closeModal}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="button hover:bg-neutral-800"
                  >
                    {onSubmitButtonLabel}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        </>
    )

}

export function AnimalTypeField() {

    const [field, , helpers] = useField('type');
  
    return (
      <div className=''>
        <Listbox value={field.value} onChange={(value) => helpers.setValue(value)}>
          {({ open }) => (
            <div className="cursor-pointer relative mt-1 border-b-2 border-neutral-400">
              <Listbox.Button className="flex flex-col mt-8 mb-2 text-sm w-full">{field.value || 'Select an animal type'}</Listbox.Button>
              {open && (
                <Listbox.Options className="scrollbar-thumb-sky-200 scrollbar-thin absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
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