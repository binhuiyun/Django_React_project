import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow'
import Header from '../../components/Header';
import Container from 'react-bootstrap/esm/Container';

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest'
const myHeaders = new Headers();
myHeaders.append("apikey", "nsqhssAx6LGnaMYYwtFOe6shhQWElGFh");


function CurrencyConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [date, setDate] = useState()

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log("fetching data", Object.keys(data.rates))
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setDate(data.date)
        setFromCurrency("USD")
        setToCurrency("CNY")
        setExchangeRate(data.rates["CNY"])
      })
    
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
    <Header/>
    <Container>
      <h1>Convert </h1>
      <h2> Date {date}</h2>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </Container>

    </>
  );
}

export default CurrencyConverter;