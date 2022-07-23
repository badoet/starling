//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

contract ContractTest is ContextUpgradeable, AccessControlUpgradeable {
    bytes32 public constant ROLE_ADMIN = keccak256("ADM");
    bytes32 public constant ROLE_MANAGER = keccak256("MGR");
    bytes32 public constant ROLE_GOVERNOR = keccak256("GOV");
    bytes32 public constant ROLE_OPERATOR = keccak256("OPS");

    bool public isActive;

    IERC20Upgradeable public token;

    string public name;

    /**
      * @dev Grants all roles to the
      * account that deploys the contract.
      */
    function initialize(address _token) public initializer {
        __AccessControl_init();

        isActive = true;

        token = IERC20Upgradeable(_token);

        // Need to setup the role admin first before granting role
        _setRoleAdmin(ROLE_ADMIN, ROLE_ADMIN);
        _setRoleAdmin(ROLE_MANAGER, ROLE_ADMIN);
        _setRoleAdmin(ROLE_GOVERNOR, ROLE_ADMIN);
        _setRoleAdmin(ROLE_OPERATOR, ROLE_ADMIN);

        // secondary role admin post role_admin self revoked
        _setRoleAdmin(ROLE_GOVERNOR, ROLE_GOVERNOR);
        _setRoleAdmin(ROLE_MANAGER, ROLE_MANAGER);
        _setRoleAdmin(ROLE_OPERATOR, ROLE_GOVERNOR);

        _grantRole(ROLE_ADMIN, _msgSender());
        _grantRole(ROLE_MANAGER, _msgSender());
        _grantRole(ROLE_GOVERNOR, _msgSender());
        _grantRole(ROLE_OPERATOR, _msgSender());
    }

    function setActive(bool _active) public {
        require(hasRole(ROLE_ADMIN, _msgSender()), "401");
        isActive = _active;
    }

    function setName(string memory _name) public {
        require(hasRole(ROLE_ADMIN, _msgSender()), "401");
        name = _name;
    }

    function setToken(address _token) public {
        require(hasRole(ROLE_ADMIN, _msgSender()), "401");
        token = IERC20Upgradeable(_token);
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
