import { whatsappUrl } from "../config/site";

const form = document.getElementById("demo-form");
const statusEl = document.getElementById("demo-status");
const submitButton = document.getElementById("demo-submit");

submitButton?.removeAttribute("hidden");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;

  const data = new FormData(form);
  const lines = [
    "Hola FarmSys POS, quiero solicitar una demo y una cotización.",
    `Nombre: ${data.get("nombre") ?? ""}`,
    `Farmacia: ${data.get("farmacia") ?? ""}`,
    `Ciudad: ${data.get("ciudad") ?? ""}`,
    `Cajas: ${data.get("cajas") ?? ""}`,
    `Sucursales: ${data.get("sucursales") ?? ""}`,
    `WhatsApp: ${data.get("whatsapp") ?? ""}`,
  ];
  const email = String(data.get("email") ?? "").trim();
  if (email) lines.push(`Correo: ${email}`);
  lines.push("Origen: Landing Page FarmSys");

  const url = whatsappUrl(lines.join("\n"));

  if (statusEl) {
    statusEl.textContent = "Abriendo WhatsApp con tu solicitud…";
    statusEl.classList.remove("hidden");
  }

  window.location.href = url;
});
