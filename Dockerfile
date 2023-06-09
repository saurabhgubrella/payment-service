
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app
RUN npm install
COPY . /app
ENV MONGO_URI=mongodb://localhost:27017/fitpro

CMD node index.js
# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# # Bundle app source
# COPY . .

EXPOSE 8282
# CMD [ "node", "index.js" ]