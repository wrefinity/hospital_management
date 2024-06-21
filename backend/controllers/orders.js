import Order, {orderEnum} from '../models/orders.js';
import Drug from '../models/drugs.js';
import logActivity from "../utils/logs.js";
import OrderServices from '../services/orders.js';
import UserServices from '../services/users.js';


class OrderController {

    constructor(){
        this.orderServices = OrderServices
        this.userServices = UserServices
    }

    // Place an Order
    async placeOrder(req, res) {
        try {
            const { productId:drugId, quantity } = req.body;
            const userId = req.user._id
            // Check if drugId, quantity, and userId exist
            if (!drugId || !quantity || !userId) {
                return res.status(400).json({ error: 'Missing required fields in the request body or kindly login' });
            }
            // Check if the drug exists
            const drug = await Drug.findById(drugId);
            if (!drug) {
                return res.status(404).json({ message: 'drug not found' });
            }
            // Check if the requested quantity is available in the inventory
            if (quantity > drug.quantity) {
                return res.status(400).json({ message: 'Insufficient quantity in the inventory' });
            }

            // Check if the user exists
            const user = await this.userServices.getUserById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Deduct the ordered quantity from the inventory
            drug.quantity -= quantity;
            await drug.save();

            // Create the order
            const order = new Order({
                user: userId,
                drug: drugId,
                quantity
            });
            await order.save();
            await logActivity('Placed order', userId, `Order for drug: ${drug?.name}, quantity : ${quantity}` )
            return res.status(201).json({ message: 'Order placed successfully', order });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
    //get orders 
    async getOrders(_, res) {
        const orders = await this.orderServices.getAllOrders();
        res.status(200).json({ orders });
    }
    async approveOrder(req, res) {
        try {
            const userId = req.user._id;
            const { orderId } = req.params;
            if(!orderId) return res.status(404).json({message:'kindly supply the order id'})

            // Find the order by its ID
            const order = await this.orderServices.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Update the status to "approved"
            order.status = orderEnum[1];
            await order.save();
            await logActivity('Order Approval', userId, `Order for drug: ${order?.drug?.name} approved for the user ${order?.user?.username}` )
            return res.status(200).json({ message: 'Order approved successfully', order });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    async declineOrder(req, res) {
        try {
            const { orderId } = req.params;

            if(!orderId) return res.status(404).json({message:'kindly supply the order id'})

            // Find the order by its ID
            const order = await Order.findById(orderId).populate('user').populate('drug');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            // Update the status to "declined"
            order.status = orderEnum[2];
            await order.save();
            await logActivity('Order Decline', userId, `Order for drug: ${order?.drug?.name} declined for the user ${order?.user?.username}` )
            res.status(200).json({ message: 'Order declined successfully', order });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }

    }


}

export default new OrderController();