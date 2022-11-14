import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

//TODO:  Improve Error handling
//TODO:  Create a new module for server interactions, and import the functions
//TODO:  Validation againt over drawing

export default function Transaction(props) {
  const { currentUser } = useAuth();
  const transactionRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState();

  async function getBalance() {
    setLoading(true);

    const url = `/account/${currentUser.email}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //JSON Stores in strings, remeber that!!
        let bal = parseInt(data[0].balance);
        setBalance(bal);
      })
      .catch((err) => console.log(err));
    setLoading(false);
    return;
  }

  async function writeToDB(id, bal) {
    setLoading(true);
    const url = `/account/transaction/${id}/${bal}`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok !== 1) throw new Error("failed to write to db");
      })
      .catch((err) => console.log(err));
    setLoading(false);
    return;
  }

  async function adjustBalance(bal, trans) {
    let newValue
    bal = parseInt(bal);

    if(props.id ==="Deposit"){
      newValue = bal + trans;
    };
    if(props.id ==="Withdraw"){
      newValue = bal - trans;
      if(newValue < 0) throw 'Insufficient Balance';
    }
    
    await writeToDB(currentUser.email, newValue);
    await getBalance();
    return;
  }

  async function handleTransaction(e) {
    e.preventDefault();
    let transaction = parseInt(transactionRef.current.value);

    try {
      setError("");
      setLoading(true);
      await adjustBalance(balance, transaction);
    } catch {
      setError('Transaction Failed')
      setTimeout(() => {
        setError('');
        setLoading(false)}, 2000)
      
    }
  }

  useEffect(() => {
    getBalance();
  }, [currentUser]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Current Balance: ${balance}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleTransaction}>
            <Form.Group id="transaction"></Form.Group>
            <Form.Label>Enter Amount for {props.id}</Form.Label>
            <Form.Control type="number" ref={transactionRef} required />
            <Button className="w-100 mt-4" disabled={loading} type="submit">
              {props.id}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Want to make a {props.opp}? <Link to={props.link}>{props.opp}</Link>
      </div>
    </>
  );
}
