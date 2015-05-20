package main

import (
	"flag"
	"log"
	"net/http"
	"net/url"
	"path/filepath"

	"github.com/googollee/go-socket.io"
	"github.com/rcrowley/go-tigertonic"
)

var ContentDirectory = flag.String("content-directory", "", "content directory")

var socketServer *socketio.Server

func main() {
	flag.Parse()
	contentDirectory := *ContentDirectory
	if contentDirectory == "" {
		var err error
		contentDirectory, err = filepath.Abs("./webpack-sample/build")
		if err != nil {
			panic(err)
		}
	}

	log.Println(contentDirectory)

	globalMessage = MessageWithCount{Message: "hello", Count: 1}

	mux := tigertonic.NewTrieServeMux()
	mux.Handle("GET", "/web/data.json", tigertonic.Marshaled(get))
	mux.Handle("POST", "/web/incr", tigertonic.Marshaled(incr))
	mux.HandleNamespace("/web", http.FileServer(http.Dir(contentDirectory)))

	socketServer = SetupSocketIO(mux)

	server := tigertonic.NewServer(":8001", tigertonic.ApacheLogged(mux))
	server.ListenAndServe()
}

type MessageWithCount struct {
	Message string
	Count   int
}

var globalMessage MessageWithCount

func get(u *url.URL, h http.Header, _ interface{}) (int, http.Header, *MessageWithCount, error) {
	return http.StatusOK, nil, &globalMessage, nil
}

type Incr struct {
	Count int
}

type EmptyResponse struct {
}

func incr(u *url.URL, h http.Header, count *Incr) (int, http.Header, *EmptyResponse, error) {
	globalMessage = MessageWithCount{Message: globalMessage.Message, Count: globalMessage.Count + 1}
	socketServer.BroadcastTo("shared", "update", globalMessage)
	return http.StatusOK, nil, &EmptyResponse{}, nil
}

func SetupSocketIO(mux *tigertonic.TrieServeMux) *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	server.On("connection", func(so socketio.Socket) {
		log.Println("on connection")
		so.Join("shared")
		so.On("disconnection", func() {
			log.Println("on disconnect")
		})
	})
	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})

	mux.HandleFunc("GET", "/web/socket.io/", server.ServeHTTP)
	return server
}
