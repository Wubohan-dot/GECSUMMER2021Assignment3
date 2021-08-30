var XYZCoin=artifacts.require("./XYZCoin.sol");

contract("XYZCoin",function(accounts){
    var XYZCoinInstance;

    it("should set the token name successfully",function(){
        return XYZCoin.deployed().then(function(instance) {
            return instance.name();
        }).then(function(name){
            assert.equal(name,"myToken");
        });
    });
    
    it("After initialling, the tokens should belong to creator",function(){
        return XYZCoin.deployed().then(function(instance) {
            return instance.balanceOf("0xd16AAecB76318c363F5dfb6bA192163a3695d4d8");
        }).then(function(creatorBalance){
            assert.equal(creatorBalance,1000);
        });
    });

    it("One could transfer to others",function(){
        return XYZCoin.deployed().then(function(instance) {
            instance.transfer("0xED2761D87E0E32A4E31c5051d675E9238A35590d",0.5,{from:accounts[0]});
            return instance.balanceOf("0xED2761D87E0E32A4E31c5051d675E9238A35590d");
        }).then(function(balance){
            assert.equal(balance,0.5);
        });
    });    
})