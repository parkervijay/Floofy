export default function CarePage() {
  return (
    <main>
      {/* Page header */}
      <header className="page-header">
        <div className="container">
          <h1>Care</h1>
          <p>
            Support our mission and help us create a safer, more loving world for all animals.
          </p>
        </div>
      </header>

      {/* Main content */}
      <section>
        <div className="container">
          <div className="care-grid">
            
            {/* DONATE CARD */}
            <div className="care-card visible">
              <h2>Donate for a cause</h2>
              <p>
                Your generous donation helps shelters and NGOs continue their vital work
                in rescuing, rehabilitating, and rehoming animals in need.
                Every contribution, big or small, makes a meaningful difference in an animal's life.
              </p>

              <a href="#" className="btn-primary">
                Donate now
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            {/* REPORT INCIDENT CARD */}
            <div className="care-card">
              <h2>Report a safety incident</h2>
              <p>
                If you've witnessed animal abuse, neglect, or any concerning situation involving
                an adopted pet, please report it immediately. Your report helps us ensure the safety
                and well-being of all animals.
              </p>

              <form id="incident-form">
                <div className="form-group">
                  <label>Your name</label>
                  <input type="text" placeholder="Enter your full name" required />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>

                <div className="form-group">
                  <label>Incident description</label>
                  <textarea
                    placeholder="Please describe the incident in detail..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary">
                  Submit report
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>

              {/* Success Message */}
              <div className="success-message">
                Thank you for your report. We take all incidents seriously and will review your
                submission promptly. Our team will contact you if additional information is needed.
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
