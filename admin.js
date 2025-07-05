const ADMIN_USER = "ALGARENE";
const ADMIN_PASS = "ALGARENE098765";

function loginAdmin() {
  const user = document.getElementById('admin-username').value.trim();
  const pass = document.getElementById('admin-password').value.trim();
  const errorEl = document.getElementById('admin-error');

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    errorEl.textContent = "";
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('panel-section').classList.remove('hidden');
    document.getElementById('admin-name').textContent = user;
  } else {
    errorEl.textContent = "Identifiants incorrects.";
  }
}

function showVisitors() {
  const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
  const log = document.getElementById('admin-log');
  if (visitors.length === 0) {
    log.innerHTML = "<p>Aucun visiteur enregistré.</p>";
  } else {
    log.innerHTML = '<h4>Visiteurs récents (IP):</h4>' + visitors.map(ip => `<p>${ip}</p>`).join('');
  }
}

function clearStorage() {
  localStorage.clear();
  alert("localStorage vidé.");
  document.getElementById('admin-log').innerHTML = '';
}

function forceReload() {
  location.reload(true);
}

// Enregistre une nouvelle visite IP dans localStorage (à appeler depuis app.js)
function logVisitorIp(ip) {
  let visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
  visitors.push(ip);
  localStorage.setItem('visitors', JSON.stringify(visitors));
}
