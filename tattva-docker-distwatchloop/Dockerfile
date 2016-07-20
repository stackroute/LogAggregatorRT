FROM mhart/alpine-node

# Create app directory
RUN mkdir -p /usr/src/app && mkdir -p /usr/src/app/logs/
WORKDIR /usr/src/app

#COPY . /usr/src/app/
#COPY package.json /usr/src/app/
#RUN npm install && npm install -g bower

#COPY bower.json /usr/src/app/
#RUN bower install

ADD . /usr/src/app/
RUN npm install && npm install -g bower && bower install

EXPOSE 9090

WORKDIR /usr/src/app
CMD [ "npm", "run", "dwatch" ]
