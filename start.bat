@echo off
title Folio & Ink - Book Recommendation System
color 0F

echo ======================================================================
echo           FOLIO ^& INK - BOOK RECOMMENDATION SYSTEM
echo ======================================================================
echo.
echo [1/3] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Folio & Ink - Backend (Port 8000)" cmd /c "cd /d %~dp0 && python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000"

echo [2/3] Starting React / Vite Frontend on http://127.0.0.1:5173 ...
start "Folio & Ink - Frontend (Port 5173)" cmd /c "cd /d %~dp0frontend && npm run dev"

echo [3/3] Waiting for servers to initialize...
timeout /t 4 /nobreak >nul

echo.
echo Opening Folio & Ink in your default web browser...
start http://127.0.0.1:5173

echo.
echo ======================================================================
echo   Application started successfully!
echo   - Frontend: http://127.0.0.1:5173
echo   - Backend:  http://127.0.0.1:8000
echo   - API Docs: http://127.0.0.1:8000/docs
echo ======================================================================
echo.
echo Press any key to close this launcher window (servers keep running)...
pause >nul
