const dialog = document.getElementById("video-dialog") as HTMLDialogElement | null;
const video = document.getElementById("demo-video") as HTMLVideoElement | null;
const fallback = document.getElementById("video-fallback");
const player = document.getElementById("video-player");
const playButton = document.getElementById("video-play");
const openers = Array.from(document.querySelectorAll<HTMLElement>("[data-open-video]"));

let lastTrigger: HTMLElement | null = null;
let restoreFocus = true;

const showFallback = () => {
  player?.classList.add("hidden");
  fallback?.classList.remove("hidden");
};

const closeDialog = (focusTrigger = true) => {
  if (!dialog?.open) return;
  restoreFocus = focusTrigger;
  dialog.close();
  video?.pause();
};

openers.forEach((opener) => {
  opener.addEventListener("click", () => {
    if (!dialog) return;
    lastTrigger = opener;
    restoreFocus = true;
    fallback?.classList.add("hidden");
    player?.classList.remove("hidden");
    playButton?.classList.remove("hidden");
    if (video) video.controls = false;
    if (!dialog.open) dialog.showModal();
  });
});

dialog?.querySelectorAll<HTMLElement>("[data-close-video]").forEach((button) => {
  button.addEventListener("click", () => closeDialog());
});

dialog?.querySelectorAll<HTMLElement>("[data-close-video-link]").forEach((link) => {
  link.addEventListener("click", () => closeDialog(false));
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

dialog?.addEventListener("close", () => {
  video?.pause();
  if (restoreFocus) lastTrigger?.focus();
});

playButton?.addEventListener("click", () => {
  if (!video) return;
  playButton.classList.add("hidden");
  video.controls = true;
  video.play().catch(showFallback);
});

video?.addEventListener("error", showFallback);
video?.querySelector("source")?.addEventListener("error", showFallback);
