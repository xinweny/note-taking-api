# Fetch minified node image on alpine linux
FROM node:22-alpine

# Set work directory
WORKDIR /app

# Copy all project files
COPY . .

# Install dependencies
RUN npm install

# Expose server port
EXPOSE ${PORT}

CMD ["npm", "run", "start"]