import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const dir = path.join(process.cwd(), ".tmp-photos");
const files = [
  ["00032471-PHOTO-2026-08-08-20-05-33.jpg", "zulaikha/600/masjid-malam"],
  ["00032470-PHOTO-2026-08-08-20-05-33.jpg", "zulaikha/600/masjid-interior"],
  ["00032484-PHOTO-2026-08-08-20-07-00.jpg", "zulaikha/600/menara"],
  ["00002612-PHOTO-2025-03-07-22-13-41.jpg", "zulaikha/600/jumpa-mac"],
  ["00002609-PHOTO-2025-03-07-22-13-40.jpg", "zulaikha/600/jumpa-mac-play"],
  ["00006831-PHOTO-2026-02-25-22-00-04.jpg", "zulaikha/600/jumpa-feb"],
  ["00017708-PHOTO-2026-07-24-15-06-05.jpg", "zulaikha/600/jumpa-jul"],
  ["00035517-PHOTO-2026-08-12-16-53-06.jpg", "zulaikha/600/videocall"],
  ["00035786-PHOTO-2026-08-13-00-22-44.jpg", "zulaikha/600/malam-tablet"],
];

for (const [file, publicId] of files) {
  const result = await cloudinary.uploader.upload(path.join(dir, file), {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  console.log(publicId, result.secure_url);
}
