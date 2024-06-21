import { Router } from "express";
import OrderRepo from "../controllers/orders.js";
import AuthenticateUser from "../middlewares/routeAuth.js"


class OrderRouter {

    constructor() {
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.post('/place', AuthenticateUser.protect, OrderRepo.placeOrder.bind(OrderRepo))
        this.router.get('/', AuthenticateUser.protect, OrderRepo.getOrders.bind(OrderRepo))
        this.router.patch('/approve/:orderId', AuthenticateUser.protect, OrderRepo.approveOrder.bind(OrderRepo))
        this.router.patch('/decline/:orderId', AuthenticateUser.protect, OrderRepo.declineOrder.bind(OrderRepo))
    }
}

export default new OrderRouter().router