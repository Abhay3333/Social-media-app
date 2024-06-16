# Social Media App

This is a full-stack social media application built with React, Node.js, Socket.io, and Tailwind CSS. The app allows users to post content, like posts, and comment on posts in real-time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Real-time posting, liking, and commenting
- Responsive UI using Tailwind CSS
- WebSocket implementation for real-time updates
- RESTful API for backend operations

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - Socket.io-client

- **Backend:**
  - Node.js
  - Express
  - Socket.io

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/social-media-app.git
   cd social-media-app
   ```

2. **Install dependencies for the backend:**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   PORT=your_port
   MONGO_URL=your_mongodb_uri
   JWT_SECRET=your_secret_key
   
   ```

5. **Run the backend server:**

   ```bash
   cd backend
   npm start
   ```

6. **Run the frontend development server:**

   ```bash
   cd ../frontend
   npm start
   ```

## Usage

Once the application is running, you can open your browser and navigate to `http://localhost:3000`. From there, you can sign up, log in, create posts, like posts, and comment on posts. All updates will be reflected in real-time across all connected clients.

## Folder Structure

The project structure is as follows:

```
social-media-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
|   ├── db.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    |   ├── utils/
    │   ├── App.js
    │   ├── index.js
    │   ├── tailwind.css
    │   └── tailwind.config.js
    └── package.json
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and write appropriate tests.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
