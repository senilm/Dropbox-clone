"use client"
import { cn } from '@/lib/utils'
import { useState } from 'react'
import DropzoneComponent from 'react-dropzone'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import {db, storage} from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const Dropzone = () => {
    const [loading, setLoading] = useState(false) //loading for the image once we drop it
    const {isLoaded, isSignedIn, user} = useUser()
    const maxSize = 20971520 //20mb

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file)=>{
            const reader = new FileReader()
            reader.onabort = () =>console.log('File reading was aborted');
            reader.onerror = () =>console.log('File reading was failed');
            reader.onload = async () =>{
                await uploadPost(file)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    const uploadPost = async (selectedFile:File) =>{
        if(loading) return;
        if (!user){
            return 
        }
        setLoading(true)
        // add document  -> users/user123/files
        const docRef = await addDoc(collection(db,"users", user.id, "files" ),{
            userId:user.id,
            filename: selectedFile.name,
            fullname:user.fullName,
            profileImg: user.imageUrl,
            timestamp:serverTimestamp(),
            type:selectedFile.type,
            size: selectedFile.size
        })
        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
        uploadBytes(imageRef, selectedFile).then(async (snapshot)=>{
          const downloadURL = await getDownloadURL(imageRef)
          await updateDoc(doc(db, "users", user.id, "files", docRef.id),{
            downloadURL:downloadURL
          })
        })
        setLoading(false)
    }

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
  {({getRootProps, getInputProps,isDragActive,isDragReject,fileRejections}) => {

    const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize
    return (<section className='m-4'>
      <div {...getRootProps()}
      className={cn('w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',isDragActive ? "bg-[#035FFE] text-white animate-pulse" : " bg-slate-100/50 dark:bg-slate-800/80 text-slate-400")}
      >
        <input {...getInputProps()} />
        {!isDragActive && "Click here to drop a file to upload"}
        {isDragActive && !isDragReject && "Drop here to upload the file"}
        {isDragReject && "Sorry, can't accept the file type"}
        {isFileTooLarge && <div className=' text-danger mt-2'>File is too large</div>}
      </div>
    </section>)
}}
</DropzoneComponent>
  )
}

export default Dropzone

// drop on the dropzone -> read file -> firestore db ma pela entry padvani e particular user ni -> firestore storage ma upload karvani file  -> file upload karya pachi eni je download url male -> ene je entry padi apde firestore db ma ema update karai devanu