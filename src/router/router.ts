import { Router, Request, Response } from "express";

const router = Router()

export default router.get("/", (req: Request, res: Response) => {
  console.log("GET")
  res.send(req.query);
})