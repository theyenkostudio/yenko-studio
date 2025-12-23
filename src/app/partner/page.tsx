import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner With Us | Yenko Studio",
  description:
    "Earn commissions by connecting businesses with Yenko Studio. Join our referral program and get rewarded for every client you bring.",
};

export default function PartnerPage() {
  return (
    <div className="partner-page">
      <header className="partner-header">
        <Link href="/" className="partner-back-link">
          <span>←</span>
          <span>YENKO STUDIO</span>
        </Link>
      </header>

      <section className="partner-hero">
        <div className="partner-label">partnership opportunity</div>
        <h1 className="partner-title">Earn By Connecting Us With Clients</h1>
        <p className="partner-subtitle">
          Know a business that needs a website, mobile app, or custom software?
          Introduce them to us and earn a commission on every successful project.
        </p>
      </section>

      <section className="partner-content">
        <div className="partner-grid">
          <div className="partner-card">
            <div className="partner-card-number">01</div>
            <h3 className="partner-card-title">Simple Process</h3>
            <p className="partner-card-text">
              Connect us with a potential client. Once the project is signed and
              payment is received, you earn your commission. No complicated
              tracking or lengthy processes.
            </p>
          </div>
          <div className="partner-card">
            <div className="partner-card-number">02</div>
            <h3 className="partner-card-title">Generous Commission</h3>
            <p className="partner-card-text">
              Earn a competitive percentage of every project you bring in.
              The more valuable the project, the more you earn. We believe in
              rewarding those who help us grow.
            </p>
          </div>
          <div className="partner-card">
            <div className="partner-card-number">03</div>
            <h3 className="partner-card-title">No Limits</h3>
            <p className="partner-card-text">
              There&apos;s no cap on how many clients you can refer or how much
              you can earn. Refer as many businesses as you want and earn on
              each successful conversion.
            </p>
          </div>
          <div className="partner-card">
            <div className="partner-card-number">04</div>
            <h3 className="partner-card-title">Quality Assurance</h3>
            <p className="partner-card-text">
              Your reputation matters. We deliver exceptional work that makes
              both you and your referral look good. Our track record speaks for
              itself.
            </p>
          </div>
        </div>

        <div className="partner-highlight">
          <div className="partner-highlight-label">COMMISSION STRUCTURE</div>
          <h2 className="partner-highlight-title">
            10% Commission on Every Project
          </h2>
          <p className="partner-highlight-text">
            For every client you successfully refer, you receive 10% of the
            project value. Payments are made promptly after we receive payment
            from the client.
          </p>
        </div>

        <div className="partner-section-title">Who Can Partner With Us</div>
        <div className="partner-list">
          <div className="partner-list-item">
            <span className="partner-list-icon">→</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">Freelancers & Consultants</h4>
              <p className="partner-list-text">
                If you work with businesses and come across clients who need
                technical solutions outside your expertise, refer them to us.
              </p>
            </div>
          </div>
          <div className="partner-list-item">
            <span className="partner-list-icon">→</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">Agency Owners</h4>
              <p className="partner-list-text">
                Have overflow work or clients requesting services you don&apos;t
                offer? Partner with us and still earn from those opportunities.
              </p>
            </div>
          </div>
          <div className="partner-list-item">
            <span className="partner-list-icon">→</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">Business Professionals</h4>
              <p className="partner-list-text">
                Accountants, lawyers, marketers, and other professionals who
                interact with businesses can earn by making valuable
                introductions.
              </p>
            </div>
          </div>
          <div className="partner-list-item">
            <span className="partner-list-icon">→</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">Anyone With a Network</h4>
              <p className="partner-list-text">
                If you know business owners who need digital solutions, you can
                become a partner. No technical background required.
              </p>
            </div>
          </div>
        </div>

        <div className="partner-section-title">How It Works</div>
        <div className="partner-list">
          <div className="partner-list-item">
            <span className="partner-list-icon">01</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">Reach Out to Us</h4>
              <p className="partner-list-text">
                Send us a message with information about the potential client
                and their needs. We&apos;ll register you as the referrer.
              </p>
            </div>
          </div>
          <div className="partner-list-item">
            <span className="partner-list-icon">02</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">We Handle the Rest</h4>
              <p className="partner-list-text">
                Our team will reach out to the client, understand their
                requirements, and present a proposal. You don&apos;t need to be
                involved in the technical discussions.
              </p>
            </div>
          </div>
          <div className="partner-list-item">
            <span className="partner-list-icon">03</span>
            <div className="partner-list-content">
              <h4 className="partner-list-title">Get Paid</h4>
              <p className="partner-list-text">
                Once the project is signed and initial payment is made, we
                transfer your commission. Payments can be made via bank transfer
                or mobile money.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-cta">
        <h2 className="partner-cta-title">Ready to Start Earning?</h2>
        <p className="partner-cta-text">
          Send us a message to discuss partnership details or to refer your
          first client.
        </p>
        <a
          href="https://wa.me/message/MFCTDFBXVE7ZK1"
          className="partner-cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started on WhatsApp
          <span>→</span>
        </a>
      </section>
    </div>
  );
}
