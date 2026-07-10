/**
 * Transport boundary for future Socket.IO or WebSocket integration.
 * Replace these no-op methods with a real client without changing ChatPage UI code.
 */
const chatSocket = {
  connect: () => undefined,
  disconnect: () => undefined,
  subscribeToChannel: () => () => undefined,
  sendMessage: () => undefined,
  sendTyping: () => undefined,
};

export default chatSocket;
