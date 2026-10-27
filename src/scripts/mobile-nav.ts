const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-mobile-link]"));
const sections = links
  .map((link) => document.getElementById(link.getAttribute("data-mobile-link") ?? ""))
  .filter((section): section is HTMLElement => section !== null);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      links.forEach((link) => {
        const active = link.getAttribute("data-mobile-link") === visible.target.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}
