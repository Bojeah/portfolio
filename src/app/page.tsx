import Link from "next/link";
import { ArrowUpRight, FolderCode, Terminal } from "lucide-react";
import Screenshot from "@/components/Screenshot";
import CopyEmail from "@/components/CopyEmail";
import AnimatedProject from "@/components/AnimatedProject";
import TerminalHero from "@/components/TerminalHero";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const stack = [
  {
    id: "01",
    area: "Frontend",
    items: "React 19, Next.js, TypeScript, Tailwind CSS",
  },
  {
    id: "02",
    area: "Backend",
    items: "NestJS, FastAPI (Python), ASP.NET Core (C#)",
  },
  { id: "03", area: "Data", items: "PostgreSQL, Prisma, SQLAlchemy, Supabase" },
  {
    id: "04",
    area: "Payments & Access",
    items: "Paystack, RBAC",
  },
  {
    id: "05",
    area: "Real Time & ML",
    items: "SignalR, real-time state sync, ONNX Runtime",
  },
  {
    id: "06",
    area: "Delivery",
    items: "CI/CD pipelines, Git workflows, Docker",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__body">
          <Reveal className="hero__content">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              ROOT // FULL-STACK DEVELOPER — LAGOS, NG
            </p>
            <h1 id="hero-title">
              I am a Full-stack Web and Mobile Developer.
            </h1>
            <p className="hero__lede">
              I am Benedict Ojeah, a final-year Computer Science student at
              Pan-Atlantic University. I build software from the UI down to the database schema and deployment pipeline.
            </p>
            <div className="actions">
              <a className="btn btn--solid" href="#work">
                ./inspect-work <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="btn btn--line" href={`mailto:${site.email}`}>
                mail --to benedict
              </a>
            </div>
          </Reveal>

          <TerminalHero />
        </div>

        <div className="route-board">
          <div className="wrap route-board__inner">
            <p>
              [STATUS] Available for software engineering roles & freelance
              builds
            </p>
            <p>[PRESS CTRL+K FOR QUICK COMMANDS]</p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="section section--surface"
        aria-labelledby="about-title"
      >
        <div className="wrap about">
          <div>
            <Reveal>
              <p className="section-tag">01 // SYSTEM_PROFILE</p>
              <h2 id="about-title">About</h2>
              <dl className="facts">
                <div>
                  <dt>LOCATION</dt>
                  <dd>Lagos, Nigeria</dd>
                </div>
                <div>
                  <dt>EDUCATION</dt>
                  <dd>
                    B.Sc. Computer Science (Final Year), Pan-Atlantic University
                  </dd>
                </div>
                <div>
                  <dt>CORE_FOCUS</dt>
                  <dd>
                    Full-stack web and mobile, Machine Learning, RBAC auth, real-time
                    telemetry
                  </dd>
                </div>
                <div>
                  <dt>LANGUAGES</dt>
                  <dd>TypeScript, Python, C#, SQL</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal className="prose" delay={0.1}>
            <p>
              I work on every part of a web application, the interface users interact with,
              the API, the database, and the CI pipeline.
            </p>
            <p>
              Although I can work on any part of a web application, I am more comfortable and enjoy frequently working on the Frontend of the application. I AM NOT A DESIGNER THOUGH
            </p>
            <p>
              Apart from building web applications, I also have had a few Machine learnign projects and I am hoping to add more projects to that catalog. I also enjoy testing the limits of os level scripting from time to time.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="work"
        className="section section--black"
        aria-labelledby="work-title"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-tag">02 // PROJECTS</p>
              <h2 id="work-title">Projects</h2>
            </div>
            <p className="section-sub">
              Click any Project for architecture decisions, screenshots, and
              post-mortems.
            </p>
          </div>

          <ol className="projects">
            {projects.map((project, index) => (
              <AnimatedProject
                key={project.slug}
                className={`project ${!project.cover ? "project--no-cover" : ""}`}
                delay={index * 0.08}
              >
                {project.cover ? (
                  <Screenshot
                    file={project.cover}
                    alt={`${project.name} interface preview`}
                    priority={index === 0}
                  />
                ) : (
                  <div
                    className="repo-card"
                    aria-label={`${project.name} repository preview`}
                  >
                    <div className="repo-card__top">
                      <span>// DESKTOP_RUNTIME_MODULE</span>
                      <span>[NO_WEB_PREVIEW]</span>
                    </div>
                    <div className="repo-card__body">
                      <FolderCode
                        size={28}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <p className="repo-card__slug">{project.slug}.sln</p>
                      <p className="repo-card__note">
                        Native Windows C# / ONNX real-time pipeline. Inspect
                        architecture and source directly on GitHub.
                      </p>
                    </div>
                    {project.repoUrl && (
                      <a
                        className="repo-card__link"
                        href={project.repoUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        git clone {project.repoUrl.replace("https://", "")}{" "}
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                )}

                <div className="project__text">
                  <div className="project__meta">
                    <span>INDEX // 0{index + 1}</span>
                    <span>YEAR // {project.year}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <ul
                    className="tags tags--compact"
                    aria-label="Technologies used"
                  >
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="project__links">
                    {project.caseStudy && (
                      <Link
                        className="btn btn--solid btn--sm"
                        href={`/projects/${project.slug}`}
                      >
                        <Terminal size={14} aria-hidden="true" /> Read More Details
                      </Link>
                    )}
                    {project.liveUrl && (
                      <a
                        className="btn btn--line btn--sm"
                        href={project.liveUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Live deploy{" "}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        className="btn btn--line btn--sm"
                        href={project.repoUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FolderCode size={14} aria-hidden="true" /> Source code
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedProject>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="stack"
        className="section section--surface"
        aria-labelledby="stack-title"
      >
        <div className="wrap">
          <p className="section-tag">03 // ENVIRONMENT_VARIABLES</p>
          <h2 id="stack-title">Technical Stack</h2>
          <dl className="stack">
            {stack.map((row) => (
              <div key={row.area} className="stack__card">
                <span className="stack__id">[{row.id}]</span>
                <dt>{row.area}</dt>
                <dd>{row.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="contact"
        className="section section--black"
        aria-labelledby="contact-title"
      >
        <div className="wrap contact">
          <p className="section-tag">04 // INITIATE_HANDSHAKE</p>
          <h2 id="contact-title">
            Have a role or a system that needs building?
          </h2>
          <a className="contact__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="actions">
            <a
              className="btn btn--solid"
              href={`mailto:${site.email}?subject=Hello%20Benedict`}
            >
              Send direct email <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <CopyEmail email={site.email} />
          </div>
        </div>
      </section>
    </>
  );
}

