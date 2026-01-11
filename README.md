# Smriti - The Digital Essence of Memory

**Smriti** is a beautiful and secure digital note-taking application designed to help you capture and organize your thoughts, memories, and ideas. This is the **Frontend** of the application, built with **React**, offering a smooth and responsive user experience.

## Features

*   **Secure Authentication**: User registration and login to keep your notes private.
*   **Create Memories**: Easily write down new notes and ideas.
*   **Organize**: View your notes in a convenient sidebar list.
*   **Edit & Update**: Modify your existing notes whenever you want.
*   **Archive**: Keep your workspace organised by archiving notes with a tag, without deleting them.
*   **Delete**: Permanently remove notes you no longer need.
*   **User Profile**: Manage your user profile.
*   **Responsive Design**: Works on desktop and mobile screens.

## Technology Stack

This project is built using modern web technologies:

*   **React**: For building the user interface.
*   **React Router**: For seamless navigation between pages.
*   **Context API**: For managing authentication state across the app.
*   **CSS**: Custom styling for a unique "Butterfly" aesthetic.

## Getting Started

Follow these simple steps to run the application on your local machine.

### Prerequisites

Make sure you have **Node.js** installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository** (or download the files):
    ```bash
    git clone <repository-url>
    cd notesApp-frontend
    ```

2.  **Install dependencies**:
    Runs the following command to install all the necessary libraries:
    ```bash
    npm install
    ```

### Running the App

1.  **Start the development server**:
    ```bash
    npm start
    ```

2.  **Open in Browser**:
    The app should run automatically at [http://localhost:3000](http://localhost:3000).

### Build for Production

If you want to create an optimized build for deployment:
```bash
npm run build
```

## 📂 Project Structure

Here is a quick look at the main folders:

*   **`src/components`**: Contains all the visual parts like the Sidebar, Note view, Login/Register forms, etc.
*   **`src/context`**: Handles the logic for checking if a user is logged in (`AuthContext.js`).
*   **`src/services`**: Contains `api.js` which handles communication with the backend server.
*   **`src/App.js`**: The main entry point where routes and navigation are set up.

## 🔗 Backend Connection

Please note that this is the **Frontend** only. It is designed to connect to a backend API server.
Ensure your backend server is running and the API endpoints in `src/services/api.js` are correctly pointing to it (usually `http://localhost:8000` or similar).

---

*Enjoy capturing your digital essence with Smriti!*
