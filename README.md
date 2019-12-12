# vent
A web application 
Dependencies:(to use write npm instal <insert Dependency>)
  +MongoDB URL, get it from the mongo web application by using the connect button
  +jsonwebtoken
  +JWT word
  +express
  +mangoose
  +cors
  +bcryptjs
  
Config:
  There are 4 files:
        1) JWT file which contain the password
        Example:
            module.exports = {
                  'secret': '<insert here>'
            }
  
        2) Main config file that chooses which database we will use development or deploy 
        Example:
            if (process.env.NODE_ENV === 'production') { module.exports = require('./keys_prod') } else { module.exports 
            require('./keys_dev') }
            
        3) file that has the mangoURL for the development database
        Example:
            module.exports = {
                mongoURI:'<insert here>'
            }

        4) file that has the mangoURL for the deploy database
        Example:
            module.exports = {
                  mongoURI: process.env.MONGO_URI
            }

     
Docker:
    There are 2 Dockerfiles of similar structure; one for the server and the other for the client.
    Here is an exampe of a docker file:
***********************************************************************************************************************************            
            FROM node:[insert node version here]
            WORKDIR [insert directory of the server or client files]
            COPY package.json [insert server file directory here]
            RUN npm install
            COPY . [insert server file directory here] 
            EXPOSE [insert port number here]
            CMD [ "npm","run","dev" if server else: "npm","start" for client]
************************************************************************************************************************************      

Docker-Compose.yml: As for docker compose there is only one docker compose file its main objective is to build the server into a container as a service and do the same for the client then run them both togther. Here is an example for a docker compose file:
**************************************************************************************************************************************
            version: [insert docker version here]
            services: 
                server:
                    container_name: [insert container name which will have the server inside it]
                    build: . [the dot here builds all the files in the main directory]
                    image: [desired image name]/[insert container_name here]
                    expose: 
                        - [port number u which to expose to be able to access the service]
                    environment: 
                        API_HOST: [server port number]
                        APP_SERVER_PORT: [server port number]
                    ports: 
                        - [server port output]:[server port input]         
                    command: [command that will run the server file]
                client:
                        container_name: [container name which will have client inside it]
                        build:
                            context: [directory which contains the files you need to build your client]
                            dockerfile: [name of the dockerfile in this directory]    
                        image: [image name]/[container_name here]    
                        environment: 
                            APP_CLIENT_PORT: [client port]
                        expose:
                            - [port number you which to expose to be able to access the service]    
                        ports: 
                            - "[client exposed port]:[server exposed port]"
                        command: [start command that will run client]
                        links:
                            - server
**************************************************************************************************************************************   
                
