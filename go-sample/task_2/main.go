package main

import (
	"net/http"

	_ "github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", handler)
	http.ListenAndServe(":8080", r)
}

// func pingHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprint(w, "pong")
// }

// func handler(w http.ResponseWriter, r *http.Request) {
// 	// fmt.Fprint(w, "Hello")
// 	tmpl := template.Must(template.ParseFiles("index.html.tmpl"))
// 	if err := tmpl.Execute(w, "Gopher"); err != nil {
// 		// エラー処理
// 	}
// }

// func main() {
// 	http.HandleFunc("/ping", pingHandler)
// 	http.HandleFunc("/", handler)
// 	http.ListenAndServe(":8080", nil)
// }
