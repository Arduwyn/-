'use client'

import { useEffect } from 'react'

/**
 * Subtle scroll-reveal hook: every element tagged `.reveal` fades + rises into
 * view once when it enters the viewport. Single observer per page, elements are
 * released after firing (so no work on scroll-back), and `prefers-reduced-motion`
 * is honored — those users see everything immediately, no transition.
 *
 * Mounted once in the frontend layout. The CSS lives in globals.css.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (!targets.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Honor the OS preference: skip animation, mark everything visible.
      targets.forEach((el) => el.classList.add('is-prepped', 'is-visible'))
      return
    }

    const viewportH = window.innerHeight
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      // Pre-fire 60px before entry so the motion starts before the section is
      // fully visible — makes the reveal feel responsive instead of laggy.
      { rootMargin: '0px 0px 60px 0px', threshold: 0 },
    )

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const alreadyInView = rect.top < viewportH && rect.bottom > 0
      // Elements already in the viewport on first paint: skip the animation
      // (no flash from visible → hidden → visible). Mark prepped+visible.
      // Elements below the fold: prep (now hidden), observe, fade in on entry.
      el.classList.add('is-prepped')
      if (alreadyInView) {
        el.classList.add('is-visible')
      } else {
        io.observe(el)
      }
    })
    return () => io.disconnect()
  }, [])

  return null
}
