'use client'

import { useEffect } from 'react'

/**
 * Subtle scroll-parallax: any element with `data-parallax-speed="<n>"` is
 * translated vertically by `scrollY * n` on each frame. Positive n (0.1–0.4)
 * = element drifts slower than the page → feels deeper/further away.
 *
 * One scroll listener for the whole page, throttled via requestAnimationFrame.
 * Honors `prefers-reduced-motion` (no-op). Mounted once in the frontend layout.
 */
export function Parallax() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax-speed]'),
    ).map((el) => ({ el, speed: Number(el.dataset.parallaxSpeed) || 0 }))
    if (!targets.length) return

    // Hint the compositor — these elements will animate on a separate layer.
    targets.forEach(({ el }) => {
      el.style.willChange = 'transform'
    })

    let ticking = false
    const update = () => {
      const y = window.scrollY
      for (const { el, speed } of targets) {
        el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      targets.forEach(({ el }) => {
        el.style.willChange = ''
        el.style.transform = ''
      })
    }
  }, [])

  return null
}
