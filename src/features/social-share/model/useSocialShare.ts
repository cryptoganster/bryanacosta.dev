export function useSocialShare() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = 'Check out my portfolio!'

  return {
    shareUrl,
    shareText,
    share: async () => {
      if (navigator.share) {
        await navigator.share({ title: shareText, url: shareUrl })
      }
    },
  }
}
