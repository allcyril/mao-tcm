const HANDLE = '@3maography'

export async function getLatestVideos(count = 2) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(`https://www.youtube.com/${HANDLE}/videos`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'zh-TW,zh;q=0.9',
      },
      next: { revalidate: 3600 },
    })
    clearTimeout(timer)

    if (!res.ok) return []

    const html = await res.text()

    // Extract ytInitialData from the page
    const match = html.match(/var ytInitialData\s*=\s*(\{.+?\});\s*<\/script>/) ||
                  html.match(/ytInitialData\s*=\s*(\{[\s\S]+?\});\s*(?:\/\/|<\/script>)/)
    if (!match) return []

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
  } catch (e) {
    if (e.name !== 'AbortError') console.error('YouTube fetch error:', e)
    return []
  }
}
