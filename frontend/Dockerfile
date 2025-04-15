# Stage 1
FROM node:alpine as build

WORKDIR /app

COPY frontend/package.json /app/

RUN npm i

COPY frontend/ .

RUN npm run build

# Stage 2
FROM nginx:alpine

COPY --from=build /app/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]