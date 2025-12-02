import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleBook = () => {
  const {id}=useParams()
  const [books, setBooks] = useState({})
  const fetchItem=async()=>{
    const response=await axios.get(`http://localhost:3000/book/${id}`)
    if(response.status===200){
      setBooks(response.data.data)
    }
  }

  useEffect(()=>{
    fetchItem()
  },[])

  return (
    <>
       <img className="" src="https://pngimg.com/d/book_PNG51090.png" alt="Sunset in the mountains" width={250} height={250}/>
      <div className="text-3xl font-bold">{books.bookName}</div>
      <div className="text-xl">Rs.{books.bookPrice}</div>
    </>
  )
}

export default SingleBook