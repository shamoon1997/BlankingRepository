# Gridware - Sherlock v2

Frontend for Gridware systems.

#### React + TypeScript + Vite

This project uses Vite with react-ts template

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh


#### Deployment Steps

1. ssh into the server via

    `ssh  ubuntu@sherlock-v2.gridware.io `
2. cd into `gridware-sherlock` repo
3. run `sh build.sh`

The contents of build.sh are as follows they are self explaining

```shell
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

```
IMPORTANT

Running git pull or even git clone will ask you your password you will need to create a Personal Access Token (PAT) and use that instead of a password, password based logins are not allowed anymore according to Github.
Create a PAT here https://github.com/settings/tokens?type=beta 


If for some reason you need to install dependencies **ALWAYS** ru `yarn install --frozen-lockfile
` to prevent version drift on production server

When `yarn build` is run the dist folder contains the production release 
of the application.

Nginx is the server we use to serve our site. It's encrypted with a self-signed certificate.




