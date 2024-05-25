// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFT is ERC721, Ownable, ReentrancyGuard {
    ////@dev state variables
    uint256 price;
    uint256 totalSupply;
    uint256 sold;
    string baseURI;
    uint256 private _nextTokenId;

    ////@dev events
    event NftMinted(address requester, uint256 tokenId);

    ////@dev constructor
    constructor(
        string memory _URI,
        uint256 _price,
        uint256 _totalSupply,
        address _owner,
        string memory _name
    ) Ownable(_owner) ERC721(_name, _name) {
        price = _price;
        totalSupply = _totalSupply;
        sold = 0;
        baseURI = _URI;
    }

    ////@dev mint functions

    function mintNative(address _to) external payable nonReentrant {
        require(sold <= totalSupply, "There are not so many nfts");

        require(msg.value == price, "Incorrect price"); // check if the value sent is equal to the price of the NFT

        bool transferSuccessful = payable(owner()).send(price); // transfer the native token to the owner

        require(transferSuccessful, "transfer failed"); // check if the transfer was successful or not and revert if it failed

        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);
        emit NftMinted(msg.sender, tokenId);
        sold++;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
