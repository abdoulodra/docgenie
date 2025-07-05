// Thème clair/sombre
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });

  // Restaurer le thème
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
}

// Aperçus de documents
const previews = {
  cv: `
    <h3>Jean Dupont</h3>
    <p><strong>Email :</strong> jean.dupont@email.com</p>
    <p><strong>Compétences :</strong> HTML, CSS, JavaScript</p>
    <p><strong>Expériences :</strong> Développeur Frontend chez WebTech</p>
  `,
  lettre: `
    <p>Madame, Monsieur,</p>
    <p>Je vous écris afin de vous soumettre ma candidature pour le poste de développeur web...</p>
    <p>Veuillez agréer l'expression de mes salutations distinguées.</p>
  `,
  attestation: `
    <p>Nous certifions que Monsieur Jean Dupont a travaillé dans notre entreprise du 01/01/2022 au 01/06/2024.</p>
    <p>Fait à Paris, le 05/07/2025.</p>
  `,
  contrat: `
    <p>Ce contrat est établi entre :</p>
    <ul>
      <li><strong>Employeur :</strong> TechCorp</li>
      <li><strong>Employé :</strong> Jean Dupont</li>
      <li><strong>Poste :</strong> Développeur</li>
    </ul>
  `
};

function openPreview(type) {
  const modal = document.getElementById('previewModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  switch (type) {
    case 'cv':
      modalTitle.textContent = "Exemple de CV";
      modalBody.innerHTML = previews.cv;
      break;
    case 'lettre':
      modalTitle.textContent = "Exemple de Lettre";
      modalBody.innerHTML = previews.lettre;
      break;
    case 'attestation':
      modalTitle.textContent = "Exemple d'Attestation";
      modalBody.innerHTML = previews.attestation;
      break;
    case 'contrat':
      modalTitle.textContent = "Exemple de Contrat";
      modalBody.innerHTML = previews.contrat;
      break;
  }

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('previewModal').classList.add('hidden');
}
