import { NavBarFinal } from "@/components/NavBar";
import { WalletButton } from "@/components/wallet/index";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavBarFinal />
      <Hero />
      <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
}
