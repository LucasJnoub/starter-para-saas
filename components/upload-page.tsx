'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from './upload-component/SingleDropZone';
import axios from 'axios';
import Image from 'next/image';
import Loading from './loading';
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";
import FadeLoader from "react-spinners/FadeLoader";
import RotateLoader from "react-spinners/RotateLoader";
import HashLoader	 from  "react-spinners/HashLoader";
import SyncLoader	 from  "react-spinners/SyncLoader";


export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>();
  const [output, setOutput] = useState<string>("");
  const [userPhotos, setUserPhotos] = useState([]);
  const [prompt, setPrompt] = useState<string>("");
  const { edgestore } = useEdgeStore();

  const handleOutput = async () => {
    try {
      setIsLoading(true)
      const request = await axios.post("/api/predictions", { prompt, imgUrl: url });
      const replicateUrl = request.data;
      setIsLoading(false)
      const createReplicateUrl = await axios.post("/api/updatereplicateurl", { replicateUrl });
    } catch (error) {
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
  // Função para baixar a imagem
  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'image.jpg'; // Defina o nome do arquivo aqui
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
      <Button variant={"premium"} onClick={isLoading ? handlerNull : handleOutput} className='w-[350px]'>
        Generate          
      </Button>
    
      {!isLoading && userPhotos && userPhotos.url && (
  <div className="">
    
      <Image alt="user photo" width={350} height={350} src={userPhotos.url} priority={true} />
  </div>
    )}
        
      
      
      {/* /* {!isLoading && userPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-center border border-solid-blue mt-4">
          {userPhotos.map((photo, index) => (
            <div key={index} className="p-4">
              <Image alt="user photo" width={87.5} height={50} src={photo.url} priority={true} />
            </div>
          ))}
        </div>
      )} */
      
      } 
      <Button
        variant="destructive"
        onClick={() => downloadImage(userPhotos?.url)}
        className="w-[200px]"
      >
        Download Image
      </Button>
    </div>
  );
}