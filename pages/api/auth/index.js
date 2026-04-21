export default async function handler(req, res) {
  const { code } = req.query

  if (!code) {
    // Step 1: redirect to GitHub OAuth
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      scope: 'repo,user',
      redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mao-tcm-cibl.vercel.app'}/api/auth`,
    })
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`)
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
      return res.status(401).send(`<script>window.opener.postMessage('authorization:github:error:${error}','*');window.close();</script>`)
    }

    res.send(`
      <script>
        const msg = JSON.stringify({ token: "${access_token}", provider: "github" });
        window.opener.postMessage('authorization:github:success:' + msg, '*');
        window.close();
      </script>
    `)
  } catch (e) {
    res.status(500).send('OAuth error')
  }
}
