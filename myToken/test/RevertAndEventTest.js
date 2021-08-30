const XYZCoin=artifacts.require("./XYZCoin");
const assert=require("chai").assert;
const truffleAssert=require("truffle-assertions");

contract('XYZCoin',(accounts) =>{
    let xyzcoin;

    beforeEach(async()=>{
        xyzcoin=await XYZCoin.new({from:accounts[5]});

    });

    it("An insufficient balance throws an error when trying to transfer tokens",function(){
        return XYZCoin.deployed().then(function(instance){
            
            return instance.transfer(accounts[1],1200,{from:accounts[1]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"error message must contain revert");
        })
    })

    it("Transferring from an account that has not explicitly authorized the transfer should revert the transaction",function(){
        return XYZCoin.deployed().then(function(instance){
            
            return instance.transferFrom(accounts[0],accounts[2],120,{from:accounts[1]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"error message must contain revert");
        })
    })
    

    it("The transfer() and transferFrom() functions must fire the Transferevent",async()=>{
        let transTX=await xyzcoin.transfer(accounts[6],10,{from:accounts[5]});
        xyzcoin.approve(accounts[6],200,{from:accounts[5]});
        let transFromTX=await xyzcoin.transferFrom(accounts[5],accounts[7],10,{from:accounts[6]});

        truffleAssert.eventEmitted(transTX,"Transfer");
        truffleAssert.eventEmitted(transFromTX,"Transfer");
    })
    
    it("The approve() function must fire the Approval event",async()=>{
        let apprTX=await xyzcoin.approve(accounts[6],20,{from:accounts[5]});

        truffleAssert.eventEmitted(apprTX,"Approval");
        
    })


})