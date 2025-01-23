# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

RUN chmod +x node_modules/.bin/ts-node-dev
# Copy the entire project
COPY . .

## Build the application
#RUN npm run build

# Expose port 5173 (default for Vite)
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]