import Probpreview from '@/components/Probpreview'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Allatone = () => {
  // const decider  = true
  const token = localStorage.getItem('token');
  let user = null

  const [problems, setProblems] = useState([]);


  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  if (token) {
    user = parseJwt(token);
  }

  const getAllIssues = async () => {
    if (user) {
      const response = await axios({
        url: `${import.meta.env.VITE_SERVER_URL}/api/approve`,
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      console.log(response.data);
      setProblems(response.data);
    } else {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/issues`);
      console.log(response.data);
      setProblems(response.data);
    }
  }

  useEffect(() => {
    getAllIssues();
  }
    , [])



  return (
    <>
      {
        problems.length ? (<div className='grid grid-cols-4 gap-5 mx-12 my-8'>
          {problems.map((problem) => (
            <Probpreview key={problem._id} problem={problem} user={user} />
          ))
          }
        </div>) : (<h1 className='text-4xl text-center mt-20'>No Issues to Show</h1>)
      }</>
  )
}

export default Allatone
