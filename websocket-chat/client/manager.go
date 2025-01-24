package client

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Manager struct {
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan []byte
	mu         sync.Mutex
}

func NewManager() *Manager {
	return &Manager{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan []byte),
	}
}

func (m *Manager) Start() {
	for {
		select {
		case client := <-m.register:
			m.mu.Lock()
			m.clients[client] = true
			m.mu.Unlock()
			log.Println("Cliente registrado:", client.conn.RemoteAddr())
		case client := <-m.unregister:
			m.mu.Lock()
			if _, ok := m.clients[client]; ok {
				delete(m.clients, client)
				close(client.send)
			}
			m.mu.Unlock()
			log.Println("Cliente desconectado:", client.conn.RemoteAddr())
		case message := <-m.broadcast:
			m.mu.Lock()
			for client := range m.clients {
				client.send <- message
			}
			m.mu.Unlock()
		}
	}
}

func (m *Manager) RegisterClient(conn *websocket.Conn) {
	client := NewClient(conn, m)
	m.register <- client
	go client.Read()
	go client.Write()
}
