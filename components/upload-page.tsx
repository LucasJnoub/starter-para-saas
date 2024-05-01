"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from './upload-component/SingleDropZone';
import axios from 'axios';
import Image from 'next/image';

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [predictionId, setPredictionId] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string>();
  const [output, setOutput] = useState<string>("");
  const [userPhotos, setUserPhotos] = useState([]);

  const handleOutput = async () => {
    try {
      const request = await axios.post("/api/predictions", { prompt: "a modern sofa in a contemporary living room, stylish decor", imgUrl: url });
      // const response = await axios.get("/api/predictions", { params: { predictionId } });
      console.log(request.data+" Funcionouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      // setOutput(request.data.output);
      const replicateUrl = request.data;
      console.log(replicateUrl+" Funcionou");
      
      const createReplicateUrl = await axios.post("/api/updatereplicateurl", {replicateUrl});
    } catch (error) {
      console.log("Failed to create prediction " + error);
    }
  }


  const getAllPhotos = async () => {
    try {
      const response = await axios.get("/api/returnphotos");
      console.log(response.data);
      setUserPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }
    
  
let photoUrl = "";

  return (
    <div>
      <div className="flex flex-col items-center m-6 gap-2">
        <SingleImageDropzone
          width={500}
          height={200}
          value={file}
          onChange={(file: any) => {
            setFile(file);
          }}
        />
        <Button variant={"outline"} onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({ file });
            photoUrl = res.url;

            setUrl(photoUrl); 

            try {
              const response = await axios.post("/api/updateuserlink", { photoUrl });
              console.log(response.data);
              setPredictionId(response.data.id);
              setOutput(response.data);
              setIsLoading(true)
            } catch (error) {
              console.error("Error uploading photo:", error);
            }
          }
        }}>  
          Upload
        </Button>


        {/* <Button variant={"outline"} onClick={handleOutput}>
  Processar Imagem
</Button> */}

        <Button variant={"outline"} onClick={getAllPhotos}>
  Processar Imagem
</Button>

{!isLoading && userPhotos.map((photo, index) => (
  <Image key={index} alt="user photo" width={500} height={200} src={photo.url} />
))}


        
      </div>
    </div>
  );
}