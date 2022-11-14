import React from 'react'
import Transaction from './Transaction'

export default function Deposit() {
  return (
    <>
      <Transaction 
        id="Deposit" 
        opp="Withdrawl"
        link="/withdraw"
        ></Transaction>
    </>
    )
}
