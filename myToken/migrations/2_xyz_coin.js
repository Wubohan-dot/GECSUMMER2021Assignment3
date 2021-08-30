var XYZCoin = artifacts.require("./XYZCoin.sol");

module.exports = function(deployer){
    deployer.deploy(XYZCoin);
};