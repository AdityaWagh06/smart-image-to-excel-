# Smart Image to Excel - Frontend

This is the frontend application for Smart Image to Excel, a modern React application built with Vite that provides an intuitive interface for document processing and OCR functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technology Stack

- **React 19**: Modern UI framework
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── FileUpload.jsx  # Document upload component
│   ├── Navbar.jsx      # Navigation component
│   ├── ResultsDisplay.jsx # Results display component
│   └── ...
├── services/           # API services and utilities
│   └── api.js         # API communication layer
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## 🎨 Features

- **Modern UI**: Clean, responsive design with intuitive user experience
- **Real-time Preview**: See your document before processing
- **Multiple Document Types**: Support for bills, invoices, receipts, and generic documents
- **Excel Export**: Direct export to Excel format
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🔧 Configuration

The API endpoint can be configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Upload the `dist/` directory to your hosting provider
3. Configure your hosting provider to serve the SPA correctly

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Ensure all tests pass before submitting a PR

---

**Smart Image to Excel Frontend** - Modern, fast, and user-friendly document processing interface! 🚀
