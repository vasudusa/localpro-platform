# localpro-platform

![GitHub repo size](https://img.shields.io/github/repo-size/vasudusa/localpro-platform)
![GitHub last commit](https://img.shields.io/github/last-commit/vasudusa/localpro-platform)
![GitHub top language](https://img.shields.io/github/languages/top/vasudusa/localpro-platform)
![Static Badge](https://img.shields.io/badge/Stack-Node.js%20%2F%20React%20%2F%20PostgreSQL-blueviolet)

A local business platform for multi-tenant operations, vendor workflows, admin tools, and service management.

## Overview
This project provides the foundation for a local business operating system with tenant-aware routing, business portals, and role-based access patterns.

## Tech Stack
- Node.js
- React + Vite frontend
- Express API
- PostgreSQL
- JWT-based auth foundation

## Features
- Tenant-aware routing middleware
- Admin and vendor service endpoints
- Health monitoring route
- React frontend build for production deployment
- Database schema foundation for multi-tenant operations

## Run locally
```bash
cd D:\LocalPro\localpro-platform
npm install
npm run build
npm start
```

The app expects a PostgreSQL database connection. Set `DATABASE_URL` in `.env` or use the included default local value for local development.

## Project status
- Frontend build validated
- Backend API scaffold ready
- Multi-tenant and PostgreSQL foundation in place
- Next phase: database migration, real auth flow, and production deployment hardening