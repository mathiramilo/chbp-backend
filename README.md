# CHBP API

Footwear e-commerce Rest API developed with Node JS, Express and MongoDB for the final project of the Coderhouse backend development course.

You can see the frontend [here](https://github.com/mathiramilo/CHBP-Frontend).

## Architecture

A well-defined layered architecture was implemented.

###

![chbp-architecture](https://user-images.githubusercontent.com/42822912/223836563-c417a430-0a3a-4158-aed4-21122a3c8f7b.png)

###

`1. Presentation Layer (Frontend)`

For the presentation layer, a web application was developed with React. You can see it [here](https://github.com/mathiramilo/CHBP-Frontend).

`2. Router Layer (API)`

The router layer contains the app programming interface (API) routes of the app. Its only job is to receive requests and return a response from the server.

`3. Service Layer (Business Logic)`

The Service layer, also called the domain layer, is where the application's business logic operates. Business logic is a collection of rules that tell the system how to run an application, based on the organization's guidelines. This layer essentially determines the behavior of the entire application. After one action finishes, it tells the application what to do next.

`4. Data Access Layer (Database)`

The data access layer, acts as a protective layer. It contains the code that's necessary to access the database layer. This layer also holds the set of codes that allow you to manipulate various aspects of the database, such as connection details and SQL statements.

`5. Database Layer`

For the database layer, the Mongo DB non-relational database is used with its Mongo Atlas cloud service.

## Endpoints

- **`Authentication`** (Register and login endpoints are exposed for users authentication)
- **`Products`** (Products CRUD endpoints)
- **`Carts`** (Cart management endpoints)
- **`Orders`** (Orders endpoints)

## Technical Information

Rest API developed with Node JS and Express.

### Authentication

Authentication is implemented with JWT (Json Web Token).

### Database Connection

To create the connection between MongoDB and Node JS is used Mongoose ODM.

### Email, SMS and whatsapp

To send emails, sms and whatsapp messages are used Nodemailer and Twilio.

## Personal Data

- Visit my [**Github**](https://github.com/mathiramilo) profile to see more amazing projects.
- If you are interested, contact me on [**Linkedin**](https://www.linkedin.com/in/mathias-ramilo).
