import Head from 'next/head'
import Link from 'next/link'
import { getAllArticles } from '../../lib/articles'

export default function ArticlesPage({ articles }) {
  return (
    <>
      <Head>
        <title>衛教文章 | 毛兒中醫故事館</title>
        <meta name="description" content="周亞錚醫師的中醫衛教文章，讓你秒懂中醫知識。" />
      </Head>

      <nav className="nav">
        <div className="nav-logo">
          <Link href="/"><strong>毛兒中醫故事館</strong></Link>
          <span>馬光中醫 明華院 · 高雄左營</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/">首頁</Link></li>
          <li><Link href="/#about">關於我</Link></li>
          <li><Link href="/#services">服務項目</Link></li>
          <li><Link href="/articles">衛教文章</Link></li>
          <li><Link href="https://youtube.com/channel/UCp_HpjZhGSeiWlAjccYEU6w" target="_blank">YouTube</Link></li>
          <li><Link href="/#contact">預約看診</Link></li>
        </ul>
      </nav>

      <div className="articles-list-page">
        <div className="sec-eyebrow">衛教文章</div>
        <h1 className="sec-h2">所有文章</h1>

        {articles.length === 0 ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
            文章即將上線，敬請期待！
          </p>
        ) : (
          <div className="articles-list-grid">
            {articles.map(a => (
              <Link href={`/articles/${a.slug}`} key={a.slug} className="article-card">
                <div className="article-cover">
                  {a.cover && <img src={a.cover} alt={a.title} />}
                </div>
                <div className="article-body">
                  <span className="article-tag">{a.category}</span>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <div className="article-date">{a.date}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <strong>毛兒中醫故事館</strong>
        <p style={{ marginTop: '8px' }}>周亞錚醫師 · 馬光中醫診所 明華院</p>
        <small>© 2026 毛兒中醫故事館 · 保留一切權利</small>
      </footer>
    </>
  )
}

export async function getStaticProps() {
  const articles = getAllArticles()
  return { props: { articles } }
}
