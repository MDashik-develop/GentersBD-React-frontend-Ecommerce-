import { Button, Modal, ModalBody, ModalFooter, ModalHeader, TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";

function ImageUpload({ setMediaId , http }) {
   const [openModal, setOpenModal] = useState(false);
   const [mediaAll, setMediaAll] = useState([]);
   const [basUrl, setBasUrl] = useState('http://127.0.0.1:8000/storage/media/')
   const [selectId, setSelectId] = useState();
   const [mediaUpload, setMediaUpload] = useState();

   const getFile = () => {
      http.get(`media`).then(res => {
         console.log(res.data)
         setMediaAll(res.data)
      })
   };

   const mediaSubmit = async (e) => {
      e.preventDefault()
      const formDataMedia = new FormData()
      
      formDataMedia.append('path', mediaUpload)
      await http.post('/media', formDataMedia)
         .then(res => {
            console.log(res.data)
            getFile()
            setMediaUpload(null);
            e.target.reset();
         })
         .catch(err => console.error(err))
   }
   return (
      <>
         <div className=" rounded-lg p-4 min-h-full flex items-center justify-center bg-green-500 text-white"
            onClick={() => {
               setOpenModal(true);
               getFile()
            }}>
            <MdPermMedia />
         </div>



         {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
         <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <ModalHeader>Media Upload</ModalHeader>
            <ModalBody>
               <Tabs aria-label="Default tabs" variant="default">
                  <TabItem active title="All" icon={MdPermMedia} onClick={getFile}>
                     <div className="flex items-center gap-2 mb-2 h-auto flex-wrap">  
                     {mediaAll?.map(item =>(
                        <div key={item.id} onClick={() => setSelectId(item.id)} className={`flex items-center gap-2 h-28 min-w-28 relative ${selectId === item.id ? 'border-4 border-green-500' : ''}`} >
                           <img src={basUrl + 'small/' + item.path}
                              alt="John Michael"
                              className="inline-block h-full w-full  rounded object-cover" />
                           <p className="text-sm absolute bottom-0 left-0 z-10 font-bold text-green-400">{item.id}</p>
                        </div>
                     ))}
                     </div>
                  </TabItem>
                  <TabItem title="Add" icon={FaCloudUploadAlt} >
                     <div className="flex justify-center items-center flex-col gap-2">
                     <label htmlFor="path"
                           className="h-72 w-72 p-3 text-8xl bg-green-100 flex justify-center items-center">
                              <MdPermMedia className="text-green-200" />
                     </label>
                        <input
                           // accept="image/*",
                           type="file"
                           onChange={e => setMediaUpload(e.target.files[0])}
                           id="path"
                           className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                        <button type="submit"
                           onClick={mediaSubmit}
                           className="bg-green-500 text-white px-3 py-1 rounded w-72 flex justify-center items-center text-[18px] font-semibold">Add <RiFileAddFill /></button>
                     </div>   
                  </TabItem>
                  <TabItem disabled title="Disabled">
                     Disabled content
                  </TabItem>
               </Tabs>
            </ModalBody>
            <ModalFooter>
               <Button onClick={() => {
                  setMediaId(selectId);
                  setOpenModal(false);
               }}>Add</Button>
               <Button color="alternative" onClick={() => setOpenModal(false)}>
                  Decline
               </Button>
            </ModalFooter>
         </Modal>
      </>
   )
}

export default ImageUpload