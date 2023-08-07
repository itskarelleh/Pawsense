import React from 'react';
import { FormikValues, useFormik } from 'formik';

export default function CustomRangeField() {
  const initialValues = {
    minprice: 1000,
    maxprice: 7000,
  };

  const onSubmit = (values : FormikValues) => {
    // Handle form submission here if needed
    console.log('Form submitted:', values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const { values, handleChange } = formik;

  const minThumb = ((values.minprice - 100) / (10000 - 100)) * 100;
  const maxThumb = 100 - ((values.maxprice - 100) / (10000 - 100)) * 100;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative max-w-xl w-full">
        <div>
          <input
            type="range"
            step="100"
            min="100"
            max="10000"
            onChange={handleChange}
            value={values.minprice}
            name="minprice"
            className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
          />

          <input
            type="range"
            step="100"
            min="100"
            max="10000"
            onChange={handleChange}
            value={values.maxprice}
            name="maxprice"
            className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
          />

          <div className="relative z-10 h-2">
            <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

            <div
              className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
              style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
            ></div>

            <div
              className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
              style={{ left: `${minThumb}%` }}
            ></div>

            <div
              className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
              style={{ right: `${maxThumb}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center py-5">
          <div>
            <input
              type="text"
              maxLength={5}
              onChange={handleChange}
              value={values.minprice}
              name="minprice"
              className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            />
          </div>
          <div>
            <input
              type="text"
              maxLength={5}
              onChange={handleChange}
              value={values.maxprice}
              name="maxprice"
              className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
