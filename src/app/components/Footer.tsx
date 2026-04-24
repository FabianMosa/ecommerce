// Pie de pagina con ano dinamico y enlaces placeholder para redes/politicas (sustituir por URLs reales).
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
      className="border-t border-slate-200 bg-white/90 py-6 text-xs text-slate-500"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {currentYear} Tienda Online. Desarrollado por{" "}
          {/* Enlace destacado del autor para dar mayor visibilidad en el pie. */}
          <a
            href="https://www.linkedin.com/in/bernardo-morales-848517310/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm font-semibold text-gold-500 underline decoration-gold-500/60 underline-offset-4 transition-colors duration-200 hover:text-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Bernardo Morales
          </a>
          . Todos los derechos reservados.
        </p>
        <nav aria-label="Enlaces del pie de página">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
