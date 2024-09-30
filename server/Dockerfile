# set the base image to create the image for react app
FROM node:20-alpine3.18

# we create a new user called app and add it to the group app this helps us to run the app as a non-root user which is a good practice in docker containers to avoid any security issues that might arise from running the app as root.
# addgroup -> create a new group
# -S -> create a system user
# -G -> add the user to a group
RUN addgroup app && adduser -S -G app app

# selecting the app user as the user to run the app in the container
USER app

# set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json before other files for better cache on later builds
COPY package*.json ./ 

# we change the user to root to basically give ownership of the /app directory to the app user from the root user and then we change the user back to the app user, we do this because the npm install command requires root access to install the packages globally and we don't want to run the app as root.
USER root
# chown -R <user>:<group> <directory>
RUN chown -R app:app /app

USER app

# install dependencies
RUN npm install

# copy the rest of the files to the working directory
COPY . .

# expose port 5555 to tell Docker that the container listens on the specified network ports at runtime
EXPOSE ${SERVER_PORT}

# command to run the app
CMD ["npm", "start"]