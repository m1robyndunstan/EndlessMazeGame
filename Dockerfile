# Use latest version of node
FROM node:16-bullseye as build-env

# Create app directory
WORKDIR /endless-maze-game

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY endless-maze-game/package.json package.json
COPY endless-maze-game/yarn.lock yarn.lock
COPY container-entrypoint.sh container-entrypoint.sh
EXPOSE 4200
RUN yarn
RUN npm install -g @angular/cli
RUN npm link ng
ENTRYPOINT [ "./container-entrypoint.sh" ]
