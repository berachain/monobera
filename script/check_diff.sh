#!/bin/bash

# Directory to search for, passed as the first argument
DIR_PATH=${1}

# Check if the directory exists in the current commit
if git ls-tree -d HEAD --name-only | grep -q "^${DIR_PATH}$"; then
  # If it exists, check for changes between the latest commit and its parent
  git diff HEAD^ HEAD --quiet -- "$DIR_PATH"
  if [ $? -eq 1 ]; then
    echo "Changes detected in $DIR_PATH"
    exit 1
  else
    echo "No changes in $DIR_PATH"
    exit 0
  fi
else
  echo "Directory $DIR_PATH does not exist in the current commit"
  exit 0
fi