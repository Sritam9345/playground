# PlayGround - Real-time Collaborative Whiteboard

A real-time collaborative whiteboard and chat application built with modern web technologies, enabling multiple users to draw, message, and interact simultaneously.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: TypeScript-based WebSocket and HTTP servers
- **Database**: PostgreSQL with Prisma ORM
- **Build System**: Turborepo with remote caching
- **Language**: TypeScript throughout

## Project Structure

### Apps (`/apps`)

- `web`: Next.js frontend application
- `ws-backend`: WebSocket server for real-time features
- `http-backend`: HTTP API server

### Packages (`/packages`)

- `common`: Shared utilities and types
- `common-backend`: Shared backend code
- `db`: Prisma schema and database utilities
- `ui`: Shared React component library
- `eslint-config`: ESLint configurations
- `typescript-config`: TypeScript configurations

## Getting Started

1. Install dependencies:
```sh
pnpm install
```

2. Set up the database:
```sh
cd packages/db
pnpm prisma migrate dev
```

3. Start development servers:
```sh
pnpm dev
```

## Key Features

- Real-time collaborative whiteboard
- Live chat functionality
- Persistent storage of drawings and messages
- Multi-user synchronization
- Low-latency updates via WebSocket

## Development

This project uses Turborepo for optimal build performance:

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`

### Remote Caching

The project is configured with Turborepo's remote caching, reducing build times by up to 50%. To enable it:

1. Login to Vercel:
```sh
pnpm turbo login
```

2. Link to remote cache:
```sh
pnpm turbo link
```

## Architecture

- **Frontend**: Next.js app with real-time WebSocket connections
- **Backend**: Separate WebSocket and HTTP servers for scalability
- **Database**: PostgreSQL with Prisma for type-safe queries
- **Monorepo**: Turborepo for efficient build and dependency management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request