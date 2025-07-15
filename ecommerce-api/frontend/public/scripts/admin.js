document.addEventListener('DOMContentLoaded', () => {
  const role = getUserRole();
  if (role !== 'admin') {
    alert('Only admins can access this page.');
    window.location.href = 'index.html';
  }

  const form = document.getElementById('productForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const category = document.getElementById('category').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getToken()
        },
        body: JSON.stringify({ name, category, description, price })
      });

      if (res.ok) {
        alert('Product added successfully');
        window.location.href = 'index.html';
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add product.');
      }
    });
  }
});
