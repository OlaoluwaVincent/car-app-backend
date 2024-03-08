## NESTJS PROJECT by OLAOLUWA VINCENT

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<!-- [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p> -->
  <!-- [![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor) -->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Project Overview

This project aims to facilitate seamless communication between renters and rentees for car services.

It allows users to easily put a car up for rent or rent a car with just a few clicks. This rental service provider aims to streamline the process and allow users to focus more on enjoying their ride, rather than worrying about how to obtain one. Additionally, it provides peace of mind to renters by ensuring that the rentee is well-verified and that their cars are in good hands.

### Authentication Workflow

1. Users are verified using LocalPassport and JWT. When users log in with their credentials, they are authenticated with LocalPassport.
2. Upon successful login, users' roles are set in the request (req.user) based on the roles assigned during account creation.
3. Subsequent queries are authenticated using JWT tokens in the request header. Upon successful validation, the AuthGuard checks for roles through Request.User and authorizes the user to access the requested resource.

---

### User Workflow

1. Users can update their details except for their email for security reasons.
2. Users can upload their profile picture, which is handled with Cloudinary.
3. Users can delete their account.
4. Other users can view one's profile with limited information.

## Next Steps

The following tasks will be addressed next as the project progresses:

### CAR Model

- Set up the model for CARS.
- Create routes for populating a car for the rentee.
- Allow rentees to rent a car.
- Enable renters to approve the rent and follow through with delivering the car to the rentee based on the time and place specified in the rental details.
- Rentees should accept the car upon delivery to start the countdown.
- Email notifications should be sent to both renters and rentees regarding this transaction.

#### General workfllow

- A user rents a car by specifying the place and location of delivery along with payment and damages fee (which would be refunded if no damages occur).
- The owner of the car receives an email notification about this request. The owner can then accept/decline (with reason) the request.
- If the request is declined, a refund is issued to the user with a notification email.
- If the request is approved, the car will be delivered on the specified date (with an email sent hours before the scheduled time).
- Upon delivery, the user must accept the car, which starts the countdown until the car is to be returned or picked up as specified in the request.
- In case of damages, the user will be charged accordingly.
- Should there be damages, user will be charged for it
