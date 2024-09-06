
# Senswise Case Study

This project is a user management application built using **Next.js**, **Prisma**, **Docker**, and other technologies to handle user management features such as creating, editing, listing, and uploading users in bulk. This case study focuses on efficient API routing, database operations using Prisma, and frontend user management using React with server-side data handling.


## Introduction

This web application is designed as a case study to demonstrate the use of **Next.js** for server-side rendering (SSR) and API routing, **Prisma** for database management, and **Docker** for containerization. The project showcases user management functionality, including:

- User creation
- User listing with pagination
- User details view
- Bulk user upload via Excel


## Getting Started

### Docker

The application is fully Dockerized, making it easy to run in any environment. Docker Compose handles service orchestration.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

1. Set up the environment variables:

   Create a `.env.development` and `.env.production` files in the root of the project with using `.env.example` as a template.

2. Start the application using Docker:

   ```bash
   make up
   ```

   This command will:
   - Build the Docker containers
   - Set up the database using Prisma migrations
   - Seed the database with initial data

3. Visit the application:

   Open your browser and visit `http://localhost:3000`.
