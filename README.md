# Food Menu Admin

A modern React-based restaurant menu management system built with TypeScript, Material-UI, and Redux Toolkit. This application provides a comprehensive solution for managing restaurant menus with authentication, menu item management, category organization, and a responsive design.

## 🚀 Features

### Authentication System

- **User Registration**: Secure user registration with validation
- **User Login**: Protected login system with error handling
- **Session Persistence**: Automatic login state persistence using localStorage
- **Route Protection**: Protected routes that redirect to login when unauthorized

### Menu Management

- **Add Menu Items**: Create new menu items with comprehensive details
- **Edit Menu Items**: Modify existing menu items with real-time validation
- **Delete Menu Items**: Remove menu items with confirmation
- **Image Upload**: Base64 image upload for menu item photos
- **Ingredient Management**: Add/remove ingredients for each menu item
- **Availability Toggle**: Mark items as available/unavailable

### Category Management

- **Create Categories**: Add custom categories to organize menu items
- **Delete Categories**: Remove categories with automatic item reclassification
- **Category Filtering**: Filter menu items by category
- **Validation**: Prevent duplicate categories and empty names

### Search & Filter

- **Real-time Search**: Search menu items by name and description
- **Debounced Search**: Optimized search with 300ms debounce
- **Category Filtering**: Filter items by specific categories
- **Active Filter Chips**: Visual representation of active filters
- **Clear Filters**: Easy filter reset functionality

### Dashboard

- **Welcome Card**: Personalized greeting with username
- **Statistics Cards**: Display total menu items and categories
- **Responsive Layout**: Mobile-first design with responsive grid

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Material-UI Theme**: Consistent, modern design system
- **Toast Notifications**: User feedback for all actions
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Smooth loading indicators
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Technology Stack

### Frontend

- **React 19.1.0**: Latest React with hooks and functional components
- **TypeScript 4.9.5**: Type-safe development
- **Material-UI 7.2.0**: Modern UI components and theming
- **Redux Toolkit 2.8.2**: State management with RTK
- **React Router DOM 7.7.0**: Client-side routing
- **React Redux 9.2.0**: React bindings for Redux

### Development Tools

- **ESLint 9.31.0**: Code linting and formatting
- **Prettier 3.6.2**: Code formatting
- **Husky 9.1.7**: Git hooks for code quality
- **TypeScript ESLint**: TypeScript-specific linting rules

### Testing

- **React Testing Library**: Component testing utilities
- **Jest**: Testing framework
- **User Event**: User interaction testing

## 📁 Project Structure

```
src/
├── app/                    # Redux store configuration
│   └── store.ts           # Store setup and configuration
├── components/             # Shared components
│   ├── InputField.tsx     # Reusable input component
│   └── ToastProvider.tsx  # Toast notification system
├── features/              # Feature-based modules
│   ├── auth/             # Authentication feature
│   │   ├── components/   # Auth-specific components
│   │   ├── hooks/        # Custom auth hooks
│   │   ├── slices/       # Redux auth slice
│   │   ├── types/        # Auth type definitions
│   │   └── validation/   # Auth validation logic
│   ├── category/         # Category management
│   │   ├── components/   # Category components
│   │   ├── types/        # Category types
│   │   └── validation/   # Category validation
│   ├── dashboard/        # Dashboard feature
│   │   └── components/   # Dashboard components
│   └── menu/            # Menu management
│       ├── components/   # Menu components
│       ├── slices/       # Redux menu slice
│       ├── types/        # Menu type definitions
│       └── validation/   # Menu validation
├── hooks/                # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
├── layout/               # Layout components
│   ├── AppLayout.tsx     # Main application layout
│   └── ProtectedRoute.tsx # Route protection component
├── route/                # Route configurations
│   ├── ProtectedRoute.tsx # Protected route definitions
│   └── PublicRoute.tsx   # Public route definitions
├── theme/                # Material-UI theme
│   └── theme.ts          # Custom theme configuration
└── utils/                # Utility functions
    └── validation.ts     # Shared validation utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd food-menu-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- **`npm start`**: Runs the app in development mode
- **`npm test`**: Launches the test runner
- **`npm run build`**: Builds the app for production
- **`npm run eject`**: Ejects from Create React App (one-way operation)
- **`npm run lint`**: Runs ESLint to check code quality
- **`npm run format`**: Formats code using Prettier
- **`npm run serve`**: Serves the production build locally

## 📱 Usage

### First Time Setup

1. Navigate to the registration page
2. Create a new account with username and password
3. You'll be automatically logged in and redirected to the dashboard

### Managing Menu Items

1. **Add Menu Item**: Click the floating action button (+) on the menu page
2. **Fill Details**: Enter name, description, price, category, and ingredients
3. **Upload Image**: Select an image file (supports base64 encoding)
4. **Save**: Click save to add the item to your menu

### Managing Categories

1. **Add Category**: Navigate to Categories page and click "Add Category"
2. **Enter Name**: Type a unique category name
3. **Save**: The category will be available for menu items

### Search and Filter

1. **Search**: Use the search bar to find items by name or description
2. **Filter**: Select a category from the dropdown to filter items
3. **Clear**: Use the clear buttons to reset search and filters

## 🔧 Configuration

### Environment Variables

The application uses localStorage for data persistence. No additional environment variables are required for basic functionality.

### Customization

- **Theme**: Modify `src/theme/theme.ts` to customize colors and styling
- **Validation**: Update validation rules in respective validation files
- **Storage**: Data is persisted in browser localStorage

## 📦 Build for Production

Create a production build:

```bash
npm run build
```

Serve the production build:

```bash
npm run serve
```

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation on client-side
- **Route Protection**: Protected routes prevent unauthorized access

## 📊 Data Persistence

The application uses localStorage for data persistence:

- **User Accounts**: Stored in `users` key
- **Authentication State**: Stored in `authState` key
- **Menu Data**: Stored in `menuState` key

## 🎨 UI/UX Features

- **Material Design**: Consistent Material-UI components
- **Responsive Layout**: Mobile-first design approach
- **Toast Notifications**: User feedback for all actions
- **Form Validation**: Real-time validation with error messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Built with ❤️ using React, TypeScript, and Material-UI**
