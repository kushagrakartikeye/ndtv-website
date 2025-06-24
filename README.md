🚀 NDTV News Platform
A Full-Stack News Aggregation and Management System

📜 Overview
This project is a full-stack news aggregation and management platform developed during my technical internship at NDTV. It features real-time news fetching, personalized recommendations, secure admin interfaces, and seamless integration with third-party services like Google Trends. The platform is built with modern web technologies and is designed for scalability, performance, and user engagement.

🛠️ Tech Stack
Frontend: Next.js 13+ (App Router), TypeScript, React, CSS Modules

Backend: Node.js, Next.js API Routes

Database: MongoDB (with Mongoose ODM)

Authentication: JWT (JSON Web Tokens)

Deployment: Vercel (with CI/CD)

Third-Party Integrations: Google Trends API, RSS Feed Parsing

Performance: Lazy Loading, Image Optimization, Lighthouse Optimizations

UI/UX: Responsive Design, Splash Screen, Emotion Filtering

🌟 Features
1. Real-Time News Aggregation
RSS Feed Parsing: Fetches, parses, and displays live news headlines from multiple RSS sources.

Robust Error Handling: Handles XML inconsistencies and API failures gracefully.

Fallback Images: Uses default images for missing thumbnails.

2. News Card System
Dynamic Rendering: Displays news cards with hover effects, live status indicators, and optimized image loading.

Performance: Lazy-loads components and images for faster page loads.

3. Personalized Recommendations
User Interaction Tracking: Tracks clicks and searches to personalize content.

Keyword Matching: Recommends relevant articles based on user behavior.

State Persistence: Stores interaction history in localStorage for quick recommendations.

4. Admin Dashboard
Secure Authentication: JWT-based login for admin access.

User Message Management: CRUD operations for user messages and newsletter subscriptions.

Real-Time Updates: Atomic MongoDB operations for instant feedback.

Admin Reply System: Threaded replies using MongoDB $push operations.

5. Google Trends Integration
Live Trending Topics: Embeds Google Trends charts via iframe and custom API integration.

CORS Handling: Manages cross-origin requests and dynamic script loading.

UI Fixes: Resolves issues with trending sections and interactive graphs.

6. Performance Optimization
Lazy Loading: Loads components and images on demand.

Image Optimization: Uses optimized images and fallbacks.

Lighthouse Scores: Achieves high performance, accessibility, and SEO scores.

7. Security
JWT Authentication: Secure token validation and storage.

Input Validation: Sanitizes and validates user inputs.

Secure Storage: Protects sensitive data with best practices.

8. User Experience
Splash Screen: Personalized welcome screen with emotion-based filtering.

WhatsApp Floating Button: Direct contact via a floating button with hover image and caption.

User Message Checking: Secure login modal for users to check their messages.

9. Deployment & CI/CD
Vercel Deployment: Automated builds and environment variable management.

CI/CD Pipeline: Ensures smooth updates and rollbacks.

10. Collaboration & Communication
Cross-Functional Teams: Worked with designers and content teams for a seamless UX.

Technical Documentation: Clear code comments and README for maintainability.

🏗️ Architecture
Frontend: Next.js App Router for dynamic, SEO-friendly pages.

Backend: Next.js API Routes for server-side logic and data fetching.

Database: MongoDB for flexible, scalable data storage.

Authentication: JWT for secure admin access.

Third-Party Integrations: Custom scripts for Google Trends and RSS feeds.

Performance: Optimized for fast load times and high Lighthouse scores.

🚀 Getting Started
Prerequisites
Node.js (v18+ recommended)

MongoDB Atlas or local MongoDB instance

Google Trends API Key (optional, for live trends)

Vercel Account (for deployment)

Installation
Clone the repository:

bash
git clone https://github.com/your-username/ndtv-news-platform.git
cd ndtv-news-platform
Install dependencies:

bash
npm install
Set up environment variables:

Create a .env.local file in the root directory.

Add your MongoDB connection string and JWT secret:

text
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
GOOGLE_TRENDS_API_KEY=your-api-key (optional)
Run the development server:

bash
npm run dev
Open http://localhost:3000 in your browser.

🧪 Testing
Unit Tests: (Coming soon)

Integration Tests: (Coming soon)

Manual Testing: Test all features, including admin login, message management, and third-party integrations.

🚀 Deployment
Push your code to a GitHub repository.

Connect the repository to Vercel.

Set environment variables in Vercel dashboard.

Deploy!

📝 Future Work
Machine Learning Recommendations: Integrate TensorFlow.js for more accurate personalization.

Real-Time Analytics: Add WebSockets or GraphQL subscriptions for live user analytics.

Admin Dashboard Enhancements: Bulk actions and advanced filtering.

Automated Testing: Add unit and integration tests.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

📄 License
MIT

📞 Contact
For questions or feedback, please open an issue or contact me directly.

Thank you for checking out the NDTV News Platform! 🚀
