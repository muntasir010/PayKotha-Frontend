# 💳PayKotha  
A secure, role-based, and user-friendly frontend application for a Digital Wallet System built with React.js, Redux Toolkit, and RTK Query. Supports Users, Agents, and Admins with tailored dashboards and wallet operations.

## Tech Stack
- **Frontend:** React, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt (API provided separately or mocked)
  
## Features
#### Public Landing
- Home, About, Features, Contact, FAQ pages
- Responsive design with sticky navbar and footer
- Hero banner with CTA buttons
- Skeleton loaders and smooth transitions
  
#### Authentication
- Registration & Login with JWT
- Role selection: User / Agent
- Role-based redirection
- Persisted login state
- Logout functionality
  
#### User Dashboard
- Wallet balance overview
- Deposit, withdraw, and send money
- Transaction history with pagination and filtering
- Profile management (update name, phone, password)
  
#### Agent Dashboard
- Overview of cash-in/out summary
- Add/withdraw money from users
- Transaction history
- Profile management
  
#### Admin Dashboard

- Total users, agents, transactions overview
- Manage users & agents
- View all transactions with search & filters
- Profile management
  
#### General
- Role-based navigation
- Loading indicators and global error handling
- Form validations
- Pagination and data visualization (cards, charts, tables)
- Toast notifications
- Guided tour for dashboard features
- Responsive and accessible UI/UX
  
#### Setup Instructions
1. Clone the repository:
  
 git clone <frontend-repo-url>
 cd digital-wallet-frontend
  
2. Install dependencies:
 npm install

3. Start the development server:
 npm start

4. Open http://localhost:5173 in your browser.
   

### Project Structure
src/
├─ components/      # Reusable UI components
├─ pages/           # Landing & dashboard pages
├─ redux/           # Redux store, slices, RTK queries
├─ routes/          # React Router setup
├─ utils/           # Helper functions
└─ App.tsx


### Demo Credentials
- Admin: naeemtasir07@gmail.com / 12345678
- Agent: seraagent@gmail.com / sera1234
- User: abdul@mail.com / A@123456

### Deployment
- Frontend live URL: https://paykotha.vercel.app
- Backend live URL: https://pay-kotha-backend.vercel.app