import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lightweight scroll-reveal composable.
 * Call in any page/component's setup to animate elements with
 * [data-reveal], [data-reveal-left], [data-reveal-right], [data-reveal-scale] attributes.
 *
 * Usage in template:
 *   <h2 data-reveal>Title</h2>
 *   <div data-reveal-left>Card</div>
 *   <div data-reveal-right>Card</div>
 *   <div data-reveal-scale>Card</div>
 *
 * Stagger children:
 *   <div data-reveal-stagger>
 *     <div>child 1</div>
 *     <div>child 2</div>
 *   </div>
 */
export function useReveal(containerSelector: string = '.about-page') {
    let ctx: gsap.Context | null = null

    onMounted(() => {
        ctx = gsap.context(() => {
            // Fade up (default)
            gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
                gsap.from(el, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    },
                })
            })

            // Fade from left
            gsap.utils.toArray<HTMLElement>('[data-reveal-left]').forEach(el => {
                gsap.from(el, {
                    x: -40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    },
                })
            })

            // Fade from right
            gsap.utils.toArray<HTMLElement>('[data-reveal-right]').forEach(el => {
                gsap.from(el, {
                    x: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    },
                })
            })

            // Scale up
            gsap.utils.toArray<HTMLElement>('[data-reveal-scale]').forEach(el => {
                gsap.from(el, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    },
                })
            })

            // Stagger children
            gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach(container => {
                const children = container.children
                gsap.from(children, {
                    y: 25,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 85%',
                        once: true,
                    },
                })
            })
        }, containerSelector)
    })

    onBeforeUnmount(() => {
        ctx?.revert()
    })
}
