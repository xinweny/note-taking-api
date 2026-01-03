# Fetch minified node image on alpine linux
FROM node:22-alpine

# Set env
ENV NODE_ENV development

# Set work directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose server port
EXPOSE 5000

# Start application
CMD ["node", "src/index.js"]