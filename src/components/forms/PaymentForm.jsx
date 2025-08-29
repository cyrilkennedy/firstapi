import React from 'react'
import './payment.css'

export default function PaymentForm({ formData, onChange, errors }) {
  return (
    <div className="payment-form">
      <div className="field-group">
        <label>Payment Method</label>
        <select name="method" value={formData.method} onChange={onChange} className="input-field">
          <option value="card">Card</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      {formData.method === 'card' && (
        <div className="card-fields">
          <div className="field-group">
            <input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={onChange}
              placeholder="Card Number"
              className="input-field"
            />
            {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
          </div>

          <div className="card-flex">
            <div className="field-group flex-item">
              <input
                name="expiry"
                value={formData.expiry}
                onChange={onChange}
                placeholder="MM/YY"
                className="input-field"
              />
              {errors.expiry && <p className="error-text">{errors.expiry}</p>}
            </div>

            <div className="field-group flex-item">
              <input
                name="cvc"
                value={formData.cvc}
                onChange={onChange}
                placeholder="CVC"
                className="input-field"
              />
              {errors.cvc && <p className="error-text">{errors.cvc}</p>}
            </div>
          </div>
        </div>
      )}

      {formData.method === 'bank' && (
        <div className="bank-fields">
          <div className="field-group">
            <input
              name="bankName"
              value={formData.bankName}
              onChange={onChange}
              placeholder="Bank Name"
              className="input-field"
            />
            {errors.bankName && <p className="error-text">{errors.bankName}</p>}
          </div>

          <div className="field-group">
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={onChange}
              placeholder="Account Number"
              className="input-field"
            />
            {errors.accountNumber && <p className="error-text">{errors.accountNumber}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
