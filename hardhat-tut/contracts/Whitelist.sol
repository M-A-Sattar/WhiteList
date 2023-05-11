// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Whitelist {

    // max number of addresses which can be whitelisted
    uint8 public maxWhitelistedAddresses;

    // Keep track of number of addresses whitelisted till now
    uint8 public numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    
    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses =_maxWhitelistedAddresses;
        
    }

    function addAddressToWhitelist() public {
        
    }
}