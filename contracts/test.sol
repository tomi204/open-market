// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFT is ERC721, ReentrancyGuard {
    ////@dev state variables
    uint256 price;
    uint256 totalSupply;
    uint256 sold;
    string baseURI;
    uint256 private _nextTokenId;
    ////@dev events
    event NftMinted(address requester, uint256 tokenId);

    ////@dev constructor
    constructor() ERC721("ds", "om") {
        price = 1;
        totalSupply = 11;
        sold = 0;
        baseURI = _URI;
    }

    ////@dev mint functions

    function mintNative(
        address _to,
        uint256 quantity
    ) external payable nonReentrant {
        require(
            sold + quantity <= totalSupply,
            "There are not so many NFTs available"
        );

        require(msg.value == price * quantity, "Incorrect price"); // check if the value sent is equal to the price of the NFTs

        bool transferSuccessful = payable(owner).send(price * quantity); // transfer the total native token to the owner

        require(transferSuccessful, "Transfer failed"); // check if the transfer was successful or not and revert if it failed

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(_to, tokenId);
            emit NftMinted(msg.sender, tokenId);
            sold++;
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
