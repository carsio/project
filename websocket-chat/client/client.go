package client

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn     *websocket.Conn
	manager  *Manager
	send     chan []byte
	isClosed bool
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		conn:    conn,
		manager: manager,
		send:    make(chan []byte),
	}
}

func (c *Client) Read() {
	defer func() {
		c.manager.unregister <- c
		c.conn.Close()
	}()

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			log.Println("Erro ao ler mensagem:", err)
			break
		}
		c.manager.broadcast <- message
	}
}

func (c *Client) Write() {
	defer c.conn.Close()

	for message := range c.send {
		err := c.conn.WriteMessage(websocket.TextMessage, message)
		log.Println("Mensagem enviada:", string(message))
		if err != nil {
			log.Println("Erro ao enviar mensagem:", err)
			break
		}
	}
}
