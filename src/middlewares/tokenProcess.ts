import jwt from "jsonwebtoken";

export const verifyScope = (scope) => {
  return (req, res, next) => {
    let access_token = req.get("Authorization").split(" ")[1];
    let scopes = jwt
      .verify(access_token, process.env.CLIENT_SECRET)
      ["scopes"].split(" ");

    scopes.includes(scope)
      ? next()
      : res.status(403).send({ message: "Permission denied" });
  };
};
