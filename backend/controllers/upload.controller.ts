import { Request, Response } from "express"

export const upload = (req: Request, res: Response) => {
    res.send("Hello from upload route")
}

