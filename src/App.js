import './App.css'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text, Label } from 'recharts';

function App() {

  const [intervalWait, setIntervalWait] = useState(5000)
  const [intervalId, setIntervalId] = useState(null)
  const [position, setPosition] = useState(1080.50862877)
  const [prices, setPrices] = useState([{last: position, date: 'Initial Position'}])

  const fetchPrice = () => {
    fetch('https://www.mercadobitcoin.net/api/LTC/ticker/') //bitvalor
      .then(result => result.json())
      .then(result => setPrices(prices => [
        {
          ...result.ticker,
          date: `${new Date(result.ticker.date * 1000).toLocaleDateString()} ${new Date(result.ticker.date * 1000).toLocaleTimeString()}`
        },
        ...prices
      ]))
  }

  useEffect(() => {
    fetchPrice()
    window.clearInterval(intervalId)
    setIntervalId(() => window.setInterval(fetchPrice, intervalWait))
  }, [intervalWait])

  return (
    <div className="App">
      {/* {prices.map(price => (<pre>{JSON.stringify(price, null, 2)}</pre>))} */}

      
        <LineChart
          width={1400}
          height={400}
          data={[].concat(prices).reverse()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Label>Litecoin</Label>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', ]}/>
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="last" stroke="blue" activeDot={{ r: 8 }} isAnimationActive={false}/>
        </LineChart>


      <h2 float='right'>My position: <b>{position}</b></h2>
      <h2>Prices: </h2>
      <div className="prices">
        {prices.map(price => (
          <p  key={price.date} >
            {price.date} <span>{price.last}</span> ({Math.floor(((price.last - position)/position) * 100000)/1000}%)
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
