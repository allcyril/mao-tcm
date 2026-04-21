const CHANNEL_ID = 'UCp_HpjZhGSeiWlAjccYEU6w'

export async function getLatestVideos(count = 2) {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { cache: 'no-store' }
    )
    const xml = await res.text()
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) || []

    return entries.slice(0, count).map(entry => {
      const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1] || ''
      const rawTitle = (entry.match(/<media:title>(.*?)<\/media:title>/) || entry.match(/<title>(.*?)<\/title>/) || [])[1] || ''
      const title = rawTitle.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1').trim()
      const published = (entry.match(/<published>(.*?)<\/published>/) || [])[1] || ''
      const views = (entry.match(/<media:statistics views="(\d+)"/) || [])[1] || null

      return {
        videoId,
        title,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        published: published ? published.slice(0, 10) : '',
        views: views ? Number(views).toLocaleString() : null,
      }
    })
  } catch (e) {
    console.error('YouTube fetch error:', e)
    return []
  }
}
