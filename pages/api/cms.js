export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>文章後台 | 毛兒中醫故事館</title>
</head>
<body>
  <div id="nc-root"></div>
  <script>window.CMS_MANUAL_INIT = true</script>
  <script src="https://unpkg.com/decap-cms@2.10.192/dist/decap-cms.js" onload="initCMS()"></script>
  <script>
    function initCMS() {
      CMS.init({
        config: {
          backend: {
            name: "github",
            repo: "allcyril/mao-tcm",
            branch: "main",
            base_url: "https://mao-tcm-cibl.vercel.app",
            auth_endpoint: "/api/auth"
          },
          media_folder: "public/uploads",
          public_folder: "/uploads",
          collections: [{
            name: "articles",
            label: "衛教文章",
            label_singular: "文章",
            folder: "content/articles",
            create: true,
            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
            fields: [
              { label: "標題", name: "title", widget: "string" },
              { label: "發布日期", name: "date", widget: "datetime", format: "YYYY-MM-DD" },
              { label: "分類", name: "category", widget: "select",
                options: ["中醫減重","小兒中醫","美顏針灸","內科調理","體質養生","中醫知識"] },
              { label: "摘要", name: "excerpt", widget: "text" },
              { label: "封面圖片", name: "cover", widget: "image", required: false },
              { label: "文章內容", name: "body", widget: "markdown" }
            ]
          }]
        }
      })
    }
  </script>
</body>
</html>`)
}
