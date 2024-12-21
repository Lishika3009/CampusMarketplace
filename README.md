# Campus Marketplace

Campus Marketplace is a web application designed to help college students rent and sell items within their college campus. The platform enables users to list items for sale or rent, browse available items, and connect with other students for transactions.

## Features

### Core Functionalities:

- Item Listing: Users can list items they want to sell or rent out, providing details like item name, description, price, and availability.

- Browse and Search: Students can browse or search for items based on categories, keywords, or price range.

- Real-Time Chat: Enables buyers and sellers to communicate directly within the platform.

### Additional Features:

- Responsive Design: Fully responsive interface optimized for mobile and desktop.

- College-Specific Listings: Ensures that listings are only visible to members of the same college community.

- Secure Database: Utilizes MongoDB to securely store user data and item details.

## Tech Stack

Frontend:

- React.js: For building dynamic and responsive user interfaces.

- Bootstrap/CSS: For styling and layout.

Backend:

- Node.js: Server-side JavaScript runtime.

- Express.js: Framework for building the API.

Database:

- MongoDB: NoSQL database for storing user and item data.

Real-Time Communication:

- Socket.io: For enabling real-time chat functionality.

## Installation

### Prerequisites:
- **Node.js** and **npm** installed on your system.
- MongoDB server set up locally or via a cloud provider.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/campus-marketplace.git
   cd campus-marketplace

2. Install dependencies:
   ```bash
   npm install
    cd client

3. Set up environment variables:

- Create a .env file in the root directory and configure the following:
  ```env
  MONGO_URI=<Your MongoDB Connection String>

4. Start Application

   - Start the backend server
     ```bash
     npm start

   - Start the react frontend
     ```bash
     cd client
     npm start

5. Access the application in your browser at hhtps://localhost:3000


   
  
