import { useEffect, useState } from "react";
import './CurrencyConverter.css';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("PLN");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [allRates, setAllRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getFlag = (code) => {
    let countryCode = code.slice(0, 2);
    if (code === "EUR") countryCode = "EU";
    if (code === "XOF") countryCode = "SN";
    if (code === "PLN") countryCode = "PL"// 
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  };

  const fetchRates = async () => {
    if (!amount || amount <= 0) {
      setConverted(0)
      allRates({})
     return;
    }

    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}`);
      const data = await res.json();
      console.log(data);

      if (fromCur === toCur) {
        setConverted(amount);
      } else {
        setConverted(data.rates[toCur]);
      }
      setAllRates(data.rates);
    } catch (err) {
      console.error("Erreur API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [amount, fromCur, toCur]);

  const otherRates = Object.entries(allRates).filter(([code]) => code !== toCur).slice(0, 4);

  return (
    <div className="currency-converter-container">
      <h2 className="converter-title"> Convertisseur de Devises </h2>

      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
          className="amount-input"
        />

        <div className="select-wrapper">

          <img
            src={getFlag(fromCur)}
            alt={`${toCur} flag`}
            className="flag-icon"
          />
          <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} disabled={isLoading} className="currency-select">
            <option value="PLN">PLN</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="TRY">TRY</option>
            <option value="SGD">SGD</option>
            <option value="CHF">CHF</option>
          </select>
        </div>

        <span className="separator"></span>

        <div className="select-wrapper">

          <img
            src={getFlag(toCur)}
            alt={`${toCur} flag`}
            className="flag-icon"
          />
          <select value={toCur} onChange={(e) => setToCur(e.target.value)} disabled={isLoading} className="currency-select">
            <option value="USD">USD</option>
            <option value="PLN">PLN</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="XOF">XOF</option>
            <option value="GNF">GNF</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
      </div>

      <p className="conversion-result">
        {isLoading ? "Calcul en cours..." :
          ` ${amount} ${fromCur} =`}
        <span className="converted-value">
          {isLoading || typeof converted !== "number"
            ? ""
            : `${converted.toFixed(2)} ${toCur}`}
        </span>
      </p>

      <hr className="divider" />

      <div className="other-rates-section">
        <h3 className="section-title">Autres Taux de Change ({fromCur} de référence)</h3>
        {isLoading && <p>Chargement des taux...</p>}
        {!isLoading && otherRates.length === 0 && <p>Aucun autre taux à afficher.</p>}
        {!isLoading && otherRates.length > 0 && (
          <ul className="rates-list">
            {otherRates.map(([code, rate]) => (
              <li key={code} className="rate-item">

                <img
                  src={getFlag(fromCur)}
                  alt={`${code} flag`}
                  className="flag-icon"></img> <span className="rate-text">
                  {amount} {fromCur} = <strong>{rate?.toFixed(2)}</strong> {code}  <img
                    src={getFlag(code)}
                    alt={`${code} flag`}
                    className="flag-icon"
                  />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}