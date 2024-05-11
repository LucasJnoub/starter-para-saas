import { createContext, useMemo, useContext } from "react";
import { parseCookies } from 'nookies';

const WsContext = createContext({} as any);

export const isBrowser = typeof window !== "undefined";

export const WebSocketProvider = ({ children }: any) => {
  const wsInstance = useMemo(() => {
    const cookies = parseCookies();

    if (isBrowser) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/socket`);
      ws.onopen = () =>{
        ws.send(JSON.stringify({
            action:"auth",
            token:`Bearer ${cookies["teste"]}`
        }))

        return ws
      }
    }
  },[]);

return <WsContext.Provider value={wsInstance}>{children}</WsContext.Provider>;
};

export const useWs = ()=>{
  return useContext(WsContext)
}