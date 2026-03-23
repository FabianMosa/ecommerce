const currentYear = new Date().getFullYear();

const footerLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Políticas" },
  { href: "#", label: "Términos" },
];

export function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t bg-white/80 py-6 text-xs text-zinc-500"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {currentYear} Fabian Store. Proyecto de portafolio, no es una tienda
          real.
        </p>
        <nav aria-label="Enlaces del pie de página">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
