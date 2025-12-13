import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { ArticleSection } from "@/components/articles/ArticleLayout";

const articlesDir = path.join(process.cwd(), "content", "articles");

/**
 * Frontmatter tel qu’il existe dans tes fichiers .md
 * 👉 IMPORTANT :
 * - fm.slug est INFORMATIF
 * - L’URL vient UNIQUEMENT du nom de fichier
 */
export type ArticleFrontmatter = {
  title: string;
  subtitle?: string;
  slug?: string; // informatif uniquement (NON utilisé pour router)
  description?: string;
  date: string; // YYYY-MM-DD
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  cluster?: string;
  pillar?: string;
  main_keyword?: string;
  search_intent?: string;
  angle?: string;
  priority?: number;
  canonical_url?: string;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  slug: string; // ✅ slug D’URL = filename sans .md
  sections: ArticleSection[];
};

/**
 * Liste tous les fichiers markdown
 */
function getAllArticleFiles(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter((file) => file.endsWith(".md"));
}

/**
 * Slugify pour les ancres internes (## titres)
 */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Découpe un markdown en sections à chaque "## "
 */
function splitMarkdownIntoSections(content: string): ArticleSection[] {
  const blocks = content.split(/\n(?=##\s+)/);
  const sections: ArticleSection[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split("\n");
    let heading: string | undefined;
    let bodyLines: string[] = [];

    // Intro (avant le premier ##)
    if (index === 0) {
      const h1Index = lines.findIndex((l) => l.trim().startsWith("# "));
      bodyLines = h1Index !== -1 ? lines.slice(h1Index + 1) : lines;

      sections.push({
        id: "intro",
        heading: undefined,
        body: bodyLines.join("\n").trim(),
      });
    } else {
      const firstLine = lines[0].trim();
      if (firstLine.startsWith("##")) {
        heading = firstLine.replace(/^##\s*/, "").trim();
        bodyLines = lines.slice(1);
      } else {
        bodyLines = lines;
      }

      sections.push({
        id: heading ? slugify(heading) : undefined,
        heading,
        body: bodyLines.join("\n").trim(),
      });
    }
  });

  return sections.filter((s) => s.body && s.body.length > 0);
}

/**
 * ✅ Récupère un article par slug D’URL
 * 👉 slug = filename sans ".md"
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const files = getAllArticleFiles();

  for (const file of files) {
    const fileSlug = file.replace(/\.md$/, "");

    if (slug !== fileSlug) continue;

    const fullPath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as ArticleFrontmatter;
    const sections = splitMarkdownIntoSections(content);

    return {
      frontmatter,
      slug: fileSlug,
      sections,
    };
  }

  return null;
}

/**
 * ✅ Récupère tous les articles
 * 👉 slug = filename sans ".md"
 */
export async function getAllArticles(): Promise<Article[]> {
  const files = getAllArticleFiles();
  const articles: Article[] = [];

  for (const file of files) {
    const fullPath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as ArticleFrontmatter;
    const sections = splitMarkdownIntoSections(content);
    const fileSlug = file.replace(/\.md$/, "");

    articles.push({
      frontmatter,
      slug: fileSlug,
      sections,
    });
  }

  // Plus récent → plus ancien
  articles.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );

  return articles;
}
