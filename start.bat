@echo off
echo Starting React App...

:: Optional - install dependencies if node_modules is missing
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

:: Start the development server
npm run dev

pause
