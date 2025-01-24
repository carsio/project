import { useEffect, useState, useRef } from "react";
import Message from "../models/message";

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]); // Armazena mensagens recebidas
  const [status, setStatus] = useState("Disconnected"); // Status da conexão
  const socketRef = useRef<WebSocket | null>(null); // Referência para o WebSocket

  useEffect(() => {
    if (socketRef.current) {
      return;
    }

    const socket = new WebSocket(url);
    socketRef.current = socket; // Salvar o socket na referência

    if (socket.readyState !== WebSocket.OPEN && socket.readyState !== WebSocket.CONNECTING) {
      socket.onopen = () => {
        console.log("WebSocket conectado");
        setStatus("Connected");
      };
      // Adicione aqui o código para iniciar a conexão do WebSocket
    }

    // Evento: Conexão aberta
    socket.onopen = () => {
      console.log("WebSocket conectado");
      setStatus("Connected");
    };

    // Evento: Mensagem recebida
    socket.onmessage = (event) => {
      console.log("Mensagem recebida:", event.data);
      const message = Message.fromString(event.data);
      setMessages((prev) => [...prev, message]);
    };

    // Evento: Conexão encerrada
    socket.onclose = () => {
      console.log("WebSocket desconectado");
      setStatus("Disconnected");
    };

    // Evento: Erro
    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      setStatus("Error");
    };

    // Fechar a conexão ao desmontar o componente
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url]);

  // Função para enviar mensagens
  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket não está conectado");
    }
  };

  return { messages, status, sendMessage };
};

export default useWebSocket;
