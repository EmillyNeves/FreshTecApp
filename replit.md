# FreshTec Mobile Application - Passaporte do Frescor

## Overview

FreshTec is a comprehensive mobile application implementing the complete "Passaporte do Frescor" ecosystem, connecting the entire food supply chain from farm to table through digital innovation. The app serves all stakeholders (Produtor, Transportador, Varejista, Consumidor) with role-specific interfaces and functionalities. The system creates a complete information accumulation cycle through two key technologies:

### Selo de Frescor Digital (Digital Freshness Seal)
Smart QR code labels that accumulate information at each stage of the supply chain, providing complete traceability and freshness data from production to consumption.

### Pote Inteligente (Smart Container)  
IoT-enabled storage containers that monitor and optimize food preservation conditions at the consumer level, completing the information cycle and providing real-time freshness data.

## Recent Changes (January 06, 2025)
- ✅ Implemented complete Passaporte do Frescor system with expanded data types
- ✅ Created comprehensive QR scanner with multi-tab interface (Overview, Journey, Sustainability, Blockchain)
- ✅ Developed Smart Container management page with real-time monitoring
- ✅ Added blockchain verification system with hash-based security
- ✅ Integrated sustainability metrics and compliance tracking
- ✅ Connected all components in unified information accumulation cycle
- ✅ Optimized container spacing and reduced padding/margins for better mobile experience
- ✅ Simplified user interfaces by removing unnecessary functionalities for each user type
- ✅ Created compact layouts with smaller cards and efficient space usage
- ✅ Configured local development setup with simple `npm start` command
- ✅ **NEW**: Complete deployment setup for Vercel, Netlify, and Docker
- ✅ **NEW**: Production-ready build system with optimized scripts
- ✅ **NEW**: Local development environment with multiple start options

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for mobile optimization
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and mobile-first responsive design
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with `/api` prefix
- **Development**: Hot module replacement via Vite integration
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Mobile-First Design
- **Responsive Layout**: Optimized for mobile devices with maximum width containers
- **Touch-Friendly**: Large touch targets and gesture-friendly interactions
- **Bottom Navigation**: Fixed bottom navigation bar for easy thumb access
- **Progressive Enhancement**: Works on mobile browsers with app-like experience

## Key Components

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for production) with Neon Database serverless driver
- **Migrations**: Drizzle Kit for schema migrations
- **Development Storage**: In-memory storage implementation for development
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Authentication & Sessions
- **Session Storage**: PostgreSQL-backed sessions
- **User Model**: Simple username/password authentication
- **Schema Validation**: Zod schemas with Drizzle integration

### UI Component System
- **Design System**: Shadcn/ui with "new-york" style variant
- **Theme**: Custom color palette optimized for freshness monitoring (greens, blues, ambers)
- **Components**: Comprehensive set of accessible components including forms, charts, calendars, and mobile-optimized layouts
- **Icons**: Lucide React for consistent iconography

### Pages & Features
1. **Home Dashboard**: Real-time freshness overview with status cards and alerts, role-specific interfaces for all user types
2. **Analytics**: Charts and metrics for freshness trends and inventory analysis
3. **Calendar**: Delivery scheduling and event management with role-specific events
4. **Settings**: User preferences and notification controls with role-specific options
5. **QR Scanner**: Complete Passaporte do Frescor interface with digital seal reading and blockchain verification
6. **Smart Container**: Pote Inteligente management with real-time monitoring and intelligent storage optimization

### Passaporte do Frescor (Digital Freshness Passport)
- **Digital Seal Integration**: Complete supply chain traceability from farm to table
- **Blockchain Verification**: Immutable record keeping with hash verification
- **Journey Tracking**: Full visibility of production, processing, transport, storage, and retail stages
- **Sustainability Metrics**: Carbon footprint, water usage, and packaging sustainability data
- **Compliance Tracking**: ANVISA, organic, fair trade, and other certifications
- **Smart Predictions**: AI-powered freshness predictions and optimal consumption dates

### Pote Inteligente (Smart Container)
- **Real-time Monitoring**: Temperature, humidity, air quality, and light sensors
- **Intelligent Alerts**: Automatic notifications for expiration, contamination, and optimal conditions
- **Content Management**: Track multiple food items with individual freshness levels
- **Auto-optimization**: Automatic adjustment of storage conditions for maximum freshness
- **Integration**: Seamless connection with Passaporte do Frescor for complete cycle tracking

## Data Flow

### Client-Side Data Flow
1. **React Query**: Manages all server state with automatic caching and synchronization
2. **API Requests**: Centralized API client with credential handling and error management
3. **Component Updates**: Reactive updates based on query state changes
4. **Local State**: Component-level state for UI interactions and form handling

### Server-Side Data Flow
1. **Express Middleware**: Request logging, JSON parsing, and error handling
2. **Route Handlers**: RESTful endpoints under `/api` prefix
3. **Storage Layer**: Abstract storage interface with memory implementation for development
4. **Database Operations**: Drizzle ORM for type-safe database interactions

### Development vs Production
- **Development**: Vite dev server with HMR, in-memory storage, detailed logging
- **Production**: Static file serving, PostgreSQL database, optimized builds

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for production
- **drizzle-orm & drizzle-kit**: Modern TypeScript ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router (2KB alternative to React Router)
- **recharts**: React charting library for analytics visualization

### UI Dependencies
- **@radix-ui/***: Accessible, unstyled UI primitives (30+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Modern icon library

### Development Dependencies
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast bundling for production builds
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Client assets served by Express in production

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with static file serving
- **Database**: `DATABASE_URL` environment variable for PostgreSQL connection

### Hosting Requirements
- **Node.js Runtime**: ES modules support required
- **PostgreSQL Database**: For production data persistence
- **Environment Variables**: Database URL and other configuration

### Development Workflow
- **Hot Reloading**: Vite HMR for instant client updates
- **TypeScript**: Full type checking across client, server, and shared code
- **Database Migrations**: `npm run db:push` for schema updates
- **Unified Development**: Single command starts both client and server

### Local Development Setup
- **Simple Start**: `node start.js` or `npm start` (if configured locally)
- **Setup Script**: `node scripts/setup-local.js` for automated local configuration
- **Documentation**: `README-LOCAL.md` with complete local setup instructions
- **Local Package**: `package-local.json` template for custom npm scripts
- **Port**: Application runs on http://localhost:5000 in development mode

### Deployment & Production
- **Build System**: Optimized build scripts for different platforms
- **Vercel Deploy**: `node scripts/deploy-vercel.js` - One-command deployment to Vercel
- **Netlify Deploy**: `npm run deploy:netlify` - Automated Netlify deployment
- **Docker Support**: Complete containerization with `Dockerfile` and `.dockerignore`
- **Production Server**: `node start-production.js` - Local production testing
- **Build Testing**: `node scripts/test-build.js` - Verify build integrity
- **Documentation**: `README-DEPLOY.md` with comprehensive deployment guide

### Supported Platforms
- **Vercel** (Recommended): Full serverless deployment with optimized configuration
- **Netlify**: Serverless functions with static site generation
- **Docker**: Containerized deployment for any cloud provider
- **Traditional Servers**: PM2 process management with Nginx proxy

The architecture prioritizes mobile user experience, developer productivity, and type safety while maintaining clear separation between client and server concerns. The use of modern tools like Drizzle ORM, TanStack Query, and Shadcn/ui provides a solid foundation for building and maintaining the freshness monitoring application.