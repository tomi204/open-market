// components/LanguageToggle.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import Link from "next/link";
export function LanguageToggle() {
    // Fonction pour changer de langue

    const setLanguage = (language: string) => {
    // Logique de changement de langue
    console.log(`Language set to ${language}`);
    // Ici, vous pouvez intégrer la logique de changement de langue, comme i18n
  };


  return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					{/* Icône ou texte pour le bouton de changement de langue */}
					<Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Languages className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Change</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Link href="/es" locale="es">
						Español
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href="/en" locale="en">
						English
					</Link>
				</DropdownMenuItem>
				{/* Ajoutez d'autres langues ici si nécessaire */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default LanguageToggle;
