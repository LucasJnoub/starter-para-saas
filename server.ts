// const { WebSocketServer } = require("ws");
// const Clerk = require('@clerk/nextjs');
// const { useAuth } = Clerk;
// const prisma = require('./lib/prisma');

// const wss = new WebSocketServer({ port: 8080 });

// function WebSocketHandler(ws: any) {
//   const { userId } = useAuth();

//   wss.on('connection', (ws: any) => {
//     console.log('Connected to server');
//     if (userId) {
//       const user = prisma.user.findFirst({
//         where: {
//           userId: userId
//         },
//         select: {
//           credits: true
//         }
//       });

//       // const { credits } = user || { credits: null }; 
//       // ws.send(JSON.stringify({ credits }));
//     }
//   });

//   console.log(`Listening on port 8080`);
// }


// module.exports = WebSocketHandler;