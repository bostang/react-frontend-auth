# react-frontend-auth/Dockerfile
# Stage 1: Build the React application
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY react-frontend-auth/package.json react-frontend-auth/package-lock.json /app/

RUN npm install

# Copy the rest of the application code
COPY react-frontend-auth/. /app/

# Build the React application
# This will create a 'build' directory with the static files
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS production-stage

# Remove default Nginx config
# Ini biasanya aman karena kita akan menimpa dengan config kita sendiri
# Namun, baris ini terkadang bisa menjadi masalah jika file default tidak ada
# Atau jika Anda mem-mount Nginx config di docker-compose.yml
RUN rm /etc/nginx/conf.d/default.conf || true # Tambahkan '|| true' untuk menghindari error jika file tidak ada

# Copy custom Nginx configuration
# Ini mengasumsikan 'nginx.conf' berada di direktori 'nginx/' di root proyek Anda
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf 
    # Lebih baik beri nama default.conf atau nama lain yang valid

# Copy the build output from the build stage to Nginx's static files directory
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Catatan:
# Untuk membangun dan mendorong image Nginx dengan konfigurasi ini, gunakan perintah berikut:
# docker build -t bostang/auth-app-frontend:latest -f react-frontend-auth/Dockerfile .
# docker push bostang/auth-app-frontend:latest