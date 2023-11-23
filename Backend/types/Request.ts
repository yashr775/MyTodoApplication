
declare namespace Express {
    export interface Request {
      user: {
        _id: number
        email: string
        password: string
        token: string
      }
    }
  }