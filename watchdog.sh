#!/bin/bash
# Watchdog: restarts npm run dev on port 3000 if it dies
cd /Users/danielpereira/Desktop/Singlepage/SSE
if ! curl -s -o /dev/null --max-time 2 http://localhost:3000/ 2>/dev/null; then
  echo "[$(date)] Server down — restarting"
  cd /Users/danielpereira/Desktop/Singlepage/SSE && npm run dev &
  echo "[$(date)] Started PID $!"
fi