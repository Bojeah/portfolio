import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FolderCode, Terminal } from "lucide-react";
import Screenshot from "@/components/Screenshot";
import MotionSection from "@/components/MotionSection";
import Reveal from "@/components/Reveal";
import { getProject, nextProject, projects } from "@/data/projects";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

// Build one static page for every project that has a case study.
export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const study = project.caseStudy;
  const next = nextProject(project.slug);
  const hasScreens = Boolean(study.screens && study.screens.length > 0);

  return (
    <article>
      <header className="case-head">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">
              <Link href="/#work" className="inline-flex items-center gap-2">
                <ArrowLeft size={14} aria-hidden="true" /> cd ../projects
              </Link>
            </p>
            <h1 className="page-title">{project.name}</h1>
            <p className="hero__lede">{project.summary}</p>

            <dl className="case-facts">
              <div>
                <dt>BUILT_FOR</dt>
                <dd>{study.builtFor}</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt>YEAR</dt>
                <dd>{project.year}</dd>
              </div>
            </dl>

            <div className="actions">
              {project.liveUrl && (
                <a
                  className="btn btn--solid"
                  href={project.liveUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open live deploy <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  className={
                    project.liveUrl ? "btn btn--line" : "btn btn--solid"
                  }
                  href={project.repoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FolderCode size={15} aria-hidden="true" /> View source code
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="section section--surface">
        <div className="wrap case-body">
          <MotionSection className="case-row" aria-labelledby="overview">
            <div>
              <p className="section-tag">01 // CONTEXT</p>
              <h2 id="overview">Overview</h2>
            </div>
            <div className="prose">
              {study.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="case-row" aria-labelledby="problem">
            <div>
              <p className="section-tag">02 // BOTTLENECK</p>
              <h2 id="problem">The problem</h2>
            </div>
            <div className="prose">
              <p>{study.problem}</p>
            </div>
          </MotionSection>

          <MotionSection className="case-row" aria-labelledby="features">
            <div>
              <p className="section-tag">03 // CAPABILITIES</p>
              <h2 id="features">Features</h2>
            </div>
            <div className="prose">
              {study.features.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="case-row" aria-labelledby="decisions">
            <div>
              <p className="section-tag">04 // ARCHITECTURE</p>
              <h2 id="decisions">Decisions that mattered</h2>
            </div>
            <dl className="decisions">
              {study.decisions.map((d) => (
                <div key={d.title}>
                  <dt>{d.title}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
          </MotionSection>

          {hasScreens ? (
            <MotionSection
              className="case-row case-row--wide"
              aria-labelledby="screens"
            >
              <div>
                <p className="section-tag">05 // VISUAL_TELEMETRY</p>
                <h2 id="screens">Screenshots</h2>
              </div>
              <div className="shots">
                {study.screens!.map((s) => (
                  <Screenshot
                    key={s.file}
                    file={s.file}
                    alt={s.caption}
                    caption={s.caption}
                  />
                ))}
              </div>
            </MotionSection>
          ) : (
            project.repoUrl && (
              <MotionSection
                className="case-row"
                aria-labelledby="source-block"
              >
                <div>
                  <p className="section-tag">05 // SOURCE_BINARY</p>
                  <h2 id="source-block">Source repository</h2>
                </div>
                <div className="repo-card">
                  <div className="repo-card__top">
                    <span>// NATIVE_DESKTOP_BUILD</span>
                    <span>[CLI_VERIFIED]</span>
                  </div>
                  <div className="repo-card__body">
                    <Terminal size={24} strokeWidth={1.6} aria-hidden="true" />
                    <p className="repo-card__slug">{project.slug}</p>
                    <p className="repo-card__note">
                      This project runs as a native Windows desktop executable
                      rather than a browser interface. Inspect the complete
                      source tree, ONNX inference pipeline, and audio synthesis
                      code on GitHub.
                    </p>
                  </div>
                  <a
                    className="repo-card__link"
                    href={project.repoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    git clone {project.repoUrl.replace("https://", "")}{" "}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </MotionSection>
            )
          )}

          <MotionSection className="case-row" aria-labelledby="tech">
            <div>
              <p className="section-tag">06 // DEPENDENCIES</p>
              <h2 id="tech">Technologies used</h2>
            </div>
            <ul className="tags">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </MotionSection>

          <MotionSection className="case-row" aria-labelledby="learned">
            <div>
              <p className="section-tag">07 // RETROSPECTIVE</p>
              <h2 id="learned">What I learned</h2>
            </div>
            <div className="prose">
              <ul>
                {study.learned.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </MotionSection>
        </div>
      </div>

      <section className="section section--yellow" aria-labelledby="next-title">
        <div className="wrap case-next">
          <p className="section-tag">NEXT_MODULE //</p>
          <h2 id="next-title" className="visually-hidden">
            Next project
          </h2>
          <Link className="case-next__link" href={`/projects/${next.slug}`}>
            {next.name}{" "}
            <ArrowUpRight
              size={28}
              style={{ display: "inline" }}
              aria-hidden="true"
            />
          </Link>
          <div className="actions">
            <a className="btn btn--solid" href={`mailto:${site.email}`}>
              Email me
            </a>
            <Link className="btn btn--line" href="/#work">
              Back to all work
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
