package cmd

import (
    "net/http"
    "os"

    "github.com/joho/godotenv"
)

func Execute() {
    err := godotenv.Load()
    if err != nil {
        panic(err)
    }

    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    err = http.ListenAndServe(":" + os.Getenv("PORT"), nil)

    if err != nil {
        panic(err)
    }
}
