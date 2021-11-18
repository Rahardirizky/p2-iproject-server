# Laundry API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `POST /services`
- `GET /services`
- `POST /orders`
- `GET /orders`
- `POST /orders/total`

Routes below need authentication & authorization:

- `PUT /orders/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```
&nbsp;

## 3. POST /services

Description:
- Create types of service

Request:

- headers: 

```json
{
  "token": "string"
}
```

Request:

- body: 

```json
{
  "name": "string",
  "fee": "integer"
}
```

_Response (201 - Created)_

```json
[
  {
    "id": 1,
    "name": "Cuci",
    "fee": 5
  },
  {
    "id": 1,
    "name": "Setrika",
    "fee": 5
  },
  {
    "id": 1,
    "name": "Cuci & Setrika",
    "fee": 6
  },
]
```

&nbsp;

## 4. GET /services

Description:
- Create types of service

Request:

- headers: 

```json
{
  "token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Cuci",
    "fee": 5
  },
  {
    "id": 1,
    "name": "Setrika",
    "fee": 5
  },
  {
    "id": 1,
    "name": "Cuci & Setrika",
    "fee": 6
  },
]
```

&nbsp;

## 5. POST /orders

Description:
- Create order for every laundry works

Request:

- headers: 

```json
{
  "token": "string"
}
```

Request:

- body: 

```json
{
  "email": "string",
  "UserId": "integer",
  "ServiceId": "integer",
  "totalWeight": "integer",
  "totalFee": "integer",
  "payment": "string",
}
```

_Response (201- Created)_

```json
[
  {
    "id": 1,
    "UserId": 1,
    "ServiceId": 1,
    "totalWeight": 5,
    "totalFee": 25000,
    "payment": "Unpaid",
  },
  ...
]
```

&nbsp;

## 6. GET /orders

Description:
- GET order for every laundry works

Request:

- headers: 

```json
{
  "token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "UserId": 1,
    "ServiceId": 1,
    "totalWeight": 5,
    "totalFee": 25000,
    "payment": "Unpaid",
  },
  ...
]
```

&nbsp;

## 7. POST /orders/total

Description:
- Calculate total fee for each works

Request:

- headers: 

```json
{
  "token": "string"
}
```

Request:

- body: 

```json
{
  "ServiceId": "integer",
  "totalWeight": "integer",
}
```

_Response (200 - OK)_

```json
[
  {
    "totalFee": 50,
  },
  ...
]
```

&nbsp;

## 8. PUT /orders/:id

Description:
- Change status and payment of each work

Request:

- headers: 

```json
{
  "token": "string"
}
```

Request:

- body: 

```json
{
  "status": "string",
  "payment": "string"
}
```

Request:

- params: 

```json
{
  "id": "integer",
}
```

_Response (200 - OK)_

```json
[
  {
    "msg": "Succes Update",
  },
  ...
]
```

_Response (404 - Not Found)_

```json
[
  {
    "msg": "Succes Update",
  },
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
