import React, { useEffect, useState } from "react";
import CryptoCard from "../components/CoinGrid";

import "./home.css";
import HomeHeader from "./header";

const COINGECKO =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false";

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const r = await fetch(COINGECKO);
        const data = await r.json();
        const top = data.map((c) => ({
          id: c.id,
          name: c.name,
          symbol: c.symbol.toUpperCase(),
          price: c.current_price,
        }));
        setCoins(top);
      } catch (e) {
        console.error("failed to fetch market data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const handleBuy = (coin) => {
    setPortfolio((prev) => [...prev, coin]);
    alert(`✅ You bought ${coin.name} (demo)!`);
  };

 return (
    <div className="home-page">
      {/* HEADER ALWAYS AT THE TOP */}
      <HomeHeader />

      {/* MAIN CONTENT */}
      <div className="home-container">
        <main className="main-section">
          <h2 className="section-title">Top Coins</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="coin-grid">
              {coins.map((c) => (
                <CryptoCard key={c.symbol} coin={c} onBuy={handleBuy} />
              ))}
            </div>
          )}

          {portfolio.length > 0 && (
            <div className="portfolio-section">
              <h2 className="section-title">My Demo Portfolio</h2>
              <ul className="portfolio-list">
                {portfolio.map((c, i) => (
                  <li key={i}>
                    {c.name} ({c.symbol}) – Bought @ ${c.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
