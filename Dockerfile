FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

<<<<<<< HEAD
CMD ["node", "index.js"]
=======
CMD ["node", "./models/index.js"]
>>>>>>> e2ffae50ae8c43aa5fcfdcce753be7480dfacea1
