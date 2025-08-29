import React from 'react'
import { useNavigate } from 'react-router-dom'

import './cryptocard.css'

export default function CryptoCard({ coin }){
  const navigate = useNavigate()
  // const { user } = useAuth()

  const handleBuy = () => {
    if(!user){
      navigate('/login')
      return
    }
    navigate(`/trade/${coin.symbol}`)
  }

  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <div className="crypto-icon">
          <span>{coin.symbol.slice(0,1)}</span>
        </div>
        <div className="crypto-info">
          <div className="crypto-name">{coin.name}</div>
          <div className="crypto-symbol">{coin.symbol}</div>
        </div>
      </div>

      <div className="crypto-price">
        ${Number(coin.price).toFixed(2)}
      </div>

      <button onClick={handleBuy} className="buy-btn">Buy Now</button>
    </div>
  )
}
