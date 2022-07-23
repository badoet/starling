// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20PresetMinterPauser, Ownable {
  using SafeERC20 for IERC20;
  using Address for address;

  constructor() ERC20PresetMinterPauser("TestToken", "ARB") {
    _mint(msg.sender, 100000000000000000000000000); // Mint 100,000,000 tokens
  }
}
