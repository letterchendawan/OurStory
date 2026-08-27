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
];

for (const [file, publicId] of files) {
  const result = await cloudinary.uploader.upload(path.join(dir, file), {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  console.log(publicId, result.secure_url);
}
