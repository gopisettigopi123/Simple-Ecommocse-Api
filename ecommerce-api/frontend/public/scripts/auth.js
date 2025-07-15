function getToken() {
  return localStorage.getItem('token');
}

function getUserRole() {
  const token = getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'login.html';
}

function isLoggedIn() {
  
  return !!getToken();
}

// Redirect to login if not logged in
if (!isLoggedIn() && window.location.pathname.endsWith('index.html')) {
  window.location.href = 'login.html';
}

