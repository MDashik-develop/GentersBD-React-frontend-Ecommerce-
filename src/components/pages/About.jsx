import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthUser from '../auth/AuthUser';

function About() {
   const [user, setUser] = useState({})
   const { token } = AuthUser()
   const http = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/v1/',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      }
   });
   useEffect(() => {
      // setUser(JSON.parse(sessionStorage.getItem('user') || '{}'))
      // console.log(user)

      http.get('/users')
         .then(res => {
            console.log(res.data)
            setUser(res.data)
         })
         .catch(err => console.error(err))
   },[])
   
  return (
     <>
        About Page
        {/* <br />
        me : {user.name}
        <br />
        id : {user.id} */}
     </>
  )
}

export default About