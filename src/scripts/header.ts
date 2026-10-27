const button = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const icon = document.getElementById("menu-icon");

const setOpen = (open: boolean) => {
  if (!button || !menu || !icon) return;
  menu.classList.toggle("hidden", !open);
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  icon.textContent = open ? "close" : "menu";
};

button?.addEventListener("click", () => {
  setOpen(menu?.classList.contains("hidden") ?? false);
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setOpen(false);
});
