import { useRef, useState, useEffect } from 'react'

export const useVirtualizedList = (length: number, approxItemHeight = 120, buffer = 5) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    const handler = () => {
      if (!el) return
      setScrollTop(el.scrollTop)
      setViewportHeight(el.clientHeight)
    }
    if (el) {
      setViewportHeight(el.clientHeight)
      el.addEventListener('scroll', handler)
      window.addEventListener('resize', handler)
    }
    return () => {
      el?.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  const start = Math.max(0, Math.floor(scrollTop / approxItemHeight) - buffer)
  const visibleCount = Math.ceil(viewportHeight / approxItemHeight) + buffer * 2 || 10
  const end = Math.min(length, start + visibleCount)
  const totalHeight = length * approxItemHeight
  const offsetTop = start * approxItemHeight

  return { containerRef, start, end, totalHeight, offsetTop }
}
