document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
let currentPage = 1;
let totalPages = 1;
let searchTerm = '';

document.getElementById('searchInput').addEventListener('input', (e) => {
   searchTerm = e.target.value.trim();
  currentPage = 1;
  fetchProducts();
});

 
async function fetchProducts() {
  const res = await fetch(`/api/products?page=${currentPage}&limit=6&search=${encodeURIComponent(searchTerm)}`);
  const data = await res.json();

  const products = data.products || [];
  totalPages = data.totalPages || 1;

  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    console.log("Rendering product:", product);
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${product.category}</h6>
        <p>${product.description || ''}</p>
        <p class="fw-bold">₹${product.price}</p>
      </div>
    `;

    // role buttons (edit/delete or add to cart)
    const role = localStorage.getItem('role');
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer d-flex justify-content-between';

    if (role === 'admin') {
      cardFooter.innerHTML = `
        <button class="btn btn-sm btn-warning" onclick='openEditModal(${JSON.stringify(product)})'>Edit</button>
        <button class="btn btn-sm btn-danger" onclick='deleteProduct("${product._id}")'>Delete</button>
      `;
    } else {
      cardFooter.innerHTML = `
        <button class="btn btn-sm btn-primary" onclick='addToCart("${product._id}")'>Add to Cart</button>
      `;
    }

    card.appendChild(cardFooter);
    col.appendChild(card);
    productList.appendChild(col);
  
  console.log("✅ Product card added to DOM:", product.name);
});



  renderPagination();
}



// doubt
function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const createBtn = (label, page, disabled = false, active = false) => {
    const li = document.createElement('li');
    li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
    const btn = document.createElement('button');
    btn.className = 'page-link';
    btn.innerText = label;
    btn.onclick = () => {
      if (!disabled) {
        currentPage = page;
        fetchProducts();
      }
    };
    li.appendChild(btn);
    return li;
  };

  pagination.appendChild(createBtn('«', currentPage - 1, currentPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    pagination.appendChild(createBtn(i, i, false, i === currentPage));
  }

  pagination.appendChild(createBtn('»', currentPage + 1, currentPage === totalPages));
}

//doubt end
function getToken() {
  return localStorage.getItem('token');
}



async function addToCart(productId) {
  const token = getToken();
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ productId, quantity: 1 })
  });

  if (res.ok) {
    alert('Added to cart!');
  } else {
    alert('Error adding to cart.');
  }
}

async function deleteProduct(productId) {
  const token = getToken();
  const res = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  if (res.ok) {
    alert('Product deleted.');
    fetchProducts();
  } else {
    alert('Error deleting product.');
  }
}
let selectedProduct = null;
let editModalInstance;

// let editModalInstance;

function openEditModal(product) {
  console.log('🛠️ Opening Edit Modal for:', product); // ✅ debug

  document.getElementById('edit-id').value = product._id;
  document.getElementById('edit-name').value = product.name;
  document.getElementById('edit-category').value = product.category;
  document.getElementById('edit-description').value = product.description;
  document.getElementById('edit-price').value = product.price;

  const modalEl = document.getElementById('editModal');
  editModalInstance = new bootstrap.Modal(modalEl);
  editModalInstance.show();
}


document.getElementById('editProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('edit-id').value;
  const updatedProduct = {
    name: document.getElementById('edit-name').value,
    category: document.getElementById('edit-category').value,
    description: document.getElementById('edit-description').value,
    price: parseFloat(document.getElementById('edit-price').value)
  };

  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(updatedProduct)
  });

  if (res.ok) {
    alert('✅ Product updated successfully!');
    editModalInstance.hide();
    fetchProducts();
  } else {
    const data = await res.json();
    alert('❌ Failed to update product: ' + (data.message || res.statusText));
  }
});




