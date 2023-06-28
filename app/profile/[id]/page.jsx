"use client"

import {useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'



const UserProfile  = ({params}) => {

  const [posts,setPosts] = useState([])
  const searchParams = useSearchParams()
  const username = searchParams.get("username")

  useEffect(()=>{
    const getPosts = async () => {
      try{
        const response = await fetch(`/api/users/${params.id.toString()}/posts`)
        const data = await response.json()
        setPosts(data)
      }catch(error){
        console.log(error)
      }
    }
    getPosts()
  },[])


  return (
    <Profile
      name={username}
      desc={`Welcome to ${username} personal profile page`}
      data={posts}
    >

    </Profile>
  )
}

export default UserProfile  