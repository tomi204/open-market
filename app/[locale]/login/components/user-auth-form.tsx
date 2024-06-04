"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { login, signup } from "@/app/[locale]/login/actions";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}
	
	
	return (
		<form>
			<div className={cn("grid gap-6", className)} {...props}>
				<label htmlFor="email" className="text-sm text-muted-foreground">
					Email
				</label>
				<input
					className="text-sm text-muted-foreground"
					id="email"
					name="email"
					type="email"
					required
				/>
				<label htmlFor="email" className="text-sm text-muted-foreground">
					Password
				</label>
				<input
					className="text-sm text-muted-foreground"
					id="password"
					name="password"
					type="password"
					required
				/>

				<Button
					variant="outline"
					type="submit"
					formAction={login}>
					Log in
				</Button>
				<Button
					variant="outline"
					type="submit"
					formAction={signup }>
					Sign up
				</Button>
				<Button variant="outline" type="button" disabled={isLoading}>
					{isLoading ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Icons.google className="mr-2 h-4 w-4" />
					)}{" "}
					Connection with Google
				</Button>
			</div>
		</form>
	);
}
