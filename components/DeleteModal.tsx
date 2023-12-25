'use client'

import { CopyIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/components/ui/button"
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
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase";
import { deleteDoc,doc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

function DeleteModal() {
    const {user} = useUser()
    const [setFilename, setFileId, setIsDeleteModalOpen, setIsRenameModalOpen,isDeleteModalOpen,fileId] =
    useAppStore((state) => [
      state.setFilename,
      state.setFileId,
      state.setIsDeleteModalOpen,
      state.setIsRenameModalOpen,
      state.isDeleteModalOpen,
      state.fileId
    ]);

    async function deleteFile(){
        if(!user || !fileId){
            return 
        }
        const toastId = toast.loading("Deleting...")
        const fileRef=  ref(storage, `users/${user.id}/files/${fileId}`)
        try {
            deleteObject(fileRef).then(async ()=>{
                deleteDoc(doc(db, "users",user.id, "files", fileId)).then(()=>{
                    console.log("deleted");
                    toast.success("Deleted Successfully!",{
                        id:toastId
                    })
                    
                })
            }).finally(()=>{
                setIsDeleteModalOpen(false)
            })
        } catch (error) {
            console.log(error); 
            setIsDeleteModalOpen(false) 
            toast.error("Error deleting document",{
                id:toastId
            })  
        }
        
    }
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={(isOpen)=>{
        setIsDeleteModalOpen(isOpen)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
           This action cannot be undone. This will permanently delete your file.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 py-3">
          
            <Button className="px-3 flex-1" size={"sm"} variant={"ghost"} onClick={()=>setIsDeleteModalOpen(false)}>
                <span className=" sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>
         
            <Button className="px-3 flex-1" size={"sm"} type="submit" variant={"destructive"} onClick={()=>deleteFile()}>
                <span className=" sr-only">Delete</span>
                <span>Delete</span>
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal