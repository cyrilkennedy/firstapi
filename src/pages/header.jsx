import React from "react";
import "./header.css";

export default function HomeHeader() {
  return (
    <header className="home-header">
      <div className="overlay"></div>

      <div className="header-content">
        <h1 className="header-title">TradeSmart: Demo Crypto Trading</h1>
        <p className="header-subtitle">
          Explore live crypto prices, build your demo portfolio, and practice trading without risk.
        </p>

        <div className="header-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>

        {/* Floating coin icons */}
        <div className="floating-coins">
          <span className="coin">₿</span>
          <span className="coin">Ξ</span>
          <span className="coin">🪙</span>
          <span className="coin">₮</span>
        </div>

        {/* Chart-like SVG waves */}
        <svg className="chart-waves" viewBox="0 0 1440 320">
          <path
            fill="rgba(79, 70, 229,0.2)"
            d="M0,224L60,202.7C120,181,240,139,360,144C480,149,600,203,720,213.3C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
          <path
            fill="rgba(79, 70, 229,0.1)"
            d="M0,160L60,149.3C120,139,240,117,360,144C480,171,600,245,720,261.3C840,277,960,235,1080,224C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
}
