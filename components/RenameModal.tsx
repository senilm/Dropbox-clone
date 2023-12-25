'use client'

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
import { Input } from "./ui/input";
import { updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import toast from "react-hot-toast";


function RenameModal() {
    const {user} = useUser()
    const [input, setInput] = useState("")
    const [setFilename, setFileId, setIsDeleteModalOpen, setIsRenameModalOpen,isDeleteModalOpen,fileId,isRenameModalOpen,filename] =
    useAppStore((state) => [
      state.setFilename,
      state.setFileId,
      state.setIsDeleteModalOpen,
      state.setIsRenameModalOpen,
      state.isDeleteModalOpen,
      state.fileId,
      state.isRenameModalOpen,
      state.filename
    ]);

    const renameFile =async () =>{
        if (!user || !fileId){
            return 
        }
        const toastId = toast.loading("Renaming...");

        await updateDoc(doc(db,"users", user.id, "files", fileId),{
            filename: input
        })
        toast.success("Renamed Successfully!",{
            id:toastId
        })
        setInput("")
        setIsRenameModalOpen(false)
    }
  return (
    <Dialog open={isRenameModalOpen} onOpenChange={(isOpen)=>{
        setIsRenameModalOpen(isOpen)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>
          <Input id="link" defaultValue={filename} onChange={(e)=>setInput(e.target.value)} onKeyDownCapture={(e)=>{
            if(e.key === 'Enter'){
                renameFile();
            }
          }}/>

        <div className="flex justify-end space-x-2 py-3">
          
            <Button className="px-3 " size={"sm"} variant={"ghost"} onClick={()=>setIsRenameModalOpen(false)}>
                <span className=" sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>
         
            <Button className="px-3" size={"sm"} type="submit"  onClick={()=>renameFile()}>
                <span className=" sr-only">Rename</span>
                <span>Rename</span>
            </Button>
        </div>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}

export default RenameModal