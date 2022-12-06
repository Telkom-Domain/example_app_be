const parseJwt = token => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
const verifyScope = scope => {
    return (req, res, next) => {
        let access_token = req.headers["domain-access-token"];
        let scopes = ((parseJwt(access_token).scopes).toString()).split(' ');        
        scopes.includes(scope) ? next() : res.status(403).send({ message: "Permission denied"});
    }
};

const tokenProcess = {
    verifyScope: verifyScope,
    parseJwt: parseJwt
};

module.exports = tokenProcess;