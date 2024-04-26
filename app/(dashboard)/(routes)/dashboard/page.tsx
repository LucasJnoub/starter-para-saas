"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, CodeIcon, Image, ImageIcon, LayoutDashboardIcon, MessageSquare, Music, VideoIcon, icons } from "lucide-react";
import { useRouter } from "next/navigation";

//  const tools = [{
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

// },];
const tools = [
  {
  label:"",
  icon: LayoutDashboardIcon,
  color:'',
  bgColor:'',
  href:"/conversation",
},
  {
  label:"",
  icon: LayoutDashboardIcon,
  color:'',
  bgColor:'',
  href:"/conversation",
},
  {
  label:"",
  icon: LayoutDashboardIcon,
  color:'',
  bgColor:'',
  href:"/conversation",
},
  {
  label:"",
  icon: LayoutDashboardIcon,
  color:'',
  bgColor:'',
  href:"/conversation",
},
  {
  label:"",
  icon: LayoutDashboardIcon,
  color:'',
  bgColor:'',
  href:"/conversation",
},
];


export default function DashboardPage(){
  const router = useRouter();
  return <>
  <div className="">
    <div className="mb-8 space-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
          Seu título
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center mt-2">
          Subtitulo
      </p>
    </div>

    <div className="px-4 md:px-20 lg:px-32 space-y-4 cursor-pointer">
      {tools.map((tool)=>(
        <Card 
        onClick={()=>{router.push(tool.href)} }
        key={tool.href}
        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor:pointer"
        >

        <div className="flex items-center gap-x-4">
          <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
            <tool.icon className={cn("w-8 h-8", tool.color)}/>
          </div>

          <div className="font-semi-bold">
            {tool.label}
          </div>
        </div>
          <ArrowRight className="w-5 h-5"></ArrowRight>
        </Card>
      ))}
    </div>
  </div>
  </>;
}
