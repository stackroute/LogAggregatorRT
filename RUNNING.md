# Running Tattva on Ubuntu (64-bit) or Linux platform

## Prerequisite 
- Docker
- Docker Compose 
- Git Logger or the source of logs for Tattva

## Installing Docker on your ubuntu 
This is same, even if you are running it in a virtualbox

Do these below from a terminal window of ubuntu

- Docker is a OS Based virtulisation tool, which can create process based, micro virtual machines known as containers, which you can use to run your apps in a isolated environment and ship it, scale the app easily. So go ahead install it and try it out. You can learn more about Docker from [here](https://aucouranton.com/2014/06/13/linux-containers-parallels-lxc-openvz-docker-and-more/)  

- Make sure you have your apt sources latest, if not refer to [this](https://docs.docker.com/engine/installation/linux/ubuntulinux/)  to update the apt sources before installing docker

- Assuming you have latest apt sources, below command should install the docker engine

		sudo apt-get install docker-engine

- Go ahead and test if docker is working by running below command, which should print Hello world on your terminal 

		sudo docker run hello-world

## Installing docker-compose

- Docker compose is used to build & run related services of your app as docker containers, it allows you to easily specify the different services of your app, dependencies among them and how these containers are related to one another

- Docker compose works based on a YAML script file, in which you will specify the services and their dependencies 

- To install docker-compose, which is a single binary, you can download and place it in appropriate folder locations and give the permissions, follow below to the same, you can also refer to it [here](https://docs.docker.com/compose/install/) 

- Follow the instructions from above link and test docker-compose is installed by running below command

		sudo docker-compose --version
	
- Above should print something like below

		$ sudo docker-compose --version
		docker-compose version 1.7.1, build unknown


## Git logger

You also need a source for logs, currently git commit logs are available for this from another project which is at https://github.com/stackroute/Git-Log-Fetcher

- Checkout this project locally using below command, from your desired folder or directory
		
		git clone https://github.com/stackroute/Git-Log-Fetcher

- Above will create a folder Git-Log-Fetcher, get inside this directory

		cd Git-Log-Fetcher

- Create a logs folder, which by default ignored by gitignore

		mkdir logs
		
- This project too runs as a Docker container, however first we need to build the docker image, we will not be running this image directly, instead tattva will run this image. To build this image, execute below command 

		sudo docker-compose build -d
	
 > PS: -d flag is to build in the background, you can also choose to not run it in background, in which case do not pass the -d flag

- Once the build is complete, you can verify the build by running below command

		sudo docker images

- The above command should show the images it pulled (if you refer to any Docker images from the Docker hub, those images are downloaded locally, which is known as pulling of docker image from remote server) as well built (you can build docker images using Dockerfile, which is how you define a docker image) just now, some thing like below
	
		REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
		tattva/tattva-git-logger           v0.1.0              0ce4a116b2b1        1 minute ago        202.4 MB
		mhart/alpine-node                  latest              fffb49210fed        1 minute ago        47.56 MB
		fluent/fluentd                     latest-onbuild      56346b4a509e        1 minute ago        38.5 MB

- If you see the tattva git logger in the above, then you completed this step successfully, proceed to building tattva

## Building & Running Tattva
Once you have required prerequisites, proceed to checkout Tattva project to your local system from a terminal

- Execute below command to clone the project locally, from your desired folder or directory
		
		git clone http://github.com/stackroute/LogAggregatorRT 

 > PS: To checkout from a specific branch, you can pass -b <branch name> as the option i.e., like below to clone from branch 'devbranch_v1'
	
		git clone http://github.com/stackroute/LogAggregatorRT -b devbranch_v1 
 
- Then execute below command

		cd LogAggregatorRT 

- PS: All git commands, docker command should always be executed from the root folder of your project

- Create a logs folder, which by default ignored by gitignore

		mkdir logs

- Then install npm and bower modules, which are needed for the project to run (especially bower modules, as they are not installed from inside of the docker container unlike node modules)

		sudo npm install --no-bin-links
		sudo bower install --allow-root
		
	> PS: If you get any error in installing these modules, please resole them before proceeding

- Execute below command to build the docker images of Tattva services, using below command

		sudo docker-compose build -d

- Once above is complete, you should be able to see the images built by running command 

		sudo docker images 

- The above should print something like below, notice the git logger image which we built earlier too should exist
	
		REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
		tattva/tattva-watchprocessor       v0.1.0              458ff376c4b0        15 hours ago        338.3 MB
		tattva/tattva-webapp               v0.1.0              ad7b9e180662        15 hours ago        338.3 MB
		tattva/tattva-git-logger           v0.1.0              0ce4a116b2b1        15 hours ago        202.4 MB
		tattva/tattva-watchloop            v0.1.0              e7c157edb2bd        15 hours ago        338.3 MB
		fluentd/fluentd-websocket-output   v0.1.0              59a1fba80b7a        15 hours ago        199.3 MB
		mhart/alpine-node                  latest              fffb49210fed        3 weeks ago         47.56 MB
		fluent/fluentd                     latest-onbuild      56346b4a509e        5 weeks ago         38.5 MB
		mvertes/alpine-mongo               latest              7f179837fed9        3 months ago        136.5 MB
		smebberson/alpine-redis            latest              993218b3f7f2        3 months ago        13.23 MB

- If you can see the above, then you are almost done with all the steps of building, now you are ready to run the Tattva

- Run tattva as a set of docker containers, using below command, refer docker-compose.yml to know and understand the services and their relation

		sudo docker-compose up -d

 > PS: -d flag is to run the containers in the background, please use the -d flag

- Now run below command to check if all services are running

		sudo docker ps -a

- If the services are running, you should be able to access Tattva from a browser at http://localhost:8080

- If you are running Tattva for first time, you should signup and then use the rest of the features 