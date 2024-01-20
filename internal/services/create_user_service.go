package services

import (
    "errors"

    db "github.com/LuisHenriqueFA14/WizBuy/internal/database"
    "github.com/LuisHenriqueFA14/WizBuy/internal/models"
    "github.com/LuisHenriqueFA14/WizBuy/internal/utils"

    "github.com/google/uuid"
    "golang.org/x/crypto/bcrypt"
)

func CreateUserService(name, email, password string) ([]byte, error) {
    // Email verification
    emailAlreadyInUse := db.DB.Where("email = ?", email).First(&models.User{})

    if emailAlreadyInUse.RowsAffected > 0 {
        return nil, errors.New("Email already in use")
    }

    if !utils.IsValidEmail(email) {
        return nil, errors.New("Invalid email")
    }

    // Password verification
    if !utils.IsValidPassword(password) {
        return nil, errors.New("Invalid password")
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

    if err != nil {
        return nil, errors.New("Error encrypting password")
    }

    user := models.User{
        Id: uuid.NewString(),
        Name: name,
        Email: email,
        Password: string(hashedPassword),
    }

    db.DB.Create(&user)

    return []byte(user.Id), nil
}
