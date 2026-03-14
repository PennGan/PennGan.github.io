#!/bin/zsh

set -euo pipefail

REPO_DIR="/Users/ganpeng/code/Quartz"
VAULT_DIR="/Users/ganpeng/Library/Mobile Documents/iCloud~md~obsidian/Documents/个人知识网站"

cd "$REPO_DIR"

echo "==> Syncing Obsidian notes"
node scripts/sync-obsidian.mjs --vault "$VAULT_DIR"

echo "==> Checking for changes"
if [[ -z "$(git status --porcelain)" ]]; then
  echo "No changes to commit."
  read -r "?Press Enter to close..."
  exit 0
fi

echo "==> Committing changes"
git add .
git commit -m "Update notes $(date '+%Y-%m-%d %H:%M:%S')"

echo "==> Pushing to GitHub"
git push origin main

echo "==> Done"
read -r "?Press Enter to close..."
