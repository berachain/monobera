if git ls-tree -d HEAD --name-only | grep -q "$DIR_PATTERN"; then
  # If it exists, check for changes between the latest commit and its parent
  git diff HEAD^ HEAD --quiet -- "${DIR_PATTERN//^/}"
  if [ $? -eq 1 ]; then
    echo "Changes detected in ${DIR_PATTERN//^/}"
    exit 1
  else
    echo "No changes in ${DIR_PATTERN//^/}"
    exit 0
  fi
else
  echo "Directory ${DIR_PATTERN//^/} does not exist in the current commit"
  exit 0
fi