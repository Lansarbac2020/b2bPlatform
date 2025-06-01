# b2bPlatform 

A **Task Management Website** built as part of a Node.js and TypeScript learning journey.

## Overview

b2bPlatform is a web application designed to help users manage tasks efficiently. This project serves as a practical implementation of Node.js and TypeScript concepts, offering hands-on experience with modern JavaScript development and backend technologies.

## Features

- User authentication and authorization
- Create, update, delete, and view tasks
- Assign tasks to users
- Task status tracking (e.g., To Do, In Progress, Done)
- RESTful API endpoints

## Technologies Used

- **Backend:** Node.js, TypeScript, Express.js
- **Database:** MongoDB 
- **Authentication:** ( JWT, Passport.js, session)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/Lansarbac2020/b2bPlatform.git
cd b2bPlatform
npm install
```

### Running the Project

```bash
# For development
npm run dev

# For production build
npm run build
npm start
```

### Environment Variables

Create a `.env` file in the root directory and set up the following variables as needed:

```
PORT=
NODE_ENV=

MONGO_URI=
JWT_SECRET=

JWT_EXPIRES_IN=1d

SESSION_SECRET=
SESSION_EXPIRES_IN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
FRONTEND_ORIGIN=
FRONTEND_GOOGLE_CALLBACK_URL=
```

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Acknowledgments

This project is part of my Node.js and TypeScript learning journey. Thanks to all open-source contributors and the broader developer community for inspiration and guidance.
