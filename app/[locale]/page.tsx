import { NavBarFinal } from "@/components/NavBar";
import { WalletButton } from "@/components/wallet/index";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <>
      <NavBarFinal />
      <div>
        <Link href="/es" locale="es">
          Español
        </Link>
        {" | "}
        <Link href="/en" locale="en">
          English
        </Link>
        <h1>{t("title")}</h1>
        <WalletButton />
      </div>
    </>
  );
}
