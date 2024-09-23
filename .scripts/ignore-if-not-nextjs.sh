# takes first args and checks if apps/[args]/next.config.js exists
# returns 0 if exists, 1 if not

if [ -f "apps/$1/next.config.mjs" ]; then
  exit 1
else
  exit 0
fi
