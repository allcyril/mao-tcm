const CHANNEL_ID = 'UCp_HpjZhGSeiWlAjccYEU6w'
// Uploads playlist: replace "UC" prefix with "UU"
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, 'UU')
const HANDLE = '@3maography'

async function fetchViaApi(count) {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return null

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=${count}&key=${key}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return null

  const data = await res.json()
  return (data.items || []).map(item => {
    const s = item.snippet
    const videoId = s.resourceId?.videoId || ''
    const d = new Date(s.publishedAt)
    const published = isNaN(d) ? '' : `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    return {
      videoId,
      title: s.title || '',
      thumbnail: s.thumbnails?.high?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      published,
      views: null,
    }
  }).filter(v => v.videoId && v.title)
}

async function fetchViaScrape(count) {
  const res = await fetch(`https://www.youtube.com/${HANDLE}/videos`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'zh-TW,zh;q=0.9',
    },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null

  const html = await res.text()
  const match = html.match(/var ytInitialData\s*=\s*(\{.+?\});\s*<\/script>/) ||
                html.match(/ytInitialData\s*=\s*(\{[\s\S]+?\});\s*(?:\/\/|<\/script>)/)
  if (!match) return null

  const data = JSON.parse(match[1])
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || []
  const videosTab = tabs.find(t =>
    t?.tabRenderer?.title === '影片' || t?.tabRenderer?.title === 'Videos'
  )
  const items = videosTab?.tabRenderer?.content?.richGridRenderer?.contents || []

  return items
    .map(item => item?.richItemRenderer?.content?.videoRenderer)
    .filter(Boolean)
    .slice(0, count)
    .map(v => ({
      videoId: v.videoId,
      title: v.title?.runs?.[0]?.text || '',
      thumbnail: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${v.videoId}`,
      published: v.publishedTimeText?.simpleText || '',
      views: v.viewCountText?.simpleText?.replace('觀看次數：', '').replace('次', ' 次觀看') || null,
    }))
    .filter(v => v.videoId && v.title)
}

export async function getLatestVideos(count = 2) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    const videos = await fetchViaApi(count) || await fetchViaScrape(count) || []
    clearTimeout(timer)
    return videos
  } catch (e) {
    if (e.name !== 'AbortError') console.error('YouTube fetch error:', e)
    return []
  }
}
