# ==== Stage 1: Build the React Application ====
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# ==== Stage 2: Serve with Nginx ====
FROM nginx:alpine

# Remove default nginx static assets and configs
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copy Vite build output to Nginx serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx reverse proxy configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
