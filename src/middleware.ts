import { Request, Response, NextFunction } from 'express'

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).send()
  const [, user] = token.split(' ')
  if (user === 'admin') return next()
  return res.status(401).send()
}
