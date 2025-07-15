# Shifting Souls - Spiritual Transformation Website

## Overview

This is a React-based spiritual transformation website for Marcela Resva's "Shifting Souls" brand. The application targets women aged 28-65 experiencing spiritual crises and provides a newsletter subscription service integrated with MailerLite for email marketing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Router**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom spiritual theme colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Storage**: In-memory storage with interface for future database integration
- **Session Management**: Ready for PostgreSQL session store (connect-pg-simple)

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Subscribers Table**: Newsletter subscribers with MailerLite integration
  - firstName, lastName, email, currentMoment (spiritual status)
  - subscribedAt timestamp and mailerLiteId for external sync

### API Endpoints
- `POST /api/subscribe`: Newsletter subscription with MailerLite integration
- Validates email uniqueness and syncs with MailerLite API
- Returns appropriate Spanish error messages

### Frontend Pages
- **Landing Page**: Main spiritual transformation page with newsletter signup
- **Thank You Page**: Post-subscription confirmation with Vimeo video
- **404 Page**: Simple not found page

### UI Components
- **ParticleBackground**: Animated spiritual particle effects
- **VimeoPlayer**: Embedded Vimeo video player component
- **Form Components**: Newsletter subscription form with validation
- **Toast System**: User feedback notifications

## Data Flow

1. User visits landing page with animated particle background
2. User fills newsletter subscription form (firstName, lastName, email, currentMoment)
3. Frontend validates form data using Zod schema
4. API endpoint processes subscription:
   - Checks for existing email in local storage
   - Creates subscriber record locally
   - Syncs with MailerLite API using environment variables
   - Updates local record with MailerLite ID
5. User redirected to thank you page with Vimeo video
6. Thank you page includes WhatsApp group invitation

## External Dependencies

### Email Marketing
- **MailerLite**: Newsletter management and email automation
- Uses API key and group ID from environment variables
- Syncs subscriber data including custom fields

### Media
- **Vimeo**: Video hosting for spiritual content
- Custom player component with responsive design
- Specific video for post-subscription experience

### Fonts & Icons
- **Google Fonts**: Cormorant Garamond, Poppins, Dancing Script
- **Font Awesome**: Icons for social media and UI elements

### Development Tools
- **Replit Integration**: Development environment optimizations
- **ESBuild**: Fast TypeScript compilation for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development
- Uses Vite dev server with HMR and TypeScript checking
- Replit-specific optimizations and error overlays
- File watching and hot reload for rapid development

### Production Build
- Vite builds client-side React application
- ESBuild compiles server TypeScript to ES modules
- Static files served from Express with proper routing
- Database migrations handled by Drizzle Kit

### Environment Configuration
- PostgreSQL connection via DATABASE_URL
- MailerLite API credentials (API_KEY, GROUP_ID)
- Supports both direct env vars and VITE_ prefixed versions
- Session configuration for production scaling

### Database Management
- Drizzle ORM with PostgreSQL dialect
- Schema migrations in `/migrations` directory
- Push command for development schema updates
- Prepared for production database provisioning

The application follows a spiritual wellness theme with purple/blue gradients, mystical animations, and Spanish language content targeting Latin American women seeking spiritual transformation.