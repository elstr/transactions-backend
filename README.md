# Backend set up
1) cd to the backend directory
2) execute `npm install`
3) execute `npm run start`
4) backend will be running in `http://localhost:3001`

### Backend routes
- GET http://localhost:3001
This endpoint will return the current balance of the acount

- GET http://localhost:3001/transactions
This endpoint will return historical transaction data 

- GET http://localhost:3001/transactions/:id
This endpoint will return specific data for the given transaction

- POST http://localhost:3001/transactions
Required body:
```js
{
	"amount": number / float,
	"type": credit / debit
}
```
<br />
Example given:
```js
{
	"amount": "500",
	"type": "debit"
}

{
	"amount": "300",
	"type": "credit"
}
```
<br />
Response format:
```js
{
    "statusCode": 201,
    "type": "success",
    "data": {
        "id": "yuMEtND1l",
        "type": "debit",
        "amount": 500,
        "effectiveDate": "2020-04-22 17:44:10"
    },
    "message": "Transaction stored"
}
```
