export type CloudinaryResource = "image" | "video" | "raw";

const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "ditifn5y3";

export function cldUrl(
  publicId: string,
  resourceType: CloudinaryResource = "image",
  transforms = "",
): string {
  const id = publicId.replace(/^\/+/, "");
  const t = transforms ? `${transforms}/` : "";
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${t}${id}`;
}

/** Fill in public IDs after assets are uploaded to Cloudinary. */
export const ASSETS = {
  masjidMalam: cldUrl("zulaikha/600/masjid-malam", "image", "f_auto,q_auto,w_1400"),
  masjidInterior: cldUrl("zulaikha/600/masjid-interior", "image", "f_auto,q_auto,w_1400"),
  menara: cldUrl("zulaikha/600/menara", "image", "f_auto,q_auto,w_900"),
  jumpaMac: cldUrl("zulaikha/600/jumpa-mac", "image", "f_auto,q_auto,w_1200"),
  jumpaMacPlay: cldUrl("zulaikha/600/jumpa-mac-play", "image", "f_auto,q_auto,w_900"),
  jumpaFeb: cldUrl("zulaikha/600/jumpa-feb", "image", "f_auto,q_auto,w_900"),
  jumpaJul: cldUrl("zulaikha/600/jumpa-jul", "image", "f_auto,q_auto,w_1200"),
  videocall: cldUrl("zulaikha/600/videocall", "image", "f_auto,q_auto,w_900"),
  malamTablet: cldUrl("zulaikha/600/malam-tablet", "image", "f_auto,q_auto,w_1100"),
} as const;
