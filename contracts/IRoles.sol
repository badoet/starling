pragma solidity ^0.8.0;

interface IRoles
{
  function isAdmin(address addr) external view returns (bool);
  function isOperator(address addr) external view returns (bool);
}
