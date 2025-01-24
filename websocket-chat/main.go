package main

import (
	"log"
	"net/http"
	"websocket-chat/client"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Permitir conexões de qualquer origem
	},
}

func main() {
	manager := client.NewManager()
	go manager.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Erro ao atualizar conexão:", err)
			return
		}
		manager.RegisterClient(conn)
	})

	log.Println("Servidor WebSocket rodando em :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
