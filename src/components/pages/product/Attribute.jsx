import axios from "axios";
import React, { useState } from "react";
import ImageUpload from "../../section/ImageUpload";
import { IoAddCircleSharp } from "react-icons/io5";

function Attribute() {
   const [name, setName] = useState("");
   const [type, setType] = useState("");

   // 🔥 MAIN FIX: dynamic values state
   const [values, setValues] = useState([
      { value: "", key: "", media_id: null }
   ]);

   // const token = localStorage.getItem("token");
   const token = sessionStorage.getItem("token")?.replace(/"/g, "").trim();


   const http = axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1/",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
   });
  
   // ➕ Add Row without submit
   const addRow = () => {
      setValues([...values, { value: "", key: "", media_id: null }]);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);

      values.forEach((item, index) => {
         formData.append(`values[${index}][value]`, item.value);
         formData.append(`values[${index}][key]`, item.key);
         formData.append(`values[${index}][media_id]`, item.media_id);
      });

      await http
         .post("/attributes/create", formData)
         .then((res) => console.log(res.data))
         .catch((err) => console.log(err));
   };

   return (
      <>
         <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
               <label className="block text-sm font-medium">Name</label>
               <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                  required
               />
            </div>

            <div className="mb-5">
               <label className="block mb-2 text-sm font-medium">Type</label>
               <select
                  onChange={(e) => setType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
               >
                  <option value="color">Color</option>
                  <option value="image">Image</option>
                  <option value="text">Text</option>
               </select>
            </div>

            {/* 🔥 Dynamic Rows */}
            {values.map((row, index) => (
               <div key={index} className="mb-5 flex gap-1 items-start">

                  <input
                     type="text"
                     value={row.value}
                     onChange={(e) => {
                        const updated = [...values];
                        updated[index].value = e.target.value;
                        setValues(updated);
                     }}
                     placeholder="Value"
                     className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                     required
                  />

                  <input
                     type="text"
                     value={row.key}
                     onChange={(e) => {
                        const updated = [...values];
                        updated[index].key = e.target.value;
                        setValues(updated);
                     }}
                     placeholder="Key"
                     className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                     required
                  />

                  {/* 🔥 Image Upload for each row */}
                  <ImageUpload
                     setMediaId={(id) => {
                        const updated = [...values];
                        updated[index].media_id = id;
                        setValues(updated);
                     }}
                     http={http}
                  />

                  {/* ➕ Add row button */}
                  <div
                     onClick={addRow}
                     className="rounded-lg p-3 bg-blue-500 text-white"
                  >
                     <IoAddCircleSharp size={24} />
                  </div>
               </div>
            ))}

            <button
               type="submit"
               className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
            >
               Submit
            </button>
         </form>
      </>
   );
}

export default Attribute;
