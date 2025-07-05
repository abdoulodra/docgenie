import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";

export function generatePDF(type, data) {
  const { jsPDF: JsPDF } = window.jspdf || jsPDF;
  const doc = new JsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  switch (type) {
    case "cv":
      doc.text(`CV - ${data.fullName}`, 20, 20);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Email: ${data.email}`, 20, 30);
      doc.text(`Téléphone: ${data.phone}`, 20, 38);
      doc.setFont("helvetica", "bold");
      doc.text("Profil professionnel", 20, 50);
      doc.setFont("helvetica", "normal");
      doc.text(splitText(doc, data.profile || "-", 20, 58, 170, 10), 20, 58);
      doc.setFont("helvetica", "bold");
      doc.text("Expériences", 20, 80);
      doc.setFont("helvetica", "normal");
      doc.text(splitText(doc, data.experience || "-", 20, 88, 170, 10), 20, 88);
      doc.setFont("helvetica", "bold");
      doc.text("Compétences", 20, 110);
      doc.setFont("helvetica", "normal");
      doc.text(splitText(doc, data.skills || "-", 20, 118, 170, 10), 20, 118);
      break;

    case "lettre":
      doc.text(`Lettre de motivation - ${data.fullName}`, 20, 20);
      doc.setFontSize(12);
      doc.text(`Email: ${data.email}`, 20, 30);
      doc.text(`Entreprise: ${data.company}`, 20, 38);
      doc.text(`Poste visé: ${data.position}`, 20, 46);
      doc.setFont("helvetica", "bold");
      doc.text("Corps de la lettre", 20, 60);
      doc.setFont("helvetica", "normal");
      doc.text(splitText(doc, data.body, 20, 68, 170, 10), 20, 68);
      break;

    case "attestation":
      doc.text(`Attestation - ${data.fullName}`, 20, 20);
      doc.setFontSize(12);
      doc.text(`Date de naissance: ${data.dob}`, 20, 30);
      doc.text(`Objet: ${data.object}`, 20, 38);
      doc.text(`Date de délivrance: ${data.issueDate}`, 20, 46);
      break;

    case "contrat":
      doc.text("Contrat de travail", 20, 20);
      doc.setFontSize(12);
      doc.text(`Employeur: ${data.employerName}`, 20, 30);
      doc.text(`Employé: ${data.employeeName}`, 20, 38);
      doc.text(`Poste: ${data.position}`, 20, 46);
      doc.text(`Durée: ${data.duration}`, 20, 54);
      doc.text(`Date de début: ${data.startDate}`, 20, 62);
      break;

    default:
      doc.text("Type de document inconnu", 20, 20);
  }

  doc.save(`${type}_${Date.now()}.pdf`);
}

function splitText(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(text, maxWidth);
  let offsetY = y;
  for (const line of lines) {
    doc.text(line, x, offsetY);
    offsetY += lineHeight;
  }
  return '';
}
