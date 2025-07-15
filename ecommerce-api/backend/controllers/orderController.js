const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let total = 0;
    // const orderItems = cart.items.map(item => {
    //   total += item.product.price * item.quantity;
    //   return {
    //     product: item.product._id,
    //     quantity: item.quantity
    //   };
    // });
    const orderItems = cart.items.map(item => ({
  product: {
    _id: item.product._id,
    name: item.product.name,
    category: item.product.category,
    price: item.product.price,
  },
  quantity: item.quantity,
}));


    const order = await Order.create({
      user: req.user.userId,
      items: orderItems,
      totalAmount: total
    });

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
