# Use a Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your development server runs on (default: Vite uses 5173)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
