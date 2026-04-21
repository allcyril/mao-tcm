import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDir = path.join(process.cwd(), 'content/articles')

export function getAllArticles() {
  if (!fs.existsSync(articlesDir)) return []
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  const articles = files.map(filename => {
    const slug = filename.replace('.md', '')
    const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
    const { data } = matter(raw)
    return { slug, ...data }
  })
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getArticleBySlug(slug) {
  const filepath = path.join(articlesDir, `${slug}.md`)
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return { ...data, slug, content: processed.toString() }
}

export function getAllSlugs() {
  if (!fs.existsSync(articlesDir)) return []
  return fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ params: { slug: f.replace('.md', '') } }))
}
