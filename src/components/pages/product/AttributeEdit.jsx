import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageUpload from '../../section/ImageUpload'
import { IoAddCircleSharp } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

function AttributeEdit() {
    const [name, setName] = useState()
    const [type, setType] = useState()
    const [media_id, setMediaId] = useState()
    const { id } = useParams()
    
    useEffect(() => {
        http.get(`/attributes/${id}/show`)
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setType(res.data.type)
                setMediaId(res.data.media_id)
                setValues(res.data.values)   // must match backend format
            })
            .catch(err => console.error(err))
    }, [id])
    
    // 🔥 MAIN FIX: dynamic values state
    const [values, setValues] = useState([
        { value: "", key: "", media_id: null }
    ]);
  
    // ➕ Add Row without submit
    const addRow = () => {
        setValues([...values, { value: "", key: "", media_id: null }]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const values = [
            {
                value: value,
                media_id: media_id
            }
        ];

        const formData = new FormData()
        formData.append('name', name)
        formData.append('type', type)

        values.forEach((item, index) => {
            formData.append(`values[${index}][value]`, item.value)
            formData.append(`values[${index}][media_id]`, item.media_id)
        })

        await http.put(`/attributes/${id}/update`, formData)
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
    return (
        <>


            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text"
                        onChange={e => setName(e.target.name)}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Description</label>

                    <select name="type" id="type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required
                        onChange={e => setType(e.target.value)}>
                        <option value="color">Color</option>
                        <option value="image">image</option>
                        <option value="text">text</option>
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

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </>
    )
}

export default AttributeEdit