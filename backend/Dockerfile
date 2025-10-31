# Use Node 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy all backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Run server with nodemon
CMD ["nodemon", "server.js"]
