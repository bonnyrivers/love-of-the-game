$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendDir = Join-Path $projectRoot 'frontend'
$backendDir = Join-Path $projectRoot 'django-backend'
$venvPython = Join-Path $backendDir 'venv\Scripts\python.exe'

if (-not (Test-Path $frontendDir)) {
  throw "Frontend folder not found: $frontendDir"
}

if (-not (Test-Path $backendDir)) {
  throw "Backend folder not found: $backendDir"
}

if (-not (Test-Path $venvPython)) {
  throw "Python venv not found at $venvPython. Create it first or update this script."
}

Write-Host 'Starting frontend (Vite)...'
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontendDir'; npm run dev"

Write-Host 'Starting backend (Django runserver)...'
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backendDir'; & '$venvPython' manage.py runserver"

Write-Host 'Opening GraphiQL...'
Start-Process "http://127.0.0.1:8000/graphql/"

Write-Host ''
Write-Host 'Launched:'
Write-Host '- Frontend:  http://127.0.0.1:5173/'
Write-Host '- Backend:   http://127.0.0.1:8000/'
Write-Host '- GraphiQL:  http://127.0.0.1:8000/graphql/'
