// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {UUPSUpgradeable} from "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {NFT} from "./NFT.sol";

contract Creator is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    event crowCreated(address indexed crow, string userId);

    function initialize() public initializer {
        __Ownable_init(msg.sender);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function createCrow(
        string memory _baseURI,
        uint256 _price,
        uint256 _totalSupply,
        address _owner,
        string calldata _name,
        string memory _userId
    ) public {
        address newCrow = address(
            new NFT(_baseURI, _price, _totalSupply, _owner, _name)
        );
        //emit event
        emit crowCreated(newCrow, _userId);
    }
}
