import { useField } from "formik";
import { Listbox } from "@headlessui/react";

export default function ListboxField({
  type,
  label,
  options,
  defaultValue,
}: {
  type: string;
  label: string;
  options: string[];
  defaultValue: string;
}) {
  const [field, , helpers] = useField(type);

  return (
    <Listbox value={field.value} onChange={(value) => helpers.setValue(value)}>
      {({ open }) => (
        <div className="input cursor-pointer relative w-full">
          <Listbox.Button
            as="button"
            className="h-10 capitalize flex flex-col text-sm w-full justify-center"
          >
            {field.value || label}
          </Listbox.Button>
          {open && (
            <Listbox.Options
              defaultValue={defaultValue}
              as="ul"
              className="scrollbar-thumb-sky-200 scrollbar-thin absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white transition-all ease-in-out 
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
  );
}