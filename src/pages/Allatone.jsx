import Probpreview from '@/components/Probpreview'
import React from 'react'

const Allatone = () => {
  // const decider  = true
  const token = localStorage.getItem('token');
  let user = null
    

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
  if(token){
  user = parseJwt(token);
  }
 

  return (
    <div className='grid grid-cols-4 gap-5 mx-12 my-8'>
      <Probpreview imageUrl="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg" name="Sanjay" rollno="21BD1A0503" section="FS-ELITE" desc="
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, voluptatibus sit reprehenderit mollitia laudantium ad corrupti animi facilis vero, doloremque totam maiores optio sunt neque id? Porro dolore maiores perspiciatis aut excepturi hic voluptatum? Eos sapiente dolor blanditiis minima, ipsa ducimus. Vitae omnis et eius minima, perspiciatis quos doloremque aliquam!"  user={user}/>
    </div>
  )
}

export default Allatone
