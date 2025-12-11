export default function EducationPage() {
  return (
    <main>
      {/* Page header */}
      <header className="page-header">
        <div className="container">
          <h1>Education</h1>
          <p>
            Learn about responsible pet adoption, proper care techniques, and become
            the best pet parent you can be.
          </p>
        </div>
      </header>

      {/* Resource cards section */}
      <section>
        <div className="container">
          <div className="resource-grid">
            {/* Card 1 */}
            <article className="resource-card">
              <div className="resource-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #F4A259 0%, #d88a3d 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
              </div>
              <div className="resource-card-content">
                <h3>Preparing your home for a rescue dog</h3>
                <p>
                  Essential tips on pet-proofing your space, creating comfort
                  zones, and setting up feeding stations before bringing your new
                  friend home.
                </p>
                <a href="#" className="resource-link">
                  Watch on YouTube
                  <svg
                    width="16"
                    height="16"
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
            </article>

            {/* Card 2 */}
            <article className="resource-card">
              <div className="resource-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #6e5c4a 0%, #4a3f35 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
              <div className="resource-card-content">
                <h3>The first 48 hours with your adopted pet</h3>
                <p>
                  What to expect during the initial adjustment period and how to
                  help your new pet feel safe and comfortable in their new
                  environment.
                </p>
                <a href="#" className="resource-link">
                  Read more
                  <svg
                    width="16"
                    height="16"
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
            </article>

            {/* Card 3 */}
            <article className="resource-card">
              <div className="resource-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #5c4d40 0%, #3d332b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
              </div>
              <div className="resource-card-content">
                <h3>Understanding rescue pet behavior</h3>
                <p>
                  Learn to recognize signs of anxiety, fear, and trauma in adopted
                  pets, and discover techniques to help them heal and thrive.
                </p>
                <a href="#" className="resource-link">
                  Watch on YouTube
                  <svg
                    width="16"
                    height="16"
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
            </article>

            {/* Card 4 */}
            <article className="resource-card">
              <div className="resource-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #f8c89a 0%, #F4A259 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className="resource-card-content">
                <h3>Nutrition guide for adopted pets</h3>
                <p>
                  Everything you need to know about feeding schedules, dietary
                  requirements, and choosing the right food for your new
                  companion.
                </p>
                <a href="#" className="resource-link">
                  Read more
                  <svg
                    width="16"
                    height="16"
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
            </article>

            {/* Card 5 */}
            <article className="resource-card">
              <div className="resource-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #4a3f35 0%, #2d2620 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <div className="resource-card-content">
                <h3>Introducing pets to family members</h3>
                <p>
                  Safe and effective strategies for introducing your adopted pet to
                  children, other pets, and extended family members.
                </p>
                <a href="#" className="resource-link">
                  Watch on YouTube
                  <svg
                    width="16"
                    height="16"
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
            </article>

            {/* Card 6 */}
            <article className="resource-card">
              <div className="resource-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #d88a3d 0%, #c67a2d 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
              </div>
              <div className="resource-card-content">
                <h3>Healthcare essentials for new pet parents</h3>
                <p>
                  A comprehensive guide to vaccinations, regular check-ups, and
                  preventive care to keep your adopted pet healthy and happy.
                </p>
                <a href="#" className="resource-link">
                  Read more
                  <svg
                    width="16"
                    height="16"
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
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
