<h1 align="center">Routes</h1>

## Table of Contents

- [POST /user](#post-user)
- [POST /login](#post-login)
- [GET /user](#get-user)
- [PUT /user](#put-user)
- [DELETE /user](#delete-user)
- [GET /products](#get-products)
- [GET /product](#get-product)
- [POST /cart](#post-cart)
- [GET /cart](#get-cart)
- [DELETE /cart](#delete-cart)

## Routes

### POST /user

Input:

```json
{
  "name": "[name]",
  "email": "[email]",
  "password": "[password]"
}
```

Output:

```json
{
  "message": "User created successfully",
  "id": "[UUID]",
}
```

### POST /login

Input:

```json
{
  "email": "[email]",
  "password": "[password]"
}
```

Output:

```json
{
  "message": "User logged in successfully",
  "token": "[JWT]",
}
```

### GET /user

Input:

GET /user?id=[UUID]

Output:

```json
{
  "id": "[UUID]",
  "name": "[name]",
  "createdAt": "[Date]",
}
```

### PUT /user

<span color="red">Requires authentication (bearer token)</span>

Input:

```json
{
  "name": "[optional_name]",
  "password": "[optional_password]"
}
```

Output:

```json
{
  "message": "User updated successfully",
}
```

### DELETE /user

<span color="red">Requires authentication (bearer token)</span>

Input:

```json
{
    "password": "[password]"
}
```

Output:

```json
{
  "message": "User deleted successfully",
}
```

### GET /products

Input:

GET /products

Output:

```json
[
    {
        "id": "[UUID]",
        "title": "[title]",
        "category": "[category]",
        "pictures": ["pictures"],
        "price": "[price]",
    }
]
```

### GET /product

Input:

GET /product?id=[UUID]

Output:

```json
{
    "id": "[UUID]",
    "title": "[title]",
    "description": "[description]",
    "category": "[category]",
    "tags": ["tags"],
    "features": ["features"],
    "pictures": ["pictures"],
    "price": "[price]",
}
```

### POST /cart

<span color="red">Requires authentication (bearer token)</span>

Input:

```json
{
    "id": "[UUID]",
    "quantity": [quantity]
}
```

Output:

```json
{
    "message": "Cart updated successfully",
}
```

### GET /cart

<span color="red">Requires authentication (bearer token)</span>

Input:

GET /cart

Output:

```json
[
    {
        "id": "[UUID]",
        "title": "[title]",
        "category": "[category]",
        "pictures": ["pictures"],
        "price": "[price]",
        "quantity": [quantity],
    }
]
```

### DELETE /cart

<span color="red">Requires authentication (bearer token)</span>

Input:

```json
{
    "id": "[UUID]",
    "quantity": [optional_quantity]
}
```

Output:

```json
{
    "message": "Cart updated successfully",
}
```
