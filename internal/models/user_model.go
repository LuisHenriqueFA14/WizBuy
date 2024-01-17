package models

import (
    "time"

    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Id        string    `gorm:"primaryKey" json:"id"`
    Name      string    `json:"name"`
    Email     string    `gorm:"unique" json:"email"`
    Password  string    `json:"password"`
    Cart      []Product `gorm:"many2many:user_carts;" json:"cart"`
    CreatedAt time.Time `json:"createdAt"`
}
