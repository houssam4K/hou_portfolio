import ContactForm from "./ContactForm.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <div className="footer__cta">
          <p className="section-tag">let's connect</p>
          <h2 className="footer__heading">
            Got an opening for a <span>security engineer</span>?
          </h2>
          <p className="footer__sub">
            I'm open to SOC analyst, threat hunter and junior security engineer
            roles. Drop a message below — I usually respond within 24 hours.
          </p>

          <ContactForm />
        </div>

        <div className="footer__bottom">
          <div className="footer__logo">
            <span>&lt;</span>houssam<span className="footer__cursor">_</span>
            <span>/&gt;</span>
          </div>
          <div className="footer__links">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">HackTheBox</a>
          </div>
          <p className="footer__copy">
            built with <code>react</code> · © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
