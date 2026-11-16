import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section section--yellow">
      <div className="wrap">
        <h1 className="page-title">That page does not exist.</h1>
        <p className="hero__lede">The link may be old or mistyped.</p>
        <div className="actions">
          <Link className="btn btn--solid" href="/">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
