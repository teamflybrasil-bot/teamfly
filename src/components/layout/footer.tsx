import Link from "next/link";
import { siteConfig } from "@/lib/site";

/** Barra legal mínima: copyright + links de privacidade e termos. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-navy-950 text-white/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs sm:flex-row">
        <p>
          © {year} {siteConfig.name}. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          <Link href="/privacidade" className="hover:text-orange-400">
            Política de Privacidade
          </Link>
          <Link href="/termos" className="hover:text-orange-400">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
}
