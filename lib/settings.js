import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAboutContent() {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/about.md')
    const { data } = matter(fs.readFileSync(filePath, 'utf8'))
    return data
  } catch {
    return null
  }
}
