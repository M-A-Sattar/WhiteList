// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Whitelist {

    // max number of addresses which can be whitelisted
    uint8 public maxWhitelistedAddresses;

    // Keep track of number of addresses whitelisted till now

    mapping(address => bool) public whitelistedAddresses;

    uint8 public numAddressesWhitelisted;

    
    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses =_maxWhitelistedAddresses;
        
    }

    function addAddressToWhitelist() public {
        //msg.sender is the address of the user who called this function

        require(!whitelistedAddresses[msg.sender], "Sender already in the whitelist");
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "Max limit reached");
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted += 1;

    }
}