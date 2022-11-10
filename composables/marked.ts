import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html';

export const useSafeMarked = (safeMdText:string) => {
  return marked.parse(safeMdText)
}

export const useMarked = (mdText:string) => {
  return sanitizeHtml(useSafeMarked(mdText))
}