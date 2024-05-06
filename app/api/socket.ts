import { Server } from 'Socket.IO'

export default function handler(req:any, res:any) {
    if (res.socket.server.io) {
        console.log('Socket is already running')
      } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
      }
      res.end()
}
