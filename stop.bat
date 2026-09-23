@echo off
title Stop Folio & Ink
color 0C

echo ======================================================================
echo           STOPPING FOLIO ^& INK SERVICES
echo ======================================================================
echo.

echo Freeing port 8000 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo Freeing port 5173 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo Closing launcher windows...
taskkill /fi "WINDOWTITLE eq Folio & Ink*" >nul 2>&1

echo.
echo [DONE] All Folio & Ink development servers have been stopped.
echo.
pause
