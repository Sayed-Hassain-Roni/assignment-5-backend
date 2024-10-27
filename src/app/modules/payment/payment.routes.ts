import { Router } from "express";
import { paymentControler } from "./payment.controler";

const router = Router();

router.post("/confirmation", paymentControler.confirmationController);

export const paymentRoutes = router;
