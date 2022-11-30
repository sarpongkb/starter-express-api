const express = require('express');
const app = express();

app.use(express.json());

app.post('/oauth/saml-hook', (req, res) => {
    console.log("Received request at '/oauth/saml-hook': ", req.body);
    
    const sessionId = req.body?.data?.context?.session?.id;
    
    console.log("sessionId: ", sessionId);
    
    res.status(200).json({ 
        "commands": [{
            "type": "com.okta.assertion.patch",
            "value": [{
                "op": "add",
                "path": "/claims/externalSessionId",
                "value": {
                    "attributes": {
                        "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                    },
                    "attributeValues":[{
                        "attributes": { "xsi:type": "xs:string" },
                        "value": sessionId,
                    }]
                }
            }]
        }]
    });
});

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.status(204).json({data: "Yo!"});
});

app.listen(process.env.PORT || 3000);
