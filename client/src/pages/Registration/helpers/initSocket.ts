export const initSocket = () => {
  const socket = new WebSocket("wss://127.0.0.1:13579/");
  return socket;
};
