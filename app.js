// ============ Variables ============
const themeBtn = document.getElementById('themeBtn');
const htmlEl = document.documentElement;

// Gestion du thème sombre/clair
function toggleTheme() {
  if (htmlEl.getAttribute('data-theme') === 'dark') {
    htmlEl.setAttribute('data-theme', 'light');
    themeBtn.textContent = '🌙';
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
  }
  localStorage.setItem('theme', htmlEl.getAttribute('data-theme'));
}

themeBtn?.addEventListener('click', toggleTheme);

// Initialisation du thème depuis localStorage
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
})();

// ============ Générateur dynamique formulaire sur générateur.html ============

const docTypeSelect = document.getElementById('docType');
const docForm = document.getElementById('docForm');
const previewBox = document.getElementById('preview');
const previewBtn = document.getElementById('previewBtn');
const pdfBtn = document.getElementById('pdfBtn');

const docFields = {
  cv: [
    { label: 'Nom complet', id: 'fullName', type: 'text', required: true },
    { label: 'Email', id: 'email', type: 'email', required: true },
    { label: 'Téléphone', id: 'phone', type: 'tel', required: true },
    { label: 'Profil professionnel', id: 'profile', type: 'textarea', required: false },
    { label: 'Expériences (séparez par des sauts de ligne)', id: 'experience', type: 'textarea', required: false },
    { label: 'Compétences (séparez par des virgules)', id: 'skills', type: 'text', required: false },
  ],
  lettre: [
    { label: 'Nom complet', id: 'fullName', type: 'text', required: true },
    { label: 'Email', id: 'email', type: 'email', required: true },
    { label: 'Entreprise', id: 'company', type: 'text', required: true },
    { label: 'Poste visé', id: 'position', type: 'text', required: true },
    { label: 'Corps de la lettre', id: 'body', type: 'textarea', required: true },
  ],
  attestation: [
    { label: 'Nom complet', id: 'fullName', type: 'text', required: true },
    { label: 'Date de naissance', id: 'dob', type: 'date', required: true },
    { label: 'Objet de l’attestation', id: 'object', type: 'text', required: true },
    { label: 'Date de délivrance', id: 'issueDate', type: 'date', required: true },
  ],
  contrat: [
    { label: 'Nom employeur', id: 'employerName', type: 'text', required: true },
    { label: 'Nom employé', id: 'employeeName', type: 'text', required: true },
    { label: 'Poste', id: 'position', type: 'text', required: true },
    { label: 'Durée du contrat', id: 'duration', type: 'text', required: true },
    { label: 'Date de début', id: 'startDate', type: 'date', required: true },
  ],
};

function createField(field) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('form-group');

  const label = document.createElement('label');
  label.htmlFor = field.id;
  label.textContent = field.label;
  wrapper.appendChild(label);

  let input;
  if (field.type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 4;
  } else {
    input = document.createElement('input');
    input.type = field.type;
  }
  input.id = field.id;
  input.name = field.id;
  if (field.required) input.required = true;
  wrapper.appendChild(input);

  return wrapper;
}

function buildForm(type) {
  docForm.innerHTML = '';
  if (!docFields[type]) return;
  docFields[type].forEach(field => {
    docForm.appendChild(createField(field));
  });
}

function generatePreview(type, data) {
  let html = '';
  switch (type) {
    case 'cv':
      html = `
        <h2>CV - ${data.fullName}</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.phone}</p>
        <h3>Profil professionnel</h3>
        <p>${data.profile || '-'}</p>
        <h3>Expériences</h3>
        <p>${(data.experience || '-').replace(/\n/g, '<br>')}</p>
        <h3>Compétences</h3>
        <p>${data.skills || '-'}</p>
      `;
      break;
    case 'lettre':
      html = `
        <h2>Lettre de motivation - ${data.fullName}</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Entreprise:</strong> ${data.company}</p>
        <p><strong>Poste visé:</strong> ${data.position}</p>
        <h3>Corps de la lettre</h3>
        <p>${data.body.replace(/\n/g, '<br>')}</p>
      `;
      break;
    case 'attestation':
      html = `
        <h2>Attestation - ${data.fullName}</h2>
        <p><strong>Date de naissance:</strong> ${data.dob}</p>
        <p><strong>Objet:</strong> ${data.object}</p>
        <p><strong>Date de délivrance:</strong> ${data.issueDate}</p>
      `;
      break;
    case 'contrat':
      html = `
        <h2>Contrat de travail</h2>
        <p><strong>Employeur:</strong> ${data.employerName}</p>
        <p><strong>Employé:</strong> ${data.employeeName}</p>
        <p><strong>Poste:</strong> ${data.position}</p>
        <p><strong>Durée:</strong> ${data.duration}</p>
        <p><strong>Date de début:</strong> ${data.startDate}</p>
      `;
      break;
    default:
      html = "<p>Type de document inconnu.</p>";
  }
  previewBox.innerHTML = html;
}

// Sauvegarde et charge dernière génération dans localStorage
function saveDocument(type, data) {
  localStorage.setItem('lastDoc', JSON.stringify({ type, data }));
}
function loadDocument() {
  const last = localStorage.getItem('lastDoc');
  if (!last) return null;
  return JSON.parse(last);
}

// Initialisation formulaire et événements
if (docTypeSelect && docForm && previewBtn && pdfBtn) {
  buildForm(docTypeSelect.value);

  docTypeSelect.addEventListener('change', () => {
    buildForm(docTypeSelect.value);
    previewBox.innerHTML = '';
  });

  previewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(docForm);
    const data = {};
    for (const [key, val] of formData.entries()) {
      data[key] = val.trim();
    }
    generatePreview(docTypeSelect.value, data);
    saveDocument(docTypeSelect.value, data);
  });

  pdfBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const last = loadDocument();
    if (!last) {
      alert("Générez un aperçu avant de télécharger le PDF.");
      return;
    }
    import('./pdf.js').then(module => {
      module.generatePDF(last.type, last.data);
    });
  });

  // Charge dernier document auto au chargement
  window.addEventListener('load', () => {
    const last = loadDocument();
    if (last) {
      docTypeSelect.value = last.type;
      buildForm(last.type);
      // Remplit formulaire
      for (const key in last.data) {
        const el = document.getElementById(key);
        if (el) el.value = last.data[key];
      }
      generatePreview(last.type, last.data);
    }
  });
}

// Notification visiteur avec IP à l'admin via localStorage (simplifié)
function notifyAdminVisit(ip) {
  let visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
  if (!visitors.includes(ip)) {
    visitors.push(ip);
    localStorage.setItem('visitors', JSON.stringify(visitors));
  }
}
// Simuler IP (en vrai faudrait un Worker backend)
const fakeIp = '192.168.1.' + Math.floor(Math.random() * 255);
notifyAdminVisit(fakeIp);
