const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');

    // ✅ Clean up items with null products (deleted from DB)
    if (cart) {
      cart.items = cart.items.filter(item => item.product); // remove items where product is null
      await cart.save();
    }

    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [{ product: productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // 1. Find the cart for the current user
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // 2. Log current items for debugging
    console.log("🛒 Current cart items before removal:", cart.items);

    // 3. Check if item exists
    const itemExists = cart.items.some(item => item._id.toString() === itemId);
    if (!itemExists) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // 4. Remove the item manually using .filter()
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    // 5. Save and return updated cart
    await cart.save();
    console.log("✅ Cart updated after item removal:", cart.items);
    res.json({ message: 'Item removed successfully', cart });
  } catch (err) {
    console.error("❌ Error in removeCartItem:", err.message);
    res.status(500).json({ error: err.message });
  }
};





