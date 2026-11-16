import { site } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p>
          <span className="status-dot" aria-hidden="true" />
          {site.name} // {site.location} // SYSTEM ONLINE
        </p>
        <p>
          <a href={site.github} rel="noopener noreferrer" target="_blank">
            [GitHub]
          </a>
          <a href={`mailto:${site.email}`}>[{site.email}]</a>
        </p>
      </div>
    </footer>
  );
}
