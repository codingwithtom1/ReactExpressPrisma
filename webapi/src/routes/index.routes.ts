import { Router } from 'express';
import { auth, AuthRequest } from '../middleware/auth';

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
	return res.json("OK");
});

indexRouter.get("/protected", auth, (req, res) => {
	const email = (req as AuthRequest).user.email;
	return res.json("You made it!" + email);
});

export default indexRouter;
