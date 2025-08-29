import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profiles.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [cardsBought, setCardsBought] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      setBalance(parsedUser.balance || 500);
      setCardsBought([
        { name: "Card A", price: 100, symbol: "A" },
        { name: "Card B", price: 150, symbol: "B" },
        { name: "Card C", price: 80, symbol: "C" },
      ]);
      setFavoriteCards([
        { name: "Card X", price: 120, symbol: "X" },
        { name: "Card Y", price: 200, symbol: "Y" },
      ]);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const addBalance = (amount) => {
    setBalance(prev => prev + amount);
    setActivity(prev => [...prev, `Added $${amount} to balance`]);
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Welcome Back {user.name}</h1>

      <div className="account-widget">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Balance:</strong> ${balance}</p>
        <button onClick={() => addBalance(100)} className="btn-add">Add $100</button>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <section className="cards-section">
        <h2>Purchased Cards</h2>
        <div className="cards-grid">
          {cardsBought.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.name}</h3>
              <p>Symbol: {card.symbol}</p>
              <p>Price: ${card.price}</p>
              <p>Status: Active</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cards-section">
        <h2>Favorite Cards</h2>
        <div className="cards-grid">
          {favoriteCards.map((card, index) => (
            <div key={index} className="card favorite-card">
              <h3>{card.name}</h3>
              <p>Symbol: {card.symbol}</p>
              <p>Price: ${card.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="activity-section">
        <h2>Recent Activity</h2>
        {activity.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          <ul className="activity-list">
            {activity.map((act, index) => (
              <li key={index}>{act}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
