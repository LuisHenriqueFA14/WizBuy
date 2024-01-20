package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/LuisHenriqueFA14/WizBuy/internal/services"
)

type UserController struct {}

func (c UserController) createUserController(w http.ResponseWriter, r *http.Request) {
    defer r.Body.Close()

    user := struct {
        Name string `json:"name"`
        Email string `json:"email"`
        Password string `json:"password"`
    }{}

    err := json.NewDecoder(r.Body).Decode(&user)

    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    if user.Name == "" || user.Email == "" || user.Password == "" {
		http.Error(w, "Missing fields", http.StatusBadRequest)
		return
	}

    response, err := services.CreateUserService(user.Name, user.Email, user.Password)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(response)
}

func (c UserController) Handle(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "POST":
        c.createUserController(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}
