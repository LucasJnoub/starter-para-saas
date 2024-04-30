"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from './upload-component/SingleDropZone';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<{
    url: string;
  }>();

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
            const photoUrl = res.url;

            setUrls({
              url: photoUrl,
            });

            try {
              const response = await axios.post("/api/updateuserlink", { photoUrl });
              console.log(response.data); 
            } catch (error) {
              console.error("Error uploading photo:", error);
            }
          }
        }}>
          Upload
        </Button>
      </div>
    </div>
  );
}