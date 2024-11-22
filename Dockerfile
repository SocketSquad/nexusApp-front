FROM node:20-alpine AS build

#declare build time environment variables
ARG VITE_API_URL

#set environment variables
ENV VITE_API_URL=$VITE_API_URL

# Build App
WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "build"]

#serve with nginx
FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /app/build .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

