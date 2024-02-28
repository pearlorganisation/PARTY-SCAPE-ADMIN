import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const UpdateUser = ({ onSubmit, onCancel, defaultValues }) => {
  const { handleSubmit, control, register, setValue } = useForm({
    defaultValues,
  });

  const handleCancel = () => {
    onCancel();
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: /^\S+@\S+$/i,
          })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="position"
          className="block text-sm font-medium text-gray-700"
        >
          Position
        </label>
        <input
          type="text"
          id="position"
          {...register('position', { required: 'Position is required' })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-gray-700"
        >
          Salary
        </label>
        <input
          type="text"
          id="salary"
          {...register('salary', { required: 'Salary is required' })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="text-gray-600 px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
