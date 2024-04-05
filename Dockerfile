# Use an official Node.js runtime as a base image
FROM node:19.0-alpine

# Set the working directory to /app
WORKDIR /appuu

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install next react react-dom


# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Run the application
CMD ["npx", "next", "dev"]
