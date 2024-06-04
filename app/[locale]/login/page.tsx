import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { login, signup } from "./actions";
import { UserAuthForm } from "./components/user-auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}


// export default function LoginPage() {
// 	return (
		// <form>
		// 	<label htmlFor="email">Email:</label>
		// 	<input id="email" name="email" type="email" required />
		// 	<label htmlFor="password">Password:</label>
		// 	<input id="password" name="password" type="password" required />
		// 	<button formAction={login}>Log in</button>
		// 	<button formAction={signup}>Sign up</button>
		// </form>
// 	);
// }

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <Image
            src="/images/bg-login.png" // Remplacez par le chemin de votre image
            alt="Background"
            layout="fill"
            objectFit="cover" // ou 'contain' selon vos besoins
            quality={100}
          />
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

            OPEN MARKET
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Sell your things in crypto, with trust and security&rdquo;
              </p>
              <footer className="text-sm">SMART BLOCKS</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              
            </div>
            
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}


