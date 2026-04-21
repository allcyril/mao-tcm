import Head from 'next/head'
import Link from 'next/link'
import { getAllSlugs, getArticleBySlug } from '../../lib/articles'

export default function ArticlePage({ article }) {
  return (
    <>
      <Head>
        <title>{article.title} | 毛兒中醫故事館</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <nav className="nav">
        <div className="nav-logo">
          <Link href="/"><strong>毛兒中醫故事館</strong></Link>
          <span>馬光中醫 明華院 · 高雄左營</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/">首頁</Link></li>
          <li><Link href="/articles">衛教文章</Link></li>
          <li><Link href="/#contact">預約看診</Link></li>
        </ul>
      </nav>

      <div className="article-page">
        <Link href="/articles" style={{ fontSize: '13px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
          ← 返回所有文章
        </Link>
        <span className="article-page-tag">{article.category}</span>
        <h1>{article.title}</h1>
        <div className="article-meta">
          {article.date} · 周亞錚醫師
        </div>
        {article.cover && (
          <img
            src={article.cover}
            alt={article.title}
            style={{ width: '100%', borderRadius: '12px', marginBottom: '32px', maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>想了解更多或預約看診？</p>
          <Link href="/#contact" className="btn-primary">預約看診 →</Link>
        </div>
      </div>

      <footer className="footer">
        <strong>毛兒中醫故事館</strong>
        <p style={{ marginTop: '8px' }}>周亞錚醫師 · 馬光中醫診所 明華院</p>
        <small>© 2026 毛兒中醫故事館 · 保留一切權利</small>
      </footer>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllSlugs()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = await getArticleBySlug(params.slug)
  return { props: { article } }
}
