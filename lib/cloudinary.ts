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
  // bgm: cldUrl("zulaikha/satie-gymnopedie-no-1", "video"),
} as const;
