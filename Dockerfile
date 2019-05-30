FROM node:10.15.0

WORKDIR /usr/src/tilawati

COPY package.json /usr/src/tilawati

RUN npm --global config set user root && \
    npm install -g @adonisjs/cli
    
RUN npm install

COPY ./ ./

CMD ["./run.sh"]