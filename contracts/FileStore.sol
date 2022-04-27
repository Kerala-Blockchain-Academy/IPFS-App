// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

contract FileStore {
    
    address owner;
    
    constructor(address _owner ) {
        owner = _owner;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
    mapping(uint => bytes) public fileHash;
    
    function setFileHash(uint _uid,bytes memory _fileHash) public onlyOwner {
        fileHash[_uid] = _fileHash;
    }
}