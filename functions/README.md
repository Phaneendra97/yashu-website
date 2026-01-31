# Firebase Functions for Portfolio Chat

This directory contains the backend logic for the AI-powered chat interface.

## Setup Instructions

### 1. Environment Variables
To run the functions locally, you must configure your OpenAI API Key.

1.  Create a file named `.env` in this directory (`functions/`).
2.  Add your OpenAI API Key to the file:

    ```bash
    OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
    ```

    > **Note:** The `.env` file is gitignored for security. Never commit your real API key to the repository.

### 2. Running Locally
To start the local emulator:

```bash
npm run serve
```

This will spin up a local server (usually at `http://127.0.0.1:5001/...`) that the frontend can talk to.

### 3. Deployment
To deploy to Firebase Production:

1.  **Set the Secret**:
    ```bash
    firebase functions:secrets:set OPENAI_API_KEY
    ```
    (Paste your key when prompted).

2.  **Deploy**:
    ```bash
    firebase deploy --only functions
    ```
