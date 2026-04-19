FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on (5000)
EXPOSE 5000

# Command to run the application
CMD [ "npm", "start" ]
