import React from "react";
import Transaction from "./Transaction";

export default function Withdraw() {
  return <Transaction id="Withdraw" opp="Deposit" link="/deposit"></Transaction>;
}
