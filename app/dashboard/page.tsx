import { auth } from "@clerk/nextjs"
import Dropzone from "@/components/Dropzone"

const Dashboard = () => {
  const {userId} = auth()
  return (
    <>
    <div>Hello, {userId}</div>
    <div>
      <Dropzone/>
    </div>
    </>
  )
}

export default Dashboard

// import React from 'react'
// above line has to be removed in order to get going