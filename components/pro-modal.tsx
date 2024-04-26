"use client"
import React from 'react'
import axios from 'axios'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter} from './ui/dialog'
import { useProModal } from '@/hooks/user-pro-modal'
import { Badge } from './ui/badge';
import {  Check, CodeIcon, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
// const tools = [{
//   label:"Conversation",
//   icon: MessageSquare,
//   color:'text-violet-500',
//   bgColor:'bg-violet-500/10',
//   href:"/conversation",
// },{
//   label:"Music Generation",
//   icon: Music,
//   color:'text-emerald-500',
//   bgColor:'bg-emerald-500/10',
//   href:"/music",
// },{
//   label:"Image Generation",
//   icon: ImageIcon,
//   color:'text-pink-700',
//   bgColor:'bg-pink-700/10',
//   href:"/conversation",
// },{
//   label:"Video Generation",
//   icon: VideoIcon,
//   color:'text-orange-700',
//   bgColor:'bg-orange-700/10',
//   href:"/video",
// },{
//   label:"Code Generation",
//   icon: CodeIcon,
//   color:'text-green-700',
//   bgColor:'bg-green-700/10',
//   href:"/code",
// },];
const tools = [
  {
    label:"",
    icon: MessageSquare,
    color:'',
    bgColor:'',
    href:"/conversation",
  }, {
    label:"",
    icon: MessageSquare,
    color:'',
    bgColor:'',
    href:"/conversation",
  }, {
    label:"",
    icon: MessageSquare,
    color:'',
    bgColor:'',
    href:"/conversation",
  }, {
    label:"",
    icon: MessageSquare,
    color:'',
    bgColor:'',
    href:"/conversation",
  }, {
    label:"",
    icon: MessageSquare,
    color:'',
    bgColor:'',
    href:"/conversation",
  },
];

// const tools =[{}]
export default function ProModal() {
  const proModal = useProModal();
  const [loading, setLoading] = React.useState(false);
  const onSubscribe = async ()=>{
    try {
      setLoading(true);
      const response  = await axios.get("/api/stripe");
      window.location.href = response.data.url;

    }catch(error){
      console.log(error, "STRIPE_CLIENT_ERROR");
       
    }finally{
      setLoading(false);
    }
  }

  const handleCloseModal = () => {
    proModal.onClose();
  };
  
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className="flex items-center gap-x-2 py-1">
            Upgrade to Genius
            <Badge variant={'premium'} className='uppercase text-sm py-1'>Pro</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>  
        {tools.map((tool)=>(
          <Card
          onClick={handleCloseModal} // Adiciona o manipulador de eventos para fechar o modal ao clicar
          key={tool.label}
          className='p-3 border-black/5 flex items-center justify-between'
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn('w-6 h-6',tool.color)}/>
              </div>

              <div className="font-semibold text-sm">
                {tool.label}
              </div>
            </div>
              <Check className='text-primary w-5 h-5'/>
          </Card>
        ))}
        </DialogDescription>

        <DialogFooter>
          <Button 
           size={"lg"}
           variant={"premium"}
          className='w-full'
          onClick={onSubscribe}
           >
            
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white'/>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
