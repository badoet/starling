//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import "./IRoles.sol";

contract ContractTest is ContextUpgradeable, OwnableUpgradeable {
    bool public isActive;

    IERC20Upgradeable public token;

    string public name;
    IRoles private rolesContract;

    /**
      * @dev Grants all roles to the
      * account that deploys the contract.
      */
    function initialize(address _token, address _rolesAddr) public initializer {
        __Ownable_init();

        isActive = true;

        token = IERC20Upgradeable(_token);
        rolesContract = IRoles(_rolesAddr);
    }

    function setActive(bool _active) public {
        require(rolesContract.isAdmin(_msgSender()), "401");
        isActive = _active;
    }

    function setName(string memory _name) public {
        require(rolesContract.isAdmin(_msgSender()), "401");
        name = _name;
    }

    function setToken(address _token) public {
        require(rolesContract.isAdmin(_msgSender()), "401");
        token = IERC20Upgradeable(_token);
    }

    function setContractRoles(address _addr) public onlyOwner {
        require(rolesContract.isAdmin(_msgSender()), "401");
        rolesContract = IRoles(_addr);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit(uint256 amount) payable public {
        require(rolesContract.isAdmin(_msgSender()), "401");
        require(msg.value == amount, "500");
        // nothing else to do!
    }

    // Function to withdraw all ONE from this contract.
    function withdraw() public {
        require(rolesContract.isAdmin(_msgSender()), "401");
        // get the amount of ONE stored in this contract
        payable(_msgSender()).transfer(address(this).balance);
    }
}
