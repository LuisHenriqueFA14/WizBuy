package database

import (
    "fmt"

    "github.com/LuisHenriqueFA14/WizBuy/internal/models"

    "gorm.io/gorm"
    "gorm.io/driver/postgres"
)

var DB *gorm.DB

func Connect(host, user, password, dbname, port string) {
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Sao_Paulo", host, user, password, dbname, port)

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    db.AutoMigrate(&models.User{}, &models.Product{})

    DB = db
}
