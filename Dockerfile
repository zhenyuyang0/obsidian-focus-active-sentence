FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Default command - can be overridden
CMD ["npm", "run", "dev"]
