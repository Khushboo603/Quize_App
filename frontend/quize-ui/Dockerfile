
# Stage 1: Build Angular application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Serve Angular application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/quize-ui/browser /usr/share/nginx/html
# COPY --from=build /app/dist/quize-ui /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]