
# Cloudlens

CloudLens is a React app, that makes possible to take a photo with your device and get a description of it with Groq.

## Screenshot

[Screenshot](screenshot.png)

## Demo

https://cloudlens.cloudforge.fi


## Run Locally

Clone the project

```bash
  git clone https://github.com/cloudforge-oy/cloudlens.git
```

Go to the project directory

```bash
  cd cloudlens
```
Backend:

```bash
  cd backend
```

Install dependencies

```bash
  pip install -r requirements.txt
```

IMPORTANT: Add Groq key to .env

Start the server

```bash
  python vision_groq.py
```


Frontend: 
Note: You should have backend running on different terminal on http://127.0.0.1:5000

From the project directory

```bash
  cd cloudlens
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Now VITE is running and app can be accessed with browser at http://localhost:5173/
