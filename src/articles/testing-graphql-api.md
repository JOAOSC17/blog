---
title: "Testing a GraphQL Application with Jest and SuperTest"
date: "2025-01-13"
tags: ["technology", "beginner"]
location: "Rio de Janeiro, Brazil"
---
In this blog post, we'll explore the challenges and solutions involved in testing a GraphQL API using Jest and SuperTest. The journey began with the need to simulate headers, specifically for token-based authentication, in Jest tests.

## The Challenge: Simulating Headers in Jest

While developing the [`Todo Backend GraphQL`](https://github.com/JOAOSC17/todo-backend-graphql) project for the Woovi challenge, I encountered a significant roadblock. I needed to test the GraphQL API's authentication, which relies on JSON Web Tokens (JWT) passed in the HTTP headers. Initially, I struggled to find a straightforward way to simulate these headers in Jest. The standard Jest setup wasn't enough because it didn't directly handle HTTP requests and responses in the same way a real server does.

## The Solution: Discovering SuperTest

After several trials and errors, I came across SuperTest, a library designed for HTTP assertions. SuperTest extends the functionality of Jest by allowing you to test HTTP servers as if they were real clients. This capability made it possible to simulate headers, including the authorization tokens required for my API's authentication.

## Setting Up the Test Environment

Before diving into the tests, let's set up the environment.

1. **Install Dependencies**
   First, ensure you have Jest, SuperTest, and Faker installed:
   ```bash
   npm install --save-dev jest supertest faker
   ```

2. **Configure Jest**
   Create a `jest.config.js` file:
   ```javascript
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
   };
   ```

3. **Write Test Cases**
   With the environment ready, we can now write test cases.

## Writing Tests with SuperTest

SuperTest became the game-changer in this scenario. Here's how I used it to test the API's CRUD operations and authentication.

### Testing CRUD Operations with SuperTest

1. **Setup and Teardown**
   Use Jest's `beforeAll` and `afterAll` hooks for setup and teardown:
   ```typescript
   import { connect, disconnectDatabase } from './mongooseConnection';
   import supertest from 'supertest';
   import app from './../index';

   beforeAll(async () => {
     await connect();
   });

   afterAll(async () => {
     await disconnectDatabase();
   });
   ```

2. **Test Authentication and Token Usage**
   Create a helper function to register a user and get the token:
   ```typescript
   import { faker } from '@faker-js/faker';
   import { graphql } from 'graphql';
   import { schema } from '../schema';

   async function authUserTest() {
     const userTest = {
       name: faker.name.firstName(),
       email: faker.internet.email(),
       password: faker.internet.password(),
     };
     const source = `
       mutation {
         register(name: "${userTest.name}", email: "${userTest.email}", password: "${userTest.password}") {
           token
           user {
             name
             email
           }
         }
       }
     `;
     const result = await graphql({ schema, source });
     const data = result.data?.register;
     return data.token;
   }
   ```

3. **Testing Tasks CRUD Operations**
   - **Create a New Task**
     ```typescript
     it('should create a new task', async () => {
       const todo = {
         task: faker.lorem.words(),
         status: faker.helpers.arrayElement(['pending', 'complete', 'in progress']),
       };
       const query = `
         mutation {
           todo(task: "${todo.task}", status: "${todo.status}") {
             task
             status
           }
         }
       `;
       const { body } = await supertest(app)
         .post('/graphql')
         .send({ query })
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${await authUserTest()}`);
       expect(body.data.todo).toMatchObject(todo);
     });
     ```

   - **Retrieve All Tasks**
     ```typescript
     it('should retrieve all tasks', async () => {
       const query = `
         query {
           todos {
             _id
             task
             status
           }
         }
       `;
       const { body } = await supertest(app)
         .post('/graphql')
         .send({ query })
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${await authUserTest()}`);
       expect(body.data.todos).toBeInstanceOf(Array);
     });
     ```

   - **Update a Task**
     ```typescript
     it('should update a task', async () => {
       const todos = await Todo.find();
       const randomTodo = todos[Math.floor(Math.random() * todos.length)];
       const updatedTask = faker.lorem.words();
       const updatedStatus = faker.helpers.arrayElement(['pending', 'complete', 'in progress']);
       const query = `
         mutation {
           updateTodo(_id: "${randomTodo._id}", task: "${updatedTask}", status: "${updatedStatus}") {
             task
             status
           }
         }
       `;
       const { body } = await supertest(app)
         .post('/graphql')
         .send({ query })
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${await authUserTest()}`);
       expect(body.data.updateTodo.task).toBe(updatedTask);
       expect(body.data.updateTodo.status).toBe(updatedStatus);
     });
     ```

   - **Delete a Task**
     ```typescript
     it('should delete a task', async () => {
       const todos = await Todo.find();
       const randomTodo = todos[Math.floor(Math.random() * todos.length)];
       const query = `
         mutation {
           deleteTodo(_id: "${randomTodo._id}") {
             _id
           }
         }
       `;
       const { body } = await supertest(app)
         .post('/graphql')
         .send({ query })
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${await authUserTest()}`);
       expect(body.data.deleteTodo._id).toBe(randomTodo._id);
     });
     ```

## Running the Tests

Run your tests using Jest:
```bash
npm test
```

This command will execute all test files, providing a detailed report of the results.

## Conclusion

The difficulty in simulating headers in Jest led to the discovery of SuperTest, which significantly simplified the process. By leveraging SuperTest alongside Jest, I was able to effectively test the GraphQL API's authentication and CRUD operations, ensuring the application's security and functionality. Sharing this learning process highlights the power of public learning and community-driven problem-solving.

