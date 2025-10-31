# Use Node 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Run frontend in dev mode (bind to all network interfaces)
CMD ["npm", "run", "dev", "--", "--host"]
