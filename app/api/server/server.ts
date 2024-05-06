import {  WebSocketServer } from 'ws';
import prisma from '../../../lib/prisma';

const port = 8080;
const wss = new WebSocketServer({ port });

wss.on('connection', (ws:any) => {
  console.log('Conectado ao servidor');

  ws.on('message', async (message:any) => {
    const userId = message.toString();

    if (!userId) {
      console.error('UserId não está definido.');
      return;
    }

    const user = await prisma.user.findUnique({
      where: { userId: userId },
      select: { credits: true },
    });

    if (!user) {
      console.error(`Usuário ${userId} não encontrado.`);
      ws.send(JSON.stringify({ credits: 0 }));
      return;
    }

    ws.send(JSON.stringify({ credits: user.credits }));
  });
}); 

console.log(`Ouvindo na porta ${port}`);