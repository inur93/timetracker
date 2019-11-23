FROM node:12.13.0-alpine

# copy yarn.lock and package.json into image
ADD yarn.lock /tmp/yarn.lock
ADD package.json /tmp/package.json

#this will tell node where to look for packages. since we copied package.json
#to the root a node_modules folder will be created in the root as well when running 
# yarn. This might not be entirely necessary
ENV NODE_PATH=/tmp/node_modules

# appends the '/node_modules/.bin' to the path. This will make react-scripts visible to node
# when running 'yarn start' otherwise you will receive an error like:
# /bin/sh: react-scripts: not found
# error Command failed with exit code 127.
ENV PATH=$PATH:/tmp/node_modules/.bin

# install all dependencies inside /tmp/node_modules so they are cached in the image.
WORKDIR /tmp
RUN yarn

#note that the node_modules and package.json is copied to another folder than the source files.
# this is to avoid overwriting any files from image with the host files or vice versa.
WORKDIR /app
ADD . /app

#3000 for accessing the app and 35729 for the debugger.
EXPOSE 3000 35729
# start the app from the /app folder
CMD ["yarn", "start"]