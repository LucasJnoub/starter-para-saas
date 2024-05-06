import { WebSocketServer } from "ws";
import prisma from './lib/prisma'
import { auth } from "@clerk/nextjs";
const port = 8080;
const wss = new WebSocketServer({ port });
const {userId} =  auth()


wss.on('connection', (ws) => {
    console.log('Connected to server');
    if(userId) {
        const user =  prisma.user.findFirst({
            where: {
                userId: userId
            },
            select: {
                credits: true
            }
        });

        // const { credits } = user || { credits: null }; 
        // ws.send(JSON.stringify({ credits }));

    
}})
console.log(`Listening on port ${port}`);
