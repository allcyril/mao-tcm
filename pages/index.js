import Head from 'next/head'
import Link from 'next/link'
import { getAllArticles } from '../lib/articles'
import { getLatestVideos } from '../lib/youtube'

const SITE = {
  name: '毛兒中醫故事館',
  doctor: '周亞錚醫師',
  tagline: '讓身體自然回到最好的狀態',
  desc: '專精中醫減重、兒科調理、美顏針灸，以溫和有效的方式，守護每一個家庭。',
  phone: '(07) 550-6558',
  address: '高雄市左營區明華一路 192 號 1 樓',
  clinicName: '馬光中醫診所 明華院',
  fb: 'https://www.facebook.com/profile.php?id=61567507704102',
  yt: 'https://youtube.com/channel/UCp_HpjZhGSeiWlAjccYEU6w',
  ig: 'https://www.instagram.com/3maography/',
  drive: 'https://drive.google.com/drive/folders/1H3SSYjL1XDq2nnOvow5ihHgcNP00YBME',
}

export default function Home({ articles, videos }) {
  return (
    <>
      <Head>
        <title>{`${SITE.name} | ${SITE.doctor}`}</title>
        <meta name="description" content={SITE.desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content={`${SITE.name} | ${SITE.doctor}`} />
        <meta property="og:description" content={SITE.desc} />
        <meta property="og:type" content="website" />
      </Head>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <strong>{SITE.name}</strong>
          <span>{SITE.clinicName} · 高雄左營</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/">首頁</Link></li>
          <li><Link href="#about">關於我</Link></li>
          <li><Link href="#services">服務項目</Link></li>
          <li><Link href="/articles">衛教文章</Link></li>
          <li><Link href={SITE.yt} target="_blank">YouTube</Link></li>
          <li><Link href="#contact">預約看診</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-badge">🌿 中醫師 · 內科專科醫師</div>
          <h1>
            {SITE.doctor}<br />
            讓身體<em>自然</em>回到<br />
            最好的狀態
          </h1>
          <p className="hero-sub">
            專精中醫減重、兒科調理、美顏針灸，<br />
            以溫和有效的方式，守護每一個家庭。
          </p>
          <div className="hero-btns">
            <Link href="#contact" className="btn-primary">預約看診 →</Link>
            <Link href={SITE.ig} target="_blank" className="btn-secondary">📷 追蹤 IG</Link>
          </div>
        </div>
        <div className="hero-photo">
          <img src="/doctor.png" alt={SITE.doctor} />
        </div>
      </section>

      {/* BAND */}
      <div className="band">
        <div className="band-item">
          <div className="band-n">500+</div>
          <div className="band-l">每月診療人次</div>
        </div>
        <div className="band-item">
          <div className="band-n">5+</div>
          <div className="band-l">臨床執業年資</div>
        </div>
        <div className="band-item">
          <div className="band-n">4</div>
          <div className="band-l">專科認證</div>
        </div>
        <div className="band-item">
          <div className="band-n">高雄左營</div>
          <div className="band-l">馬光中醫明華院</div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div>
          <div className="sec-eyebrow">關於我</div>
          <h2 className="sec-h2">
            溫柔而專業，<br />
            以中醫守護你的健康
          </h2>
          <p className="about-p">
            我是周亞錚醫師，同時具備中醫師執照與西醫內科專科醫師資格。我相信，中西醫整合的觀點，能讓每一位患者得到更全面、更精準的照護。
          </p>
          <p className="about-p">
            從小朋友的體質調理到成人的慢性調養，從中醫減重到美顏針灸，我用溫和有效的方式，陪伴每一個家庭走過健康的每個階段。
          </p>
          <p className="about-p">
            「毛兒中醫故事館」是我記錄日常診療故事、分享中醫知識的地方，希望讓更多人透過有趣易懂的方式，認識中醫的智慧。
          </p>
        </div>
        <div>
          <div className="sec-eyebrow">專業資歷</div>
          <div className="cred-list">
            <div className="cred">
              <h4>學術背景</h4>
              <p>中醫學系畢業 · 中醫師高考及格</p>
            </div>
            <div className="cred">
              <h4>西醫內科專科醫師</h4>
              <p>衛生福利部 內科專科醫師認證</p>
            </div>
            <div className="cred">
              <h4>專科認證</h4>
              <p>中華民國肥胖研究學會 減重專科認證<br />台灣顏面針灸醫學會 美顏針專科認證</p>
            </div>
            <div className="cred">
              <h4>現任看診</h4>
              <p>{SITE.clinicName}<br />{SITE.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="sec-eyebrow">服務項目</div>
        <h2 className="sec-h2">四大專精領域</h2>
        <div className="svc-grid">
          {[
            { icon: '⚖️', tag: '中醫減重', title: '科學中醫減重', desc: '針灸、埋線、中藥體質調理三合一，從根本改善代謝，讓體重穩定下降不復胖。' },
            { icon: '🧒', tag: '小兒中醫', title: '兒科調理', desc: '腸胃虛弱、反覆感冒、過敏體質，以溫和中藥與推拿，守護孩子健康成長。' },
            { icon: '✨', tag: '美顏針灸', title: '美顏針 · 逆齡', desc: '顏面針灸促進膠原蛋白再生，改善肌膚鬆弛、細紋，自然緊緻無副作用。' },
            { icon: '🩺', tag: '內科專科', title: '中西醫整合內科', desc: '以西醫內科專科資格為基礎，結合中醫調理，提供更全方位的慢性病管理。' },
          ].map(s => (
            <div className="svc-card" key={s.tag}>
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-tag">{s.tag}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles-section" id="articles">
        <div className="sec-eyebrow">衛教文章</div>
        <h2 className="sec-h2">讓你秒懂的中醫知識</h2>
        <div className="articles-grid">
          {articles.slice(0, 3).map(a => (
            <Link href={`/articles/${a.slug}`} key={a.slug} className="article-card">
              <div className="article-cover">
                {a.cover && <img src={a.cover} alt={a.title} />}
              </div>
              <div className="article-body">
                <span className="article-tag">{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <div className="article-date">{a.date} · {SITE.doctor}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="view-all">
          <Link href="/articles">查看所有文章 →</Link>
        </div>
      </section>

      {/* YOUTUBE */}
      <section className="youtube-section" id="youtube">
        <div className="sec-eyebrow">YouTube 頻道</div>
        <h2 className="sec-h2">影片衛教，秒懂中醫</h2>
        <div className="yt-grid">
          {videos.length > 0 ? videos.map(v => (
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="yt-card" key={v.videoId}>
              <div className="yt-thumb">
                <img src={v.thumbnail} alt={v.title} />
                <div className="play-btn"><div className="play-tri"></div></div>
              </div>
              <div className="yt-info">
                <h3>{v.title}</h3>
                <p>
                  {v.views && `${v.views} 次觀看 · `}
                  {v.published}
                </p>
              </div>
            </a>
          )) : (
            <a href={SITE.yt} target="_blank" rel="noopener noreferrer" className="yt-card">
              <div className="yt-thumb">
                <div className="play-btn"><div className="play-tri"></div></div>
              </div>
              <div className="yt-info">
                <h3>前往毛兒中醫故事館 YouTube 頻道</h3>
                <p>點此觀看所有影片</p>
              </div>
            </a>
          )}
        </div>
        <div className="yt-subscribe">
          <a href={SITE.yt} target="_blank" rel="noopener noreferrer">▶ 訂閱毛兒中醫故事館頻道</a>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="resources-section">
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>國考資源</div>
        <h2 className="sec-h2" style={{ textAlign: 'center' }}>中醫國考資源共享</h2>
        <div className="resource-box">
          <div className="resource-icon">📚</div>
          <h3>免費國考資源下載</h3>
          <p>
            整理了中醫師國家考試的學習資源、筆記與歷年試題，
            分享給所有正在備考的同學，希望對你有幫助！
          </p>
          <a href={SITE.drive} target="_blank" rel="noopener noreferrer">前往 Google Drive 下載 →</a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div>
          <div className="sec-eyebrow">聯絡我</div>
          <h2 className="sec-h2">預約看診</h2>
          <div className="contact-row">
            <div className="contact-icon">📍</div>
            <div>
              <div className="contact-label">診所地址</div>
              <div className="contact-value">{SITE.address}<br />{SITE.clinicName}</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-icon">📞</div>
            <div>
              <div className="contact-label">預約電話</div>
              <div className="contact-value">{SITE.phone}</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-icon">🌐</div>
            <div>
              <div className="contact-label">線上掛號</div>
              <div className="contact-value">
                <a href="https://ma-kuang.1655.com.tw/on_link.php?shop=12" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sage-dk)', textDecoration: 'underline' }}>
                  馬光醫療網線上掛號 →
                </a>
              </div>
            </div>
          </div>
          <div className="social-row">
            <a href={SITE.fb} target="_blank" rel="noopener noreferrer" className="social-btn">📘 Facebook</a>
            <a href={SITE.ig} target="_blank" rel="noopener noreferrer" className="social-btn">📷 Instagram</a>
            <a href={SITE.yt} target="_blank" rel="noopener noreferrer" className="social-btn">▶ YouTube</a>
          </div>
        </div>
        <div>
          <div className="sec-eyebrow" style={{ marginBottom: '16px' }}>看診時間</div>
          <table className="hours-table">
            <tbody>
              <tr><td>週一 ～ 週六</td><td>08:20 – 11:30</td></tr>
              <tr><td></td><td>13:50 – 17:00</td></tr>
              <tr><td></td><td>17:50 – 21:00</td></tr>
              <tr><td>週日</td><td style={{ color: 'var(--muted)', fontWeight: 400 }}>休診</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '16px', lineHeight: '1.8' }}>
            ※ 看診時間可能依診所公告調整，<br />建議來電或線上確認。
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <strong>{SITE.name}</strong>
        <p style={{ marginTop: '8px' }}>{SITE.doctor} · {SITE.clinicName}</p>
        <div className="footer-links">
          <a href={SITE.fb} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={SITE.ig} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={SITE.yt} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={SITE.drive} target="_blank" rel="noopener noreferrer">國考資源</a>
          <Link href="/admin/">後台管理</Link>
        </div>
        <small>© 2026 {SITE.name} · 保留一切權利</small>
      </footer>
    </>
  )
}

export async function getStaticProps() {
  const articles = getAllArticles()
  const videos = await getLatestVideos(2)
  return {
    props: { articles, videos },
    revalidate: 3600, // 重新抓一次最新影片（每小時）
  }
}
