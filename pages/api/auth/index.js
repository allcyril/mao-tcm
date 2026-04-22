const SITE_URL = 'https://mao-tcm-cibl.vercel.app'

export default async function handler(req, res) {
  const { code } = req.query

  if (!code) {
    // Step 1: serve handshake page — popup must send "authorizing:github" first
    // before redirecting to GitHub (required by Decap CMS v3 protocol)
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    const redirectUri = `${SITE_URL}/api/auth`
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.send(`<!doctype html><html><body><script>
      var p = window.opener || window.parent;
      p.postMessage('authorizing:github', '*');
      window.addEventListener('message', function(e) {
        if (e.data === 'authorizing:github') {
          window.location.href = ${JSON.stringify(githubUrl)};
        }
      });
    <\/script></body></html>`)
  }

  // Step 2: exchange code for token
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })
    const { access_token, error } = await tokenRes.json()

    if (error || !access_token) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.status(401).send(`<!doctype html><html><body><script>
        var p = window.opener || window.parent;
        p.postMessage('authorization:github:error:${error || 'no_token'}', '*');
        window.close();
      <\/script></body></html>`)
    }

    const msg = JSON.stringify({ token: access_token, provider: 'github' })
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(`<!doctype html><html><body><script>
      var p = window.opener || window.parent;
      p.postMessage('authorization:github:success:' + ${JSON.stringify(msg)}, '*');
      window.close();
    <\/script></body></html>`)
  } catch (e) {
    res.status(500).send('OAuth error')
  }
}
