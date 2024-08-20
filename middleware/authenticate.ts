import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

interface DecodedJWT {
  id: string;
  username: string;
  iat: number;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedJWT;

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.tokenData = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;
