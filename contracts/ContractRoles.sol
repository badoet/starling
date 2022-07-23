//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

contract ContractRoles is ContextUpgradeable, AccessControlUpgradeable {
    bytes32 public constant ROLE_ADMIN = keccak256("ADM");
    bytes32 public constant ROLE_OPERATOR = keccak256("OPS");

    /**
      * @dev Grants all roles to the
      * account that deploys the contract.
      */
    function initialize() public initializer {
        __AccessControl_init();

        // Need to setup the role admin first before granting role
        _setRoleAdmin(ROLE_ADMIN, ROLE_ADMIN);
        _setRoleAdmin(ROLE_OPERATOR, ROLE_ADMIN);

        _grantRole(ROLE_ADMIN, _msgSender());
        _grantRole(ROLE_OPERATOR, _msgSender());
    }

    function isAdmin(address _addr) public view returns (bool) {
        return hasRole(ROLE_ADMIN, _addr);
    }

    function isOperator(address _addr) public view returns (bool) {
        return hasRole(ROLE_OPERATOR, _addr);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit(uint256 amount) payable public {
        require(hasRole(ROLE_ADMIN, _msgSender()), "401");
        require(msg.value == amount, "500");
        // nothing else to do!
    }

    // Function to withdraw all ONE from this contract.
    function withdraw() public {
        require(hasRole(ROLE_ADMIN, _msgSender()), "401");
        // get the amount of ONE stored in this contract
        payable(_msgSender()).transfer(address(this).balance);
    }
}
