# 毛兒中醫故事館 — 部署說明

## 一次性準備工作（只做一次）

### 步驟 1：安裝 Node.js
前往 https://nodejs.org 下載安裝 LTS 版本

### 步驟 2：建立 GitHub 帳號 + 上傳程式碼
1. 前往 https://github.com 註冊帳號
2. 新建一個 Repository，命名為 `mao-tcm`，設為 **Public**
3. 在終端機執行：
```bash
cd mao-tcm
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的帳號/mao-tcm.git
git push -u origin main
```

### 步驟 3：加入醫師照片
把醫師照片（任何檔名）放到 `public/` 資料夾，
然後把 `pages/index.js` 裡的 `/doctor.png` 改成你的檔名。

### 步驟 4：修改 CMS 設定
打開 `public/admin/config.yml`，
把第二行改成你的 GitHub 帳號：
```
repo: 你的帳號/mao-tcm
```

### 步驟 5：部署到 Vercel（免費）
1. 前往 https://vercel.com，用 GitHub 帳號登入
2. 點「New Project」→ 選 `mao-tcm`
3. 直接點「Deploy」，等待約 1 分鐘
4. 部署完成後 Vercel 會給你一個網址（例如 mao-tcm.vercel.app）

### 步驟 6：設定 CMS 後台登入（GitHub OAuth）
1. 前往 GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. 填入：
   - Application name: `mao-tcm-cms`
   - Homepage URL: `https://你的網域`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. 取得 Client ID 和 Client Secret
4. 在 Vercel 的 Environment Variables 加入這兩個值

---

## 日常使用：新增文章

1. 前往 `https://你的網址/admin/`
2. 用 GitHub 帳號登入
3. 點「衛教文章」→「新增文章」
4. 填寫標題、分類、內容，上傳封面圖片
5. 點「Publish」→ 文章自動發布到網站！

---

## 綁定自訂網域

1. 在 Namecheap / GoDaddy 買好 `.com.tw` 網域
2. Vercel → Settings → Domains → 輸入你的網域
3. 照著 Vercel 給的 DNS 設定，在網域商後台填入
4. 等待約 10～30 分鐘生效

---

## 日常更新診所資訊

診所電話、地址、社群連結等資訊都集中在：
`pages/index.js` 最上方的 `SITE` 物件，直接修改即可。

修改完後執行：
```bash
git add .
git commit -m "更新聯絡資訊"
git push
```
Vercel 會自動重新部署，約 1 分鐘後生效。
