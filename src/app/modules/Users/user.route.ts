import { Router } from "express";
import { UserController } from "./user.controller";
import validationRequest from "../../middlewares/validationRequest";
import { userValidationSchema } from "./user.vallidation";

const router = Router();

router.post(
  "/signup",
  validationRequest(userValidationSchema),
  UserController.createUser
);

export const userRoutes = router;
