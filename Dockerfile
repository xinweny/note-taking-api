# Fetch minified node image on alpine linux
FROM node:22-alpine

# Set work directory
WORKDIR /app

# Copy project files
COPY . /app

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Expose server port
EXPOSE ${PORT}

CMD ["nodemon", "src/server.js"]