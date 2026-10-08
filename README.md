# UzChess Frontend

Web client for **UzChess**, a chess education platform. Users can browse online courses, the chess book library and news, and see ratings, recent games and the game of the day on the home page.

Backend: [uzchess-backend-nestjs](https://github.com/xayrullayevamuslima34-blip/uzchess-backend-nestjs)

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **Home page:** game of the day, ratings, recent games, top courses and latest news
- **Courses:** course list and course detail pages
- **Library:** book catalog and book detail pages
- **News:** news feed and article pages
- Data is loaded from the UzChess REST API with Axios

## Tech stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Axios, React Icons

## Project structure

```
src/
  app/
    page.tsx            # home
    courses/            # list + [id] detail
    library/            # list + [id] detail
    news/               # list + [id] detail
  components/
    home/               # home page sections (DayGame, Rating, RecentGames, TopCourses, HomeNews)
    Nav.tsx, Footer.tsx, Courses.tsx, Library.tsx, News.tsx, ...
```

## Getting started

Requirements: Node.js 20+ and a running [UzChess backend](https://github.com/xayrullayevamuslima34-blip/uzchess-backend-nestjs).

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev
```

Open http://localhost:3000.
