import React from 'react'
import Card from '../components/Card'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
const Home = () => {
  const [book, setBook] = useState([])
  const fetchBook=async()=>{
    const response=await axios.get("https://ebook-kr5u.onrender.com")
    if(response.status===200){
      setBook(response.data.data)
    }
  }

  useEffect(()=>{
    fetchBook()
  },[])

  return (
    <>
    <Navbar/>
    <div className="flex flex-wrap justify-evenly mt-20">
   {
    book.length>0 && book.map((item,index)=>{
      return(
        <Card key={index} booksItems={item} />
      )
    })
   }
    </div>
    </>
  )
}

export default Home