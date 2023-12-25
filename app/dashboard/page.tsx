import { auth } from "@clerk/nextjs"
import Dropzone from "@/components/Dropzone"
import { collection, getDocs } from "firebase/firestore"
import {db} from "@/firebase"

async function Dashboard (){
  const {userId, user} = auth()
  const docsResult = await getDocs(collection(db,"users",userId!,"files" ))
  const skeleton
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
// The userId! indicates that you are certain that userId is not null or undefined at that point in the code.