const express = require('express');
const app = express();

app.use(express.json());

app.post('/saml/hook', (req, res) => {
    console.log("Received request at 'saml/hook': ", req);
    
    const sessionId = req.body?.data?.context?.session?.id;
    
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
