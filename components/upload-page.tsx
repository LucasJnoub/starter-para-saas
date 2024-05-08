'use client';

import React, {useState, useEffect, CSSProperties } from 'react';
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from './upload-component/SingleDropZone';
import axios from 'axios';
import Image from 'next/image';
import SyncLoader	 from  "react-spinners/SyncLoader";
import { useProModal } from '@/hooks/user-pro-modal';
import { useAuth } from '@clerk/nextjs';



export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>();
  const [output, setOutput] = useState<string>("");
  const [userPhotos, setUserPhotos] = useState<string>();
  const [prompt, setPrompt] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const {userId} = useAuth();
  const[credits, setCredits] = useState(0)

  const proModal = useProModal();

  

  const handleOutput = async () => {
    try {
      setIsLoading(true)      
      const request = await axios.post("/api/predictions", { prompt, imgUrl: url });
      const replicateUrl = request.data.output[1];
      setCredits(request.data.credits);
      setIsLoading(false)
      const createReplicateUrl = await axios.post("/api/updatereplicateurl", { replicateUrl });
      setUserPhotos(replicateUrl); // Atualiza o estado com a nova URL da imagem
    } catch (error:any) {
        if(error?.response?.status === 403)
        {
          setIsLoading(false)
          proModal.onOpen();
        }
      console.log("Failed to create prediction " + error);
    }
  }


  const getAllPhotos = async () => {
    try {
      const response = await axios.get("/api/returnphotos");
      setUserPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }
  
  useEffect(() => {
    const updateCreditsOnClient = async () => {
      try {
        const  userCredit = await axios.get("/api/getcredits");
        setCredits(userCredit.data);

      } catch (error) {
        console.error("Error updating credits on the server:", error);
      }
    };
  
    updateCreditsOnClient();
  }, [credits]);
  

  useEffect(() => {
    getAllPhotos();
  }, [isLoading])

  useEffect(() => {
    const uploadFile = async () => {
      if (file) {
        const res = await edgestore.publicFiles.upload({ file });
        const photoUrl = res.url;
        setUrl(photoUrl);
        try {
          setIsLoading(true)
          const response = await axios.post("/api/updateuserlink", { photoUrl });
          setOutput(response.data);
          setIsLoading(false)
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      }
    }
    uploadFile();
  }, [file]);
  


  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };
  
  const downloadImage = (imageUrl:any) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'image.jpg'; 
        link.click();
      })
      .catch(error => console.error('Error downloading image:', error));
  };


  const checkImageExists = async (url:any) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.status === 200;
    } catch (error) {
      console.error('Error checking image:', error);
      return false;
    }
  };

  const handlerNull = () => {
    
  }
  return (
    <div className="flex flex-col items-center m-6 gap-4">
      <SingleImageDropzone width={350} height={200} value={file} onChange={(file: any) => { setFile(file); }} />

      <div className="">
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Here goes your prompt" className="border border-green-300 rounded-md p-2 min-w-[350px]  h-[50px] text-center" />
      
      </div>
      {<SyncLoader	
      color={"#ccc"}
      loading={isLoading}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="barloader"
      size={10}
      ></SyncLoader>}
      <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-red-500'>Credits: {credits}</span>
      <Button variant={"premium"} onClick={isLoading || !file ? handlerNull : handleOutput} className='w-[350px]'>
        Generate          
      </Button>
    
      {!isLoading && userPhotos && (
  <div className="">
    
      <img alt="user photo" width={350} height={350} src={userPhotos}/>
  </div>
    )}
        
    
      <Button
        variant="destructive"
        onClick={() => downloadImage(userPhotos)}
        className="w-[200px]"
      >
        Download Image
      </Button>
    </div>
  );
}