pragma solidity >=0.6.0 <0.8.0;

contract TestContract {
  uint256 public tokenCounter; 

  constructor() public TestContract("TestContract", "TEST") {
    tokenCounter = 0; 
  }

  function setCounter(uint256 num) public returns (uint256) {
    tokenCounter = num;
    return tokenCounter;
  }
}