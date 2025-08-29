import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import WalletForm from '../components/forms/WalletForm';
import PaymentForm from '../components/forms/PaymentForm';
import { toast } from 'react-toastify';
import './trade.css'; // import plain CSS

export default function TradePage() {
  const { symbol } = useParams();
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [payment, setPayment] = useState({ method: 'card', cardNumber: '', expiry: '', cvc: '', bankName: '', accountNumber: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) e.amount = 'Enter valid amount';
    if (!wallet) e.wallet = 'Wallet address required';
    if (payment.method === 'card') {
      if (!payment.cardNumber) e.cardNumber = 'Card number required';
      if (!payment.expiry) e.expiry = 'Expiry required';
      if (!payment.cvc) e.cvc = 'CVC required';
    } else {
      if (!payment.bankName) e.bankName = 'Bank name required';
      if (!payment.accountNumber) e.accountNumber = 'Account number required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePaymentChange = (e) => setPayment(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submitTrade = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Replace with your API call
      // await api.post('/trade', { symbol, amount: Number(amount), wallet, payment });
      toast.success('Trade successful! Coins are on their way.');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Trade failed';
      toast.error(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="trade-page">
      <div className="trade-container">
        <h2 className="trade-title">Buy {symbol?.toUpperCase()}</h2>
        <form onSubmit={submitTrade} className="trade-form">
          <div className="form-group">
            <label>Amount (USD)</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
            {errors.amount && <p className="error-text">{errors.amount}</p>}
          </div>

          <WalletForm value={wallet} onChange={(e) => setWallet(e.target.value)} error={errors.wallet} />

          <PaymentForm formData={payment} onChange={handlePaymentChange} errors={errors} />

          <button disabled={loading} className="btn-submit">{loading ? 'Processing...' : 'Confirm Purchase'}</button>
        </form>
      </div>
    </div>
  );
}
