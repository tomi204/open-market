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
			{...props}>
			<div className="relative z-20 flex items-center text-lg font-medium">
				<Link className="m-3" href="/">
					<Package2Icon className="h-6 w-6" />
				
				</Link>
				OPEN MARKET
			</div>
			<Link
				href="/marketplace"
				className="text-sm font-medium transition-colors hover:text-primary">
				{t("marketplace")}
			</Link>
			<Link
				href="/createProduct"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
				{t("create")}
			</Link>
		</nav>
	);
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