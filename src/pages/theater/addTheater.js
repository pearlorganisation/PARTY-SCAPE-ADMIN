// import React from 'react';
// import { useState } from 'react';

// const addTheater = () => {
//   const [formData, setFormData] = useState(initialValues);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // onSubmit(formData);
//   };

//   return (
//     <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Edit Form</h2>
//       <div className="mb-4">
//         <label
//           className="block text-gray-700 text-sm font-bold mb-2"
//           htmlFor="name"
//         >
//           Name
//         </label>
//         <input
//           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="name"
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-4">
//         <label
//           className="block text-gray-700 text-sm font-bold mb-2"
//           htmlFor="email"
//         >
//           Email
//         </label>
//         <input
//           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </div>
//       {/* Add more fields as needed */}
//       <div className="flex items-center justify-end">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//           onClick={handleSubmit}
//         >
//           Save Changes
//         </button>
//         let data
//       </div>
//     </form>
//   );
// };

// export default addTheater;
