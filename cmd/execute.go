package cmd

import (
    "net/http"
    "os"

    "github.com/LuisHenriqueFA14/WizBuy/internal/database"
    "github.com/LuisHenriqueFA14/WizBuy/internal/controllers"

    "github.com/joho/godotenv"
)

func Execute() {
    err := godotenv.Load()
    if err != nil {
        panic(err)
    }

    database.Connect(os.Getenv("DBHOST"),os.Getenv("DBUSER"), os.Getenv("DBPASS"), os.Getenv("DBNAME"), os.Getenv("DBPORT"))

    userController := controllers.UserController{}

    http.HandleFunc("/user", userController.Handle)

    err = http.ListenAndServe(":" + os.Getenv("PORT"), nil)

    if err != nil {
        panic(err)
    }
}
