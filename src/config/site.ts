function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing ${name}. Copy .env.example to .env and set it.`);
  }
  return value;
}

export const site = {
  name: "FarmSys POS",
  domain: required("PUBLIC_SITE_URL", import.meta.env.PUBLIC_SITE_URL),
  phone: required("PUBLIC_PHONE", import.meta.env.PUBLIC_PHONE),
  phoneDisplay: required("PUBLIC_PHONE_DISPLAY", import.meta.env.PUBLIC_PHONE_DISPLAY),
  whatsappNumber: required("PUBLIC_WHATSAPP_NUMBER", import.meta.env.PUBLIC_WHATSAPP_NUMBER),
  supportHours: required("PUBLIC_SUPPORT_HOURS", import.meta.env.PUBLIC_SUPPORT_HOURS),
  video: {
    src: import.meta.env.PUBLIC_VIDEO_SRC ?? "/videos/farmsys-demo.mp4",
    poster: "/images/hero-pos.webp",
  },
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
