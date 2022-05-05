import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import tokenAbi from "./tokenAbi.json";
import contractAbi from "./contractAbi.json"

function App() {
  const [amount, setAmount] = useState(10);
  const stakingAddress = "0x495D52a8Abd1C76B5265Ff7970A02813AA26A797";
  let tokenAddress = "0x95EC2C05Eb5f1009BE862E3545D858C7857f2E31";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
  const stakingContract = new ethers.Contract(stakingAddress , contractAbi, signer)

  const handleApprovel = async (e) => {
    e.preventDefault();
    const weiAmount = amount * 100000000000000;
    await tokenContract.approve(stakingAddress, weiAmount);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    const weiAmount = amount * 100000000000000;
    await stakingContract.deposit();
  };

  const handleWithrawIntrest = async (e) => {
    e.preventDefault();
    await stakingContract.withdrawIntrest();
  };
  
  const handleWithdraw = async (e) => {
    e.preventDefault();
    await stakingContract.withdrawDeposit();
  };

  return (
    <div className="App">
      <Container>
        <Card>
          <Card.Header>Step 1 - Approve Transaction</Card.Header>
          <Card.Body>
            <Form onSubmit={handleApprovel}>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              <Button type="submit">Approve Transaction</Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <br />
          <Card.Header>Step 2 - Deposit</Card.Header>
          <Card.Body>
            <Form onSubmit={handleDeposit}>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              <Button type="submit">Deposit</Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <br />
          <Card.Header>Step 3- Withdraw Intrest</Card.Header>
          <Card.Body>
            <Form onSubmit={handleWithrawIntrest}>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              <Button type="submit">Withdraw Intrest</Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <br />
          <Card.Header>Step 4 - Withdraw Deposit</Card.Header>
          <Card.Body>
            <Form onSubmit={handleWithdraw}>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              <Button type="submit">Withdraw Deposit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
