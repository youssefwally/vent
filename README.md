# vent
A web application 
Dependencies:
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

Docker-Compose:
