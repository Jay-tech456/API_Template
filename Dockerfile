FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Expose the port on which your app runs (e.g., 3000)
EXPOSE 3000

# Command to run your Node.js server
CMD ["node", "index.js"]