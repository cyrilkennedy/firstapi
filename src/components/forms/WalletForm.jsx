import React from 'react'
import './walletform.css'

export default function WalletForm({ value, onChange, error }) {
  return (
    <div className="wallet-form">
      <label>Wallet Address</label>
      <input
        name="wallet"
        value={value}
        onChange={onChange}
        placeholder="e.g. 0x1234... or your BTC address"
        className="input-field"
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}
