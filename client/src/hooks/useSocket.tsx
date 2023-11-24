import { useEffect, useState } from "react";

export const useSocket = (): WebSocket | null => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("wss://127.0.0.1:13579/");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};
