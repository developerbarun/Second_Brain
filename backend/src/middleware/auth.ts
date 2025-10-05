import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
}

// ✅ Explicitly type as RequestHandler so Express accepts it
export const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  // Expect: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECREAT as string) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};










// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// interface AuthRequest extends Request {
//   userId?: string;
// }

// export const userMiddleware = (req : AuthRequest,res : Response,next : NextFunction) => {
//     const header = req.headers["authorization"];
//     if(!header){
//         res.status(401).json({ message: "No token provided" });
//         return;
//     }
//     // const decoded = jwt.verify(header as string,process.env.JWT_SECREAT as string);
//     // if(decoded){
//     //     //@ts-ignore
//     //     req.userId = decoded.id;
//     //     next();
//     // }else{
//     //     res.json(403).json({
//     //         message : "You are not logged in"
//     //     })
//     // }
//     try {
//         const decoded = jwt.verify(header, process.env.JWT_SECREAT as string) as { id: string };
//         req.userId = decoded.id; 
//         next();
//     } catch (error) {
//         res.status(403).json({ message: "Invalid token " + error });
//         return;
//     }
// }



