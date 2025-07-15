document.addEventListener('DOMContentLoaded', () => {
  if (getUserRole() !== 'customer') {
    alert('Only customers can view orders.');
    window.location.href = 'index.html';
    return;
  }

  loadOrders();
});

async function loadOrders() {
  const res = await fetch('/api/orders', {
    headers: { Authorization: 'Bearer ' + getToken() }
  });

  const orders = await res.json();
  const container = document.getElementById('ordersList');

  if (!orders || orders.length === 0) {
    container.innerHTML = `<p>You have no orders yet.</p>`;
    return;
  }

  let html = '';

  orders.forEach(order => {
    html += `<h4>Order placed on ${new Date(order.createdAt).toLocaleString()}</h4>`;
    html += `
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
    `;

    let grandTotal = 0;

    order.items.forEach(item => {
      const product = item.product || {};
      const price = product.price || 0;
      const total = item.quantity * price;
      grandTotal += total;

      html += `
        <tr>
          <td>${product.name || 'N/A'}</td>
          <td>${product.category || '-'}</td>
          <td>₹${price}</td>
          <td>${item.quantity}</td>
          <td>₹${total}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
        <tfoot class="table-light">
          <tr>
            <td colspan="4" class="text-end fw-bold">Grand Total</td>
            <td class="fw-bold">₹${grandTotal}</td>
          </tr>
        </tfoot>
      </table><hr/>
    `;
  });

  container.innerHTML = html;
}

