import { CirclesBackground } from ".//CirclesBackground";
import Logo from "../assets/paf.png";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-full overflow-hidden pt-8 sm:py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        <a href="/" aria-label="Home">
          <img src={Logo} className="mx-auto h-20 w-auto" />
        </a>
        <div className="relative mt-6 sm:mt-8">
          <CirclesBackground
            width="1090"
            height="1090"
            className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
          />
          <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-center text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
        <div className="-mx-4 mt-10 flex-auto bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24">
          {children}
        </div>
      </div>
    </main>
  );
}
