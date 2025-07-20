export function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return 'never'
  const d = new Date(dateString)
  const diff = Date.now() - d.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes>1?'s':''} ago`
  if (hours < 24) return `${hours} hour${hours>1?'s':''} ago`
  if (days < 7) return `${days} day${days>1?'s':''} ago`
  return d.toLocaleDateString()
}
