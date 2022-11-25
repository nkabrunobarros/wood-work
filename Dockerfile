# Filename: Dockerfile
FROM node:16

# Change the working directory.
WORKDIR /home/node

# Workaround because `WORKDIR` always runs as root.
RUN chown -R node /home/node

# Change the user to avoid running as `root`.
USER node

# Copy project directory.
COPY . ./

# Run yarn.
RUN yarn

# Run yarn.
RUN yarn build

# RUN apt-get install nettools

EXPOSE 3000

RUN yarn start