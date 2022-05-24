const request = require('supertest')
const app = require('../../../app')

test('Should Sign-up for a User', async () =>{
    await request(app).post('/ecommerce/v1/auth/register')
    .send({
        "name": "Hoang Ha",
        "email": "ha@gmail.com",
        "password": "1234567"
    })
    .expect(200)
} )