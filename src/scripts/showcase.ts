const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".tab-btn[data-tab]"));
const panels = tabs.map((tab) => document.getElementById(`view-${tab.dataset.tab}`));

const active = ["bg-primary", "text-on-primary"];
const idle = ["bg-surface-container", "text-on-surface", "hover:bg-surface-container-high"];

function activate(name: string, focusTab = false) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    tab.classList.remove(...active, ...idle);
    tab.classList.add(...(isActive ? active : idle));
    if (isActive && focusTab) tab.focus();
  });

  tabs.forEach((tab, index) => {
    const panel = panels[index];
    if (!panel) return;
    const isActive = tab.dataset.tab === name;
    panel.classList.toggle("hidden", !isActive);
    panel.classList.toggle("flex", isActive);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activate(tab.dataset.tab ?? ""));

  tab.addEventListener("keydown", (event) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    activate(tabs[next].dataset.tab ?? "", true);
  });
});
