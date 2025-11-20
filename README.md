# TinyLink — URL Shortener

A simple URL shortener web app similar to bit.ly. Users can create short links, track clicks, and manage URLs.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  
- [Deployment](#deployment)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Pages & Routes](#pages--routes)  
- [License](#license)

---

## Features

- Create short URLs with optional custom codes  
- Redirect short URLs to target URLs (HTTP 302)  
- Track total clicks and last clicked time  
- Delete links  
- Dashboard with search/filter and table display  
- Stats page for individual link  
- Healthcheck endpoint  

---

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS  
- **Backend:** Node.js + Express, PostgreSQL  
- **Database Hosting:** Neon (Postgres)  
- **Deployment:** Vercel  

---

## Setup

### Backend

1. Clone repo:

```bash
git clone https://github.com/Kanimozhi-RAVI/tinylink-frontend
git clone https://github.com/Kanimozhi-RAVI/tinylink-backend
