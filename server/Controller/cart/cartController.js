const pool = require('../../Config/db');

// ======================
// Add item to cart
// ======================
const addToCart = async (req, res) => {
  const { user_id, session_id, package_id, quantity = 1, custom_data } = req.body;

  if (!user_id && !session_id)
    return res.status(400).json({ success: false, message: 'user_id or session_id is required' });

  if (!package_id) return res.status(400).json({ success: false, message: 'package_id is required' });

  try {
    // Check if package exists
    const [pkg] = await pool.query('SELECT id FROM packages WHERE id = ?', [package_id]);
    if (!pkg.length) return res.status(404).json({ success: false, message: 'Package not found' });

    // Check if cart item already exists
    const [existing] = await pool.query(
      `SELECT * FROM cart WHERE ${user_id ? 'user_id = ?' : 'session_id = ?'} AND package_id = ?`,
      user_id ? [user_id, package_id] : [session_id, package_id]
    );

    if (existing.length) {
      // ✅ Updated quantity if item exists
      await pool.query('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [quantity, existing[0].id]);
    } else {
      await pool.query(
        'INSERT INTO cart (user_id, session_id, package_id, quantity, custom_data) VALUES (?, ?, ?, ?, ?)',
        [user_id || null, session_id || null, package_id, quantity, JSON.stringify(custom_data || {})]
      );
    }

    res.json({ success: true, message: 'Added to cart' });
  } catch (err) {
    console.error('DB ERROR in addToCart:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// Get cart items
// ======================
const getCart = async (req, res) => {
  const id = req.params.id;
  const type = req.query.type; // 'user' or 'session'

  try {
    const [cartItems] = await pool.query(
      `SELECT c.id, c.quantity, c.custom_data, p.name, p.price 
       FROM cart c 
       JOIN packages p ON c.package_id = p.id 
       WHERE ${type === 'user' ? 'c.user_id = ?' : 'c.session_id = ?'}`,
      [id]
    );

    res.json({ success: true, cart: cartItems });
  } catch (err) {
    console.error('DB ERROR in getCart:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ======================
// Update cart item quantity
// ======================
const updateCartItem = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'Request body is required' });
    }

    const { cartId, quantity } = req.body;

    if (!cartId || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid cartId or quantity' });
    }

    await pool.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId]);
    res.json({ success: true, message: 'Quantity updated' });
  } catch (err) {
    console.error('DB ERROR in updateCartItem:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// Remove cart item (updated to fix bad request issue)
// ======================
const removeCartItem = async (req, res) => {
  try {
    // ✅ Use URL param only for DELETE to avoid JSON body issues
    const { cartId } = req.params;

    if (!cartId) return res.status(400).json({ success: false, message: 'cartId is required' });

    const [result] = await pool.query('DELETE FROM cart WHERE id = ?', [cartId]);

    // ✅ Check if item existed
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    console.error('DB ERROR in removeCartItem:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// Clear cart
// ======================
const clearCart = async (req, res) => {
  const { user_id, session_id } = req.body;

  if (!user_id && !session_id)
    return res.status(400).json({ success: false, message: 'user_id or session_id is required' });

  try {
    await pool.query(
      `DELETE FROM cart WHERE ${user_id ? 'user_id = ?' : 'session_id = ?'}`,
      [user_id || session_id]
    );
    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    console.error('DB ERROR in clearCart:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================
// Merge guest cart into user cart
// ======================
const mergeCart = async (req, res) => {
  try {
    const userId = req.user?.id; // From auth middleware
    const items = req.body.items; // Array of { package_id, quantity, custom_data, session_id }

    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items must be an array' });

    for (const item of items) {
      const [pkg] = await pool.query('SELECT id FROM packages WHERE id = ?', [item.package_id]);
      if (!pkg.length) continue;

      const [existing] = await pool.query('SELECT * FROM cart WHERE user_id = ? AND package_id = ?', [userId, item.package_id]);

      if (existing.length) {
        await pool.query('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [item.quantity, existing[0].id]);
      } else {
        await pool.query(
          'INSERT INTO cart (user_id, session_id, package_id, quantity, custom_data) VALUES (?, ?, ?, ?, ?)',
          [userId, item.session_id || null, item.package_id, item.quantity, JSON.stringify(item.custom_data || {})]
        );
      }
    }

    const [updatedCart] = await pool.query(
      `SELECT c.id, c.quantity, c.custom_data, p.name, p.price 
       FROM cart c 
       JOIN packages p ON c.package_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );

    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error('DB ERROR in mergeCart:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem, // ✅ key update
  clearCart,
  mergeCart,
};
