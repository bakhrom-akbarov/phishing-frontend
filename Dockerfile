# Dockerfile.frontend
FROM node:16-alpine
WORKDIR /app

COPY apps/frontend/package*.json ./
RUN npm install

COPY apps/frontend ./

RUN npm run build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
