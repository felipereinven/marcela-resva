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

## Recent Changes: Latest modifications with dates

### July 15, 2025 - MailerLite Integration & Enhanced Landing Page
- ✅ Successfully integrated MailerLite API for newsletter subscriptions
- ✅ Created "Shifting Souls Community" group in MailerLite (ID: 160033952049923407)
- ✅ Updated landing page with modern spiritual design and purple gradients
- ✅ Added Vimeo video integration (videos 1101675966 and 1101676211)
- ✅ Implemented responsive newsletter signup form with validation
- ✅ Created thank you page with WhatsApp group redirection
- ✅ Fixed CSS import issues and TypeScript errors
- ✅ Added particle background animations for spiritual ambiance
- ✅ Newsletter form captures: firstName, lastName, email, currentMoment
- ✅ API successfully creates subscribers in both local storage and MailerLite
- ✅ Proper error handling for duplicate emails and validation
- ✅ Significantly reduced section spacing for compact, professional layout
- ✅ Improved form contrast with white/90 background and proper text colors
- ✅ Added Shifting Souls mandala logo to footer
- ✅ Updated footer with correct contact email (info@marcelaresva.com)
- ✅ Updated copyright to 2025 and added design credit to Felipe Reinven

### July 29, 2025 - Instagram Compatibility & Mobile Fixes
- ✅ Fixed mobile spacing issue on thank you page - meditation cards no longer cut off
- ✅ Repositioned yellow registration text to appear directly above form on all devices
- ✅ Implemented comprehensive Instagram browser compatibility fixes:
  - Enhanced meta tags for social media browsers
  - Server-side headers for Instagram compatibility
  - Client-side Instagram browser detection
  - Automatic fallback component for Instagram users
  - Cache-busting for Instagram's in-app browser
- ✅ Added Open Graph and Twitter Card tags for better social sharing
- ✅ Mobile-first responsive design improvements

### July 29, 2025 - Complete Content Redesign per PDF Requirements
- ✅ Updated main hero title to "Recibe 4 regalos al registrarte"
- ✅ Added subtitle "Date el permiso de cada vez sentirte más sostenida por la vida"
- ✅ Updated intro text about using divine tools since 2014
- ✅ Changed "cada techo en un nuevo piso" to "cada límite en expansión"
- ✅ Completely redesigned 4 gifts section with exact PDF content:
  - El Audio Canalizado (2 min 16 seg)
  - El video La Energía del Pétalo
  - Cápsulas de Acción
  - Comunidad Shifting Souls
- ✅ Changed yellow call-to-action text from "¡Regístrate aquí!" to "Siente el llamado de tu corazón"
- ✅ Repositioned call-to-action text between video and form (centered)
- ✅ Updated form title to "Regístrate gratis aquí"
- ✅ Simplified form to only firstname and email fields (removed lastname and questions)
- ✅ Updated thank you page to match new 4 gifts structure
- ✅ Modified database schema and API to support simplified form structure
- ✅ Updated MailerLite integration for new field structure
- ✅ Removed Instagram compatibility yellow button component per user request

### Current Status
- Landing page fully functional with spiritual theme
- Newsletter subscription working with MailerLite sync
- Videos embedded and displaying properly
- WhatsApp integration ready (URL needs to be updated with actual group link)
- All forms validated and working correctly
- Single-column hero layout with centered content
- Marcela's personal photo integrated in testimonial section
- Improved color contrast for better accessibility
- Instagram link compatibility resolved with fallback options