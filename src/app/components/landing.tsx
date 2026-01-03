"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import FAQs from "./faq";
import AnnouncementBanner from "./announcement-banner";

export default function LandingTemplate() {
  const heroRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.5 })
        .from(".hero-label", { autoAlpha: 0, y: 30 })
        .from(".hero-title", { autoAlpha: 0, y: 50 }, "-=0.2")
        .from(".hero-subtitle", { autoAlpha: 0, y: 30 }, "-=0.4")
        .from(".scroll-indicator", { autoAlpha: 0 }, "-=0.4");

      // Proper card-stacking effect with visible overlap
      const serviceSections = gsap.utils.toArray(".service-section");

      serviceSections.forEach((section) => {
        const featureItems = (section as Element).querySelectorAll(".feature-item");
        const scrollDistance = window.innerHeight * (featureItems.length * 0.8);

        // Pin the section and animate items progressively
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section as gsap.DOMTarget,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Animate each feature item in sequence
        featureItems.forEach((item, i: number) => {
          tl.from(
            item,
            {
              autoAlpha: 0,
              y: 60,
              duration: 0.5,
              ease: "power3.out",
            },
            i * 0.6
          );
        });
      });

      // Footer animation
      gsap.from(".footer-big-text", {
        scrollTrigger: {
          trigger: ".footer",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
        y: 100,
        autoAlpha: 0,
      });

      // Scroll indicator animation
      gsap.to(".scroll-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut",
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="has-banner">
      <AnnouncementBanner />
      <div className="header">
        <div className="logo-container">
          <div className="logo-text">YENKO STUDIO</div>
        </div>
        <a href="https://wa.me/message/MFCTDFBXVE7ZK1" className="cta-button">
          Let&apos;s Chat
        </a>
      </div>

      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-label">
            engineered to last, designed to perfection
          </div>
          <h1 className="hero-title lowercase">Creating Digital Experiences</h1>
          <p className="hero-subtitle">
            We build robust, scalable software that solves real business
            problems—combining technical excellence with user-focused design to
            deliver products <b /> that drive growth and stand the test of time.
          </p>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <div className="services-container" ref={servicesContainerRef}>
        <section className="service-section" id="service-1">
          <div className="service-content">
            <div className="service-left">
              <div className="service-number">01</div>
              <div className="service-label">WEB</div>
              <h2 className="service-title">Web Applications</h2>
            </div>
            <div className="service-right">
              <div className="feature-item">
                <div className="feature-name">Responsive Design</div>
                <div className="feature-desc">
                  Pixel-perfect interfaces that adapt seamlessly to any screen
                  size.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-name">Performance Optimization</div>
                <div className="feature-desc">
                  Lightning-fast load times and smooth interactions that keep
                  users engaged.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-name">Modern Frameworks</div>
                <div className="feature-desc">
                  Built with future-proof web technologies.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="service-section" id="service-2">
          <div className="service-content">
            <div className="service-left">
              <div className="service-number">02</div>
              <div className="service-label">MOBILE</div>
              <h2 className="service-title">Mobile Apps</h2>
            </div>
            <div className="service-right">
              <div className="feature-item">
                <div className="feature-name">Native iOS & Android</div>
                <div className="feature-desc">
                  Platform-specific apps that leverage the full power of mobile
                  devices.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-name">Cross-Platform</div>
                <div className="feature-desc">
                  Build once, deploy everywhere—delivering consistent
                  experiences across all platforms efficiently.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-name">App Store Optimization</div>
                <div className="feature-desc">
                  Strategic launch and optimization for maximum visibility and
                  downloads.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="service-section" id="service-3">
          <div className="service-content">
            <div className="service-left">
              <div className="service-number">03</div>
              <div className="service-label">BESPOKE</div>
              <h2 className="service-title">Custom Solutions</h2>
            </div>
            <div className="service-right">

              <div className="feature-item">
                <div className="feature-name">SaaS Platforms</div>
                <div className="feature-desc">
                  End-to-end product development from concept to launch—scalable
                  architectures designed for growth.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-name">API & Backend Systems</div>
                <div className="feature-desc">
                  Robust infrastructure and data architecture that powers your
                  applications with performance and security.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-name">AI & Integration</div>
                <div className="feature-desc">
                  Connect with AI/ML services, payment systems, and existing
                  tools to extend your platform&apos;s capabilities.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


      <section className="contact-section">
        <div className="contact-content">
          <h2 className="contact-title">
            Ready to Create Something Exceptional?
          </h2>
          <p className="service-description">
            Let&apos;s discuss and explore how we can help bring
            your vision to life. We&apos;re always excited to work with
            ambitious brands on meaningful projects.
          </p>
          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-label">PHONE</div>
              <a href="https://wa.me/message/RXARUAA6S7GZA1" className="contact-value">
                +233 597 712 740
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-label">EMAIL</div>
              <a href="mailto:hello@yenko.studio" className="contact-value">
                hello@yenko.studio
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-label">SOCIAL</div>
              <div className="social-links">
                <a
                  href="https://x.com/theyenkostudio"
                  target="_blank"
                  className="social-link"
                >
                  x.com
                </a>
                <a
                  href="https://medium.com"
                  target="_blank"
                  className="social-link"
                >
                  medium.com
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/theyenkostudio"
                  className="social-link"
                >
                  linkedin.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>
      <FAQs />



      <footer className="footer" ref={footerRef}>
        <div className="footer-big-text">YENKO STUDIO</div>
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-title">STUDIO</div>
            <div className="footer-text">
              Engineered to last
              <br />
              Designed to perfection
              <br />
              Est. 2025
            </div>
          </div>
          <div className="footer-section">
            <div className="footer-title">SERVICES</div>
            <div className="footer-text">
              Web Applications
              <br />
              Mobile Applications
              <br />
              Custom Solutions
            </div>
          </div>
          <div className="footer-section">
            <div className="footer-title">CONTACT</div>
            <div className="footer-text">
              <a
                href="https://wa.me/message/RXARUAA6S7GZA1"
                target="_blank"
                rel="noopener noreferrer"
              >
                +233 597 712 740
              </a>
              <br />
              <a
                href="https://wa.me/message/MFCTDFBXVE7ZK1"
                target="_blank"
                rel="noopener noreferrer"
              >
               +234 816 741 0887
              </a>
              <br />
              <a href="mailto:hello@yenko.studio">hello@yenko.studio</a>
              <br />
              Available Globally
            </div>
          </div>
          <div className="footer-section">
            <div className="footer-title">FOLLOW</div>
            <div className="footer-text">
              <a
                href="https://x.com/theyenkostudio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter / X
              </a>
              <br />
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>
              <br />
              <a
                href="https://www.linkedin.com/company/theyenkostudio"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <br />
              <a
                href="https://www.instagram.com/theyenkostudio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} YENKO STUDIO. All Rights Reserved.</div>
          <div>
            RC: 9040058
          </div>
        </div>
      </footer>
    </div>
  );
}
