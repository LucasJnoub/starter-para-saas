"use client"

// app/pages/index.tsx

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
// import {uploader} from 'uploader'
import {Uploader} from 'uploader'
import { UploadButton } from "react-uploader";
import { Button } from "./ui/button";
// import EdgeUploader, { SingleImageDropzoneUsage } from "./single-image-drop-zone-file/single-image-dropzone-page";
// import { SingleImageDropzone } from "./single-image-drop-zone-file/single-image-dropzone-file";


const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const uploader = Uploader({
  apiKey: "free" // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = { multi: true };


export default function Home() {
  let [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get("/api/predictions");
        setPredictions(response.data);
      } catch (error) {
        console.error("Failed to fetch predictions:", error);
      }
    };

    fetchPredictions();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("prompt", e.target.prompt.value);

    try {
      const response = await axios.post("/api/predictions", formData);
      let prediction = response.data;

      setPredictions([...predictions, prediction]);

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await axios.get("/api/predictions/" + prediction.id);
        prediction = response.data;
        setPredictions([...predictions, prediction]);
      }
    } catch (error) {
      console.error("Failed to create prediction:", error);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-5">
      <Head>
        <title>Replicate + Next.js</title>
      </Head>


      {/* <SingleImageDropzoneUsage ></SingleImageDropzoneUsage> */}
      {/* {predictions.map((prediction) => (
        <div key={prediction.id} className="image-wrapper mt-5">
          {prediction.output && (
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="output"
              height={200}
              width={200}
            />
          )}
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
        </div>
      ))} */}
    </div>
  );
}
