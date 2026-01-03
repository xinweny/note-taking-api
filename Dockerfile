# Fetch minified node image on alpine linux
FROM node:22-alpine

# Set env
ENV NODE_ENV development

# Set work directory
WORKDIR /app

# Copy project files
COPY . /app

# Install dependencies
RUN npm install

# Expose server port
EXPOSE ${PORT}