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

const dir = path.join(process.cwd(), ".tmp-photos", "679");
const files = [
  ["00076157-PHOTO-2026-10-03-16-11-31.jpg", "zulaikha/679/kereta-okt"],
  ["00088310-PHOTO-2026-10-18-23-11-00.jpg", "zulaikha/679/bunga-pertama"],
  ["00095133-PHOTO-2026-10-25-20-27-46.jpg", "zulaikha/679/cermin"],
  ["00103365-PHOTO-2026-11-01-17-07-13.jpg", "zulaikha/679/jambangan"],
  ["00103480-PHOTO-2026-11-01-17-51-05.jpg", "zulaikha/679/makan-nov"],
];

for (const [file, publicId] of files) {
  const result = await cloudinary.uploader.upload(path.join(dir, file), {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  console.log(publicId, result.secure_url);
}
