import Link from "next/link"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const t = useTranslations('Navbar');

  return (

    
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
        <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M2 12h4l3 9 3-9h4" />
              <circle cx="12" cy="4" r="2" />
            </svg>
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >OPEN MARKET
      </Link>
        </div>
      <Link
        href="/marketplace"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
      {t('marketplace')}
      </Link>
      <Link
        href="/createProduct"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('create')}
      </Link>
      
    </nav>
  )

}



function Package2Icon(props:any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
			<path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
			<path d="M12 3v6" />
		</svg>
	);
}