"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import Link from 'next/link';
import { SingleImageDropzone } from './upload-component/SingleDropZone';

export default  function UploadPage() {
    const [file, setFile] = useState<File>();
    const {edgestore} = useEdgeStore();
    const [urls, setUrls] = useState<{
        url:string;
        // thumbnailUrl: string | null
    }>();
   return (
    <div>
        <div className="flex flex-col items-center m-6 gap-2">
        <SingleImageDropzone
        width={500}
        height={200}
        value={file}
        onChange={(file:any) => {
          setFile(file);
        }}
      />
            <Button variant={"outline"} onClick={async ()=>{
                if(file) {
                    const res = await  edgestore.publicFiles.upload({file});

                    setUrls({
                        url:res.url,
                        // thumbnailUrl:res.thumbnailUrl
                    })
            }}}>Upload</Button>

            {/* {urls?.url && <Link href={urls.url} target='_blank'>URL</Link>} */}
        </div>
    </div>
  )
}
