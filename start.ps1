param(
  [switch]$Foreground
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

try {
  $health = Invoke-RestMethod -Uri "http://127.0.0.1:4173/health" -TimeoutSec 1
  if ($health.status -eq "ok") {
    Write-Host "Judou is already running: http://127.0.0.1:4173"
    exit 0
  }
} catch {
  # Start the local service below.
}

$nodePath = (Get-Command node).Source
if ($Foreground) {
  & $nodePath .\server.mjs
  exit $LASTEXITCODE
}

$stdout = Join-Path $root "server.log"
$stderr = Join-Path $root "server-error.log"
Start-Process `
  -FilePath $nodePath `
  -ArgumentList ".\server.mjs" `
  -WorkingDirectory $root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $stdout `
  -RedirectStandardError $stderr

for ($attempt = 0; $attempt -lt 20; $attempt += 1) {
  Start-Sleep -Milliseconds 150
  try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:4173/health" -TimeoutSec 1
    if ($health.status -eq "ok") {
      Write-Host "Judou started: http://127.0.0.1:4173"
      exit 0
    }
  } catch {
    # Keep waiting until the service is ready.
  }
}

throw "Local service failed to start. Check server-error.log."
