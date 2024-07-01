# Use an official node image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Ensure Vite is installed globally (optional, but ensures Vite command is available)
RUN yarn add vite

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["yarn", "dev"]
