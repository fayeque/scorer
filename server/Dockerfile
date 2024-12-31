# Use the official Node.js LTS image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install -g pm2 && npm install

# Copy the rest of the application code
COPY . .

# Expose the desired port (default for most Node.js apps is 3000)
EXPOSE 3000

# Set the startup command to use PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
