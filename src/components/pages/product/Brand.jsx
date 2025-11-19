import axios from 'axios'
import { useEffect, useState } from 'react'
import ImageUpload from '../../section/ImageUpload'

function Brand() {
   const [name, setName] = useState()
   const [description, setDescription] = useState()
   const [website, setWebsite] = useState()
   const [media_id, setMediaId] = useState()
   const [datas, setDatas] = useState([])
   const [pagination, setPagination] = useState({
      currentPage: 1,
      lastPage: 1,
   })
   const [basUrl, setBasUrl] = useState('http://127.0.0.1:8000/storage/media/')

   const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('website', website)
      formData.append('media_id', media_id)
      console.log(formData)
      await http.post('/brands', formData)
         .then(res => {
            console.log(res.data)
         })
         .catch(err => console.error(err))
   }

   const http = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/v1/',
      headers: {
         // 'Content-Type': 'application/json',
      }
   })
   
   const getDatas = (page = 1) => {
      http.get(`/brands/?pagination=2&page=${page}`)
         .then(res => {
            setDatas(res.data.data)
            setPagination({
      currentPage: res.data.current_page,
      lastPage: res.data.last_page,
            })
            console.log(res.data)
         })
   }
   
   useEffect(() => (
      getDatas()
   ),[])
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
               <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Description</label>
               <input type="text"
                  onChange={e => setDescription(e.target.value)}
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
               <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Website</label>
               <input type="text"
                  onChange={e => setWebsite(e.target.value)}
                  id="website"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <ImageUpload setMediaId={setMediaId} />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
         </form>

         <div className="max-w-[720px] mx-auto">
            <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
               <a
                  target="_blank"
                  href="https://www.material-tailwind.com/docs/html/table"
                  className="block w-full px-4 py-2 text-center text-slate-700 transition-all"
               >
                  More components on <b>Material Tailwind</b>.
               </a>
            </div>

            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
               <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="text-lg font-semibold text-slate-800">Employees List</h3>
                        <p className="text-slate-500">Review each person before edit</p>
                     </div>

                     <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <button
                           className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                           type="button"
                        >
                           View All
                        </button>

                        <button
                           className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
                           type="button"
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              strokeWidth="2"
                              className="w-4 h-4"
                           >
                              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                           </svg>
                           Add member
                        </button>
                     </div>
                  </div>
               </div>

               <div className="p-0 overflow-scroll">
                  <table className="w-full mt-4 text-left table-auto min-w-max">
                     <thead>
                        <tr>
                           <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                 Member
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                 </svg>
                              </p>
                           </th>

                           <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                 Function
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                 </svg>
                              </p>
                           </th>

                           <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                 Status
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                 </svg>
                              </p>
                           </th>

                           <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                 Employed
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                 </svg>
                              </p>
                           </th>

                           <th className="p-4 border-y border-slate-200 bg-slate-50"></th>
                        </tr>
                     </thead>

                     <tbody>
                        {datas?.map(data => (
                        <tr key={data.id}>
                           <td className="p-4 border-b border-slate-200">
                              <div className="flex items-center gap-3">
                                 <img
                                    src={data.media ? basUrl + 'small/' + data.media.path : 'fallback.jpg'}
                                    alt="John Michael"
                                    className="inline-block h-9 w-9 rounded-full object-cover"
                                 />
                                 <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-slate-700">{data.name}</p>
                                    <p className="text-sm text-slate-500">{data.description}</p>
                                 </div>
                              </div>
                           </td>

                           <td className="p-4 border-b border-slate-200">
                              <div className="flex flex-col">
                                 <p className="text-sm font-semibold text-slate-700">Manager</p>
                                 <p className="text-sm text-slate-500">Organization</p>
                              </div>
                           </td>

                           <td className="p-4 border-b border-slate-200">
                              <div className="w-max">
                                 <div className="grid items-center px-2 py-1 text-xs font-bold text-green-900 uppercase rounded-md bg-green-500/20">
                                    <span>online</span>
                                 </div>
                              </div>
                           </td>

                           <td className="p-4 border-b border-slate-200">
                              <p className="text-sm text-slate-500">23/04/18</p>
                           </td>

                           <td className="p-4 border-b border-slate-200">
                              <button
                                 className="relative h-10 w-10 rounded-lg transition-all hover:bg-slate-900/10 active:bg-slate-900/20"
                                 type="button"
                              >
                                 <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                       <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                    </svg>
                                 </span>
                              </button>
                           </td>
                        </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="flex items-center justify-between p-3">
                  <p className="text-sm text-slate-500">Page {pagination.currentPage} of {pagination.lastPage}</p>

                  <div className="flex gap-1">
                     <button className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 hover:opacity-75"
                        disabled={pagination.currentPage === 1}
                        onClick={() => getDatas(pagination.currentPage - 1)}>
                        Previous
                     </button>

                     <button className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 hover:opacity-75"
                        disabled={pagination.lastPage === pagination.currentPage}
                        onClick={() => getDatas(pagination.currentPage + 1)}>
                        Next
                     </button>
                  </div>
               </div>
            </div>
         </div>

      </>
   )
}

export default Brand