# 🌟 Nft Marketplace Simulator 🌟

The Nft Marketplace Simulator is a simple MVP (Minimum Viable Product) for a card collection platform. Users can buy cards with predefined prices, and once they own the cards, other users can make offers for these cards. The card owner can then decide whether to accept or decline the offer.

## 🚀 Technologies

- Next.js
- TypeScript
- Express
- Prisma

## 📁 Project Structure

hooks
models
    ├── db models and test models
prisma
    ├── database
src
    ├── controllers
    │    ├── cardController.ts
    │    ├── userController.ts
    │    ├── offerController.ts
    ├── routes
    │    ├── all app routes
    ├── test
    │    ├── test folder for running jest containing also test controllers
swagger
    ├── swagger implementation files
test
    ├── all tests written in jest

## 💻 Getting Started

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install` or `yarn`.
3. Create a `.env` file in the root folder of the project and configure the required environment variables.
4. To run tests, change the `RUN_PROD_ENV` variable to `false` in the `.env` file.
5. Run the development server using `npm run dev` or `yarn dev`.
6. Open your browser and navigate to `http://localhost:3000` to access the application.

## 📝 API Documentation

The API documentation can be found in the `swagger` folder of the project. To view the documentation, open the `index.html` file in a browser.

## 🧪 Testing

The project uses Jest for testing. To run the tests, use the command `npm run test` or `yarn test`. Make sure to set the `RUN_PROD_ENV` variable to `false` in the `.env` file before running the tests.
