FROM node:16

WORKDIR /app
RUN mkdir -p /app && chown -R node:node /app
#RUN mkdir -p /home/node/app/node_modules

# COPY ./proyecto/package*.json ./

USER node

# RUN npm install

# COPY --chown=node:node ./proyecto .
# COPY ./proyecto .

EXPOSE 3000

CMD [ "npm", "test" ]
