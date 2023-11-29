#!/bin/bash
echo "------ switching to main ------"

git checkout main

echo "------ pulling from repo --------"
# Perform a git pull to update the repository
git pull

echo "------ removing node_modules ------"
# Remove node_modules directory
rm -rf node_modules

echo "------ Installing dependencies ------"
# Install dependencies using yarn
# --frozen-lockfile for reproducible dependencies i.e no version change at all
yarn install --frozen-lockfile

echo "------ building the project ------"
# Build the project using yarn (or npm run build for npm)
yarn build

echo "------ restarting nginx server ------"
sudo systemctl restart nginx
