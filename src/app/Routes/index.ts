import { Router } from "express";
import { userRoutes } from "../modules/Users/user.route";
import { TimeSlotsRoutes } from "../modules/Slots/slots.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { orderRoutes } from "../modules/Order/Order.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/bookings",
    route: orderRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "",
    route: TimeSlotsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
