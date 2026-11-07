import type { CollectionEntry } from 'astro:content';
import { css } from 'styled-system/css';

interface ProjectCardProps {
  project: CollectionEntry<'projects'>['data'];
}

/** Rendered to static HTML at build time; ships no JavaScript. */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, summary, tech, repo, url } = project;

  return (
    <article
      className={css({
        p: '5',
        rounded: 'lg',
        borderWidth: '1px',
        borderColor: 'border',
        bg: 'surface',
      })}
    >
      <h3 className={css({ fontWeight: 'semibold', fontSize: 'lg' })}>{title}</h3>
      <p className={css({ color: 'muted', mt: '1' })}>{summary}</p>
      <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', mt: '3' })}>
        {tech.map((t) => (
          <li
            key={t}
            className={css({
              fontFamily: 'mono',
              fontSize: 'xs',
              px: '2',
              py: '0.5',
              rounded: 'sm',
              borderWidth: '1px',
              borderColor: 'border',
            })}
          >
            {t}
          </li>
        ))}
      </ul>
      {(repo || url) && (
        <p className={css({ display: 'flex', gap: '4', mt: '4', fontSize: 'sm' })}>
          {url && <a href={url}>Live site →</a>}
          {repo && <a href={repo}>Source →</a>}
        </p>
      )}
    </article>
  );
};
