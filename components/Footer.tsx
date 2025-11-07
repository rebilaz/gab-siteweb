type FooterProps = {
  year: number;
  scrollTo: (selector: string) => void;
};

const Footer: React.FC<FooterProps> = ({ year, scrollTo }) => {
  const handleScrollClick =
    (selector: string) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollTo(selector);
    };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-5 text-[0.78rem] text-text-muted">
      <div className="w-full max-w-site mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>
            © {year} Systèmes &amp; Dashboards — [Ton prénom]. Tous droits
            réservés.
          </p>
          <div className="flex gap-4">
            <a
              href="#top"
              onClick={handleScrollClick("top")}
              className="hover:underline"
            >
              Haut de page
            </a>
            <a
              href="#contact"
              onClick={handleScrollClick("#contact")}
              className="hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
