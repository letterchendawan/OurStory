import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Home679 from "@/components/Home679";
import "./road700.css";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Road to 700 · Zulaikha & Iqbal",
  description:
    "Kisah Zulaikha dan Iqbal, 28 Ogos hingga 15 November 2026, ditulis pada hari ke-679.",
};

export default function Home() {
  return (
    <div className={caveat.variable}>
      <Home679 />
    </div>
  );
}
