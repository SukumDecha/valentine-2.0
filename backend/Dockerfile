FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript
# RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]