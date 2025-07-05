// app.js : interactions, aperçu dynamique, sauvegarde localStorage

const form = document.getElementById('docForm');
const preview = document.getElementById('preview');

// Charger depuis localStorage au chargement de la page
window.addEventListener('load', () => {
  const savedDoc = localStorage.getItem('lastDoc');
  if (savedDoc) {
    try {
      const data = JSON.parse(savedDoc);
      form.nom.value = data.nom || '';
      form.type.value = data.type || '';
      form.description.value = data.description || '';
      updatePreview();
    } catch (e) {
      console.error('Erreur lecture localStorage:', e);
    }
  }
});

// Met à jour l'aperçu dès qu'un champ change
form.addEventListener('input', () => {
  updatePreview();
  saveToLocalStorage();
});

function updatePreview() {
  const nom = form.nom.value.trim();
  const type = form.type.value;
  const desc = form.description.value.trim();

  if (!nom || !type || !desc) {
    preview.innerHTML = '<em>Remplissez tous les champs pour voir l’aperçu.</em>';
    return;
  }

  preview.innerHTML = `
    <h3 style="color:#7f5af0;">${type.toUpperCase()}</h3>
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>Description :</strong><br>${escapeHtml(desc).replace(/\n/g, '<br>')}</p>
    <p style="font-style: italic; font-size: 0.9rem; color: #aaa;">
      Document généré avec ❤️ par DocGenie
    </p>
  `;
}

// Fonction d'échappement HTML pour éviter les injections XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Sauvegarde dans localStorage
function saveToLocalStorage() {
  const data = {
    nom: form.nom.value,
    type: form.type.value,
    description: form.description.value
  };
  localStorage.setItem('lastDoc', JSON.stringify(data));
}
