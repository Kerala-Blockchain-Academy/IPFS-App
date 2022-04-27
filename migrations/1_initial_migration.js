const FileStore = artifacts.require("FileStore");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(FileStore, accounts[0]);
};
