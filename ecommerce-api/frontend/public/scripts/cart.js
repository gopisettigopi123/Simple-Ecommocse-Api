document.addEventListener('DOMContentLoaded', () => {
  if (getUserRole() !== 'customer') {
    alert('Only customers can access the cart.');
    window.location.href = 'index.html';
    return;
  }

  loadCart();
});

async function loadCart() {
  const res = await fetch('/api/cart', {
    headers: { Authorization: 'Bearer ' + getToken() }
  });

  const cart = await res.json();
  const container = document.getElementById('cartItems');

  if (!cart || cart.items.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  let html = `
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  let grandTotal = 0;

  cart.items.forEach(item => {
    const total = item.quantity * item.product.price;
    grandTotal += total;

    html += `
      <tr>
        <td>${item.product.name}</td>
        <td>${item.product.category}</td>
        <td>₹${item.product.price}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" class="form-control"
            onchange="updateQuantity('${item._id}', this.value)">
        </td>
        <td>₹${total}</td>
        <td>
<button class="btn btn-sm btn-danger" onclick="removeItem('${item._id}')">Remove</button>
        </td>
      </tr>
    `;
  });

  html += `
      </tbody>
      <tfoot class="table-light">
        <tr>
          <td colspan="4" class="text-end fw-bold">Total</td>
          <td colspan="2" class="fw-bold">₹${grandTotal}</td>
        </tr>
      </tfoot>
    </table>
  `;

  container.innerHTML = html;
}

async function updateQuantity(itemId, quantity) {
  const res = await fetch(`/api/cart/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken()
    },
    body: JSON.stringify({ quantity: parseInt(quantity) })
  });

  if (res.ok) {
    loadCart();
  } else {
    alert('Failed to update quantity');
  }
}

async function removeItem(itemId) {
  const res = await fetch(`/api/cart/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + getToken() }
  });

  if (res.ok) {
    loadCart();
  } else {
    alert('Failed to remove item');
  }
}

async function placeOrder() {
  const confirmOrder = confirm('Are you sure you want to place this order?');
  if (!confirmOrder) return;

  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + getToken() }
  });

  if (res.ok) {
    alert('Order placed successfully!');
    window.location.href = 'orders.html';
  } else {
    alert('Failed to place order.');
  }
}
