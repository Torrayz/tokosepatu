# STRYDE - Indonesian Shoe Brand E-Commerce Platform

A complete, production-ready e-commerce web application UI for **STRYDE** — an Indonesian shoe brand with the tagline **"Walk Your Way"**. Built with Next.js 16, TypeScript, Tailwind CSS, and a minimalist streetwear-inspired design aesthetic.

## Project Overview

STRYDE is a full-featured e-commerce platform showcasing modern web development best practices with:
- Clean, minimalist design inspired by Nike SNKRS and contemporary streetwear aesthetics
- Complete product catalog with filtering, sorting, and search
- Responsive shopping experience (mobile-first)
- Professional checkout flow
- Admin dashboard for store management
- TypeScript for type safety throughout

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) with TypeScript |
| **Styling** | Tailwind CSS + Custom Component Library |
| **Fonts** | Plus Jakarta Sans (headings) + Inter (body) |
| **UI Components** | Custom shadcn/ui-inspired components |
| **Forms** | React Hook Form + Zod |
| **Notifications** | Sonner Toast |
| **State Management** | Client-side hooks + URL params |
| **Deployment** | Vercel-ready |

## Design System

### Color Palette
- **Primary**: `#0A0A0A` (Near Black) - Main text and backgrounds
- **Background**: `#FFFFFF` (White) - Clean canvas
- **Accent**: `#E8FF3A` (Electric Yellow) - CTAs, badges, highlights
- **Muted**: `#F5F5F5` - Secondary backgrounds
- **Border**: `#E5E5E5` - Subtle borders
- **Semantic**: Success (#22C55E), Error (#EF4444), Warning (#F59E0B)

### Typography
- **Headings**: Plus Jakarta Sans (Bold/Extrabold weights)
- **Body**: Inter (Regular/Medium/Semibold weights)
- **Sizes**: Responsive from 14px (mobile) to 64px (desktop)

### Spacing & Radius
- **Border Radius**: 8px (cards), 6px (buttons), 999px (badges)
- **Spacing**: Standard Tailwind scale (4px units)
- **Layout**: Flexbox-first with CSS Grid for complex layouts

## Project Structure

```
stryde/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                 # Root layout with fonts and metadata
│   ├── page.tsx                   # Homepage
│   ├── products/
│   │   ├── page.tsx              # Product catalog with filters
│   │   └── [slug]/page.tsx        # Product detail page
│   ├── cart/page.tsx              # Shopping cart
│   ├── checkout/
│   │   ├── page.tsx              # Checkout form
│   │   └── success/page.tsx      # Order confirmation
│   ├── orders/page.tsx            # Order history
│   ├── auth/
│   │   ├── login/page.tsx        # Login page
│   │   └── register/page.tsx     # Registration page
│   ├── admin/page.tsx             # Admin dashboard
│   └── globals.css                # Global styles & Tailwind directives
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Top navigation with brand logo
│   │   └── Footer.tsx            # Footer with links and contact
│   ├── product/
│   │   ├── ProductCard.tsx       # Individual product card
│   │   ├── ProductGrid.tsx       # Grid layout for products
│   │   ├── ProductFilter.tsx     # Sidebar filters and sort
│   │   └── SizeSelector.tsx      # Size selection interface
│   └── ...
├── lib/
│   ├── utils.ts                   # Formatting and utility functions
│   └── ...
├── types/
│   └── index.ts                   # TypeScript type definitions
├── public/
│   └── products/                  # Product images
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.js                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

## Key Features

### Homepage
- Eye-catching hero section with CTA buttons
- Featured products showcase (4 items)
- Category preview grid (Sneakers, Casual, Formal, Sandals, Boots)
- Social proof stats (500+ products, 10K+ customers, 100% authentic)
- Promotional call-to-action sections

### Product Catalog (`/products`)
- **Grid Layout**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Filtering**: By category, price range, size availability
- **Sorting**: Newest, Price (ascending/descending), Name (A-Z)
- **Search**: URL-based parameters for shareable links
- **Pagination Ready**: Can be extended to support pagination
- **Stock Status**: Real-time availability display with low-stock warnings

### Product Detail (`/products/[slug]`)
- Image gallery with thumbnail switcher
- Full product information with category badge
- Size selector with stock availability per size
- Quantity adjustment controls
- Add to cart button with validation
- Related products sidebar
- Breadcrumb navigation
- Product info boxes (Free shipping, Authentic, Easy returns)

### Shopping Cart (`/cart`)
- Persistent item list with images and prices
- Quantity adjustment per item
- Remove item functionality
- Real-time subtotal calculation
- Order summary sidebar
- Tax calculation (10%)
- Shipping cost display
- Empty state with CTA

### Checkout (`/checkout`)
- Multi-step form for shipping information
- Province dropdown (6 provinces included)
- Payment method selection (COD / Bank Transfer)
- Address validation
- Order summary with total
- Loading states on submission

### Order Confirmation (`/checkout/success`)
- Visual success indicator
- Order ID display
- Order summary with details
- Next steps guidance
- Link to order tracking

### Orders Page (`/orders`)
- Order history listing
- Status badges with color coding
- Order date and item count
- Order total display
- Click through to order details (placeholder)

### Admin Dashboard (`/admin`)
- Key metrics cards (Revenue, Orders, Products, Customers)
- Recent orders table
- Quick action buttons
- System information display
- Links to product and order management

### Authentication
- **Login Page** (`/auth/login`): Email + password with demo account button
- **Register Page** (`/auth/register`): Full name, email, password with confirmation
- Both pages have links to switch between login/register

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

No external integrations are required for the UI. The project uses mock data for demonstration. To connect to real services (Supabase, Stripe, etc.), add environment variables as needed.

```bash
# .env.local (optional for future integrations)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Color Usage Guide

### Primary (#0A0A0A) - Use for:
- Main text and headings
- Primary navigation items
- Primary button backgrounds
- Form labels and instructions

### Accent (#E8FF3A) - Use for:
- Primary call-to-action buttons
- Status badges (Featured, New)
- Link hover states
- Highlight important information

### Muted (#F5F5F5) - Use for:
- Secondary backgrounds
- Alternate section backgrounds
- Hover states on neutral buttons
- Light backgrounds for cards

### Border (#E5E5E5) - Use for:
- Card borders
- Divider lines
- Input field borders
- Subtle visual separation

## Responsive Design

The application follows a mobile-first approach:
- **Mobile**: Base breakpoint (320px+)
- **Tablet**: `md:` breakpoint (768px+)
- **Desktop**: `lg:` breakpoint (1024px+)
- **Large**: `xl:` breakpoint (1280px+)

All pages are fully responsive with:
- Touch-friendly buttons and inputs
- Collapsible navigation on mobile
- Flexible grids that reflow
- Optimized image sizes

## Mock Data

The application currently uses mock data for:
- 6 sample products across 5 categories
- Multiple size options with stock levels
- Shopping cart items
- Orders and order history
- User accounts

To connect real data, replace mock arrays with API calls.

## Component Architecture

### Layout Components
- **Navbar**: Sticky top navigation with logo, category links, search, and cart badge
- **Footer**: Multi-column footer with brand info, links, and contact details

### Product Components
- **ProductCard**: Reusable product thumbnail with hover effects
- **ProductGrid**: Responsive grid layout for product cards
- **ProductFilter**: Sidebar with category, price, and sort options
- **SizeSelector**: Size picker with stock availability

### Utility Functions (lib/utils.ts)
- `formatCurrency()`: Format prices as Indonesian Rupiah
- `formatDate()`: Format dates in Indonesian locale
- `generateSlug()`: Generate URL-friendly slugs from names
- `cn()`: Tailwind CSS class merging utility

## Next Steps for Production

To make this a fully functional e-commerce platform, integrate:

1. **Database**: Supabase PostgreSQL with proper schema
2. **Authentication**: Better Auth or Supabase Auth
3. **Storage**: Supabase Storage for product images
4. **Payment**: Stripe or Midtrans integration
5. **Orders**: Real order management and tracking
6. **Admin**: Full product and order CRUD operations
7. **Search**: Full-text search capabilities
8. **Analytics**: User behavior and sales tracking

## Performance Considerations

- Images are optimized with Next.js Image component
- Fonts are self-hosted via Google Fonts with CSS
- CSS is minified via Tailwind CSS
- Build output is optimized for production
- Responsive images serve correct sizes per device

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a custom project for STRYDE. All rights reserved.

## Support

For issues or questions about the design or implementation, refer to the PRD and design system documentation included in the project root.

---

**Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS**
