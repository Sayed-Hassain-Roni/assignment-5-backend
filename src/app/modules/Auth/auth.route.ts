import { Router } from "express";
import { AuthController } from "./auth.controller";
import validationRequest from "../../middlewares/validationRequest";
import { loginUserValidation } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validationRequest(loginUserValidation),
  AuthController.atuhLogin
);

export const AuthRoutes = router;
