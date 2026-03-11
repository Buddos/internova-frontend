# Internova Frontend

A modern web application for managing internship opportunities, applications, and logbooks. Built with React, TypeScript, and Tailwind CSS.

## Project Description

Internova Frontend is a comprehensive platform that connects students, companies, and supervisors for internship management. The application provides:

- **Student Features**: Browse opportunities, submit applications, track application status, maintain logbooks
- **Company Features**: Post opportunities, review applications, manage candidates
- **Supervisor Features**: Monitor student progress, verify internship completion, access verification portals
- **Dashboard**: Centralized view of applications and opportunities
- **Profile Management**: User profiles with customizable settings
- **Calendar Integration**: Logbook calendar for tracking internship activities

## Technologies

This project is built with:

- **Vite** - Next generation frontend tooling
- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Performant forms
- **Zod** - TypeScript-first schema validation

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── layout/         # App layout components (Header, Sidebar)
│   ├── ui/             # shadcn/ui components
│   ├── NavLink.tsx     # Navigation link component
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── ApplicantPipeline.tsx   # Track applications
│   ├── Discovery.tsx           # Browse opportunities
│   ├── LogbookCalendar.tsx    # Internship logbook
│   ├── SupervisorDashboard.tsx # Supervisor view
│   ├── VerificationPortal.tsx  # Verification management
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   └── Setting.tsx
├── contexts/           # React Context API
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Root component with routing
```

## Key Features

### Authentication Context

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "company" | "supervisor";
  avatar?: string;
}


 

## Getting Started

### Prerequisites

- Node.js 16+ or bun
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd internova-frontend

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build for development
npm run build:dev
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is private and proprietary.
