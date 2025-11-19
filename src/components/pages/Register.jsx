import axios from "axios";
import { useState } from "react";

function Register() {
   const [email, setEmail] = useState()
   const [name, setName] = useState()
   const [password, setPassword] = useState()

   const http = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/v1/',
      headers: {
         'Content-Type': 'application/json',
      }
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      http.post('/register', {
         name: name,
         email: email,
         password: password
      })
         .then(res => {
            console.log(res.data)
         })
         .catch(err => console.error(err))
   }
   return (
      <>
         <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
               <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
               <input type="text"
                  onChange={e => setName(e.target.value)}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
               <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
               <input type="email"
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
               <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
               <input type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
         </form>
      </>
   )
}

export default Register