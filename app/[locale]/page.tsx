import { NavigationMenuDemo } from "@/components/NavBar"
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const t = useTranslations('Index');
  return (
    <>
    <div>
      <Link href="/fr" locale="fr">
        Français
      </Link>
      {" | "}
      <Link href="/en" locale="en">
        English
      </Link>
      <h1>{t('title')}</h1>
    </div>
    
    </>
  )
}
