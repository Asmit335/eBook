import React from 'react'
import Card from '../components/Card'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
const Home = () => {
  const [book, setBook] = useState([])
  const fetchBook=async()=>{
    const response=await axios.get("http://localhost:3000")
    if(response.status===200){
      setBook(response.data.data)
    }
  }

  useEffect(()=>{
    fetchBook()
  },[])

  return (
    <>
    <div className="flex flex-wrap justify-evenly mt-20">
   {
    book.length>0 && book.map((index)=>{
      return(
        <Card />
      )
    })
   }
    </div>
    </>
  )
}

export default Home