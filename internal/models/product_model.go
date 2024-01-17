package models

import (
    "gorm.io/gorm"
)

type Product struct {
    gorm.Model
    Id          string      `gorm:"primaryKey" json:"id"`
    Title       string      `json:"title"`
    Description string      `json:"description"`
    Category    string      `json:"category"`
    Features    []string    `gorm:"type:VARCHAR(255)" json:"features"`
    Pictures    []string    `gorm:"type:VARCHAR(255)" json:"picture"`
    Price       float64     `json:"price"`
}
