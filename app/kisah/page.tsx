import type { Metadata } from "next";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Kisah Awal · Zulaikha & Iqbal",
  description:
    "Sebuah kisah panjang yang disusun daripada perbualan sebenar, Mac 2025 – Ogos 2026.",
};

export default function Page() {
  return <Experience />;
}
