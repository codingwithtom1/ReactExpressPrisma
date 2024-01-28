import { Router } from 'express';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import { auth, AuthRequest } from '../middleware/auth';

import fs from 'fs';

dotenv.config();
const prisma = new PrismaClient({ log: ["query", "info"] });
const authRouter = Router();
//const key = process.env.SECRETKEY || "nokey";
const privatekey = fs.readFileSync('private.pem');


authRouter.get("/", (req, res) => {
   return res.json("OK-auth");
});

authRouter.post("/register", async (req, res) => {
   const hashvalue = await bcrypt.hash(req.body.password, 10);
   try {
      await prisma.user.create({
         data: {
            email: req.body.email,
            password: hashvalue,
            firstname: req.body.firstname,
            lastname: req.body.lastname
         },
      });
      res.status(201).send({ message: "User created successfully." });
   }
   catch (error) {
      res.status(500).send({ message: "Error creating user." });
   }
});

authRouter.get("/pingauth", auth, (req, res) => {
	return res.json("OK");
});

authRouter.post("/logout", auth, (req,res) => {
   res.clearCookie('token');
   return res.json("OK");

});

authRouter.post("/login", async (req, res) => {
   const user = await prisma.user.findUnique({
      where: {
         email: req.body.email
      }
   });
   if (user === null) {
      res.status(500).send({ message: "Invalid Login." });
   }
   else {
      if (await bcrypt.compare(req.body.password, user.password)) {
         // success!
         const token = jwt.sign(
            {
               userId: user.id,
               email: user.email,
               firstname: user.firstname,
               lastname: user.lastname
            },
            privatekey,
            {
               expiresIn: "30 days",
               algorithm: "PS512"
            }
         );
         res.cookie('token', token, { httpOnly: true });
         res
            .status(200)
            .json({
               success: true,
               data: {
                  userId: user.id,
                  email: user.email,
               },
            });
      }
      else {
         res.status(500).send({ message: "Invalid Login." });
      }
   }
});

export default authRouter;
