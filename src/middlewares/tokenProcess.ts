import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const useAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    let jwtToken = req.get("Authorization")?.split(" ")[1];

    if (!jwtToken) {
      return res.status(403).send({ message: "Permission denied" });
    }

    if (!process.env.CLIENT_SECRET) {
      throw new Error("CLIENT_SECRET environment variable is not defined");
    }

    let jwtTokenDecoded = jwt.verify(jwtToken, process.env.CLIENT_SECRET);

    // jwtTokenDecoded should be of type JwtPayload
    if (typeof jwtTokenDecoded === "string") {
      throw new Error("Unexpected decoded jwt token type");
    }

    if (!jwtTokenDecoded.sub) {
      throw new Error("Jwt token has no sub field");
    }

    req.user = {
      id: jwtTokenDecoded.sub,
      authenticationToken: jwtTokenDecoded
    };

    next()
  }
}

export const verifyScope = (requiredScopes: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new Error("To use verifyScope middleware you must use useAuth before it");
    }

    const userScopes = req.user.authenticationToken.scopes.split(" ");

    userScopes.includes(requiredScopes)
      ? next()
      : res.status(403).send({ message: "Permission denied" });
  };
};
