document.addEventListener("DOMContentLoaded", () => {
        // Hide loader after 1 second
        const loaderContainer = document.getElementById('loaderContainer');
        if (loaderContainer) {
            setTimeout(() => {
                loaderContainer.style.opacity = '0';
                loaderContainer.style.visibility = 'hidden';
            }, 2000);
        }

        // Register GSAP plugin
        gsap.registerPlugin(ScrollTrigger);

        // Floating Icons
        const icons = [
            `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
            `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
            `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`
        ];

        const iconsContainer = document.getElementById('floating-icons');
        if (iconsContainer) {
            icons.forEach((icon, index) => {
                const div = document.createElement('div');
                div.className = 'floating-icon';
                div.innerHTML = icon;
                div.style.top = `${Math.random() * 100}%`;
                div.style.left = `${Math.random() * 100}%`;
                iconsContainer.appendChild(div);

                gsap.to(div, {
                    y: "random(-30, 30)",
                    x: "random(-30, 30)",
                    rotation: "random(-20, 20)",
                    duration: "random(3, 5)",
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                    delay: index * 0.2
                });
            });
        }

        // Hero section scroll animation
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            ease: 'none'
        });

        // Reveal animation for cards
        const animateCards = (selector) => {
            gsap.utils.toArray(selector).forEach((card, index) => {
                gsap.fromTo(card, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                });
            });
        };

        animateCards('.step-card');
        animateCards('.service-card');

        // Stat counter animation
        document.querySelectorAll('.stat-number').forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace(/\D/g, ''), 10) || 0;
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function () {
                    const val = Math.round(this.targets()[0].textContent);
                    stat.textContent = val.toLocaleString('ar-SA');
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });
