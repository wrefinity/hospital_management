import OrderModel from "../models/orders.js";

class OrderService {
  constructor() {
    this.Order = OrderModel;
    this.populateUser =  {
      path:'user',
      select:'-password'
    }
  }

  // Create a new order
  async createOrder(object) {
    return await this.Order.create(object);
  }

  // Retrieve all orders
  async getAllOrders() {
    return await this.Order.find({}).populate(this.populateUser).populate({path:'drug'});
  }

  // Retrieve a order by ID
  async getOrderById(id) {
    return await this.Order.findById(id).populate(this.populateUser).populate({path:'drug'});
  }
  // retrieve one order
  async getOneOrder(object) {
    return await this.Order.findOne({...object}).populate(this.populateUser).populate({path:'drug'});
  }

  // Update a orders by ID
  async updateOrder(id, object) {
    return await this.Order.findByIdAndUpdate(id, object, { new: true });
  }

  // Delete a orders by ID
  async deleteOrder(id) {
    return await this.Order.findByIdAndUpdate(id, {isDeleted:true}, { new: true });;
  }
}

export default new OrderService();
