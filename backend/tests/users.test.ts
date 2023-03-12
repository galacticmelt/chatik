import app from '../app'
import request from 'supertest'

describe('create user', () => {
  it('POST /users', async () => {
    const { body } = await request(app)
    .post('/users')
    .send({
      username: 'aaa1',
      email: 'aaa1@mail.ru'
    })
    .expect(201)
    console.log(body)
  })
})

// describe('delete user', () => {
//   it('DELETE /users/:userId', async () => {
//     await request(app)
//     .del('/users/640567ded1592cbccc59bba6')
//     .expect(201)
//   })
// })