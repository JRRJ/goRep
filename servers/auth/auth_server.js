const express = require('express');
const authServer = express();

authServer.use(express.static(__dirname + '/../../auth_src'));
  
authServer.listen(4000, () => { console.log('AUTHENTICATION SERVICE LISTENING ON PORT 4000')});