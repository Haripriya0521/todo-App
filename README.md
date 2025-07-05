# todo-App
“This project is a part of a hackathon run by https://www.katomaran.com"


**ARCHITECTURE DIAGRAM:**
┌─────────────────────────────┐
│      React Native App       │
│  (Expo + Expo Router)       │
│                             │
│  • Google OAuth Login       │
│  • Task List UI             │
│  • FAB, Animations, etc.    │
│                             │
│      Axios API Calls        │
└──────────────┬──────────────┘
               │
         HTTPS REST API
               │
┌──────────────▼──────────────┐
│    Node.js / Express API    │
│                             │
│ • Routes:                   │
│   - GET /api/todos          │
│   - POST /api/todos         │
│   - PUT /api/todos/:id      │
│   - DELETE /api/todos/:id   │
│                             │
│ In-memory Array of Tasks    │
└──────────────┬──────────────┘
               │
         No Database

DEMO VIDEO LINK = "https://drive.google.com/file/d/1pjwatWs4XwvBSSMSbCB3OH68GNd_LjQ_/view?usp=sharing"


