import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Props = {
  file: string;
  alt: string;
  caption?: string;
  priority?: boolean;
};

// Shows /public/screens/<file> when it exists.
// While the file is missing it shows a clearly labelled frame instead of a broken image.
export default function Screenshot({ file, alt, caption, priority }: Props) {
  const exists = fs.existsSync(
    path.join(process.cwd(), "public", "screens", file),
  );

  return (
    <figure className="shot">
      {exists ? (
        <div className="shot__frame">
          <Image
            src={`/screens/${file}`}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 800px"
            className="shot__img"
          />
        </div>
      ) : (
        <div
          className="shot__missing"
          role="img"
          aria-label={`Screenshot to add: ${file}`}
        >
          <span>Screenshot to add</span>
          <code>public/screens/{file}</code>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

