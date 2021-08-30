pragma solidity ^0.5.1;

import "./ERC20.sol";

contract XYZCoin is ERC20{
    string private _name = "myToken";
    string private _symbol = "WBH";
    uint private _decimals = 0;
    uint private _totalSupply = 1000;
    uint public atry = 20;

    //to get user's balance according to his address
    mapping (address => uint256) public balances;

    //to get the amount of money one user allows another user to get
    mapping (address => mapping (address => uint256)) public allowed;

    constructor() public{
        balances[msg.sender]=1000;
    }

    function name() public view returns (string memory){
        return _name;
    }
    function symbol() public view returns (string memory){
        return _symbol;
    }
    function decimals() public view returns (uint256){
        return _decimals;
    }
    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance){
        balance = balances[_owner];
        return balances[_owner];
    }
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balances[msg.sender]>=_value);
        
        balances[msg.sender]=balances[msg.sender]-_value;
        balances[_to]=balances[_to]+_value;
        
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(allowed[_from][msg.sender]>=_value);
        require(balances[_from]>=_value);
        
        allowed[_from][msg.sender]=allowed[_from][msg.sender]-_value;
        balances[_to]+=_value;
        balances[_from]-=_value;
        
        emit Transfer(_from,_to,_value);
        return true;
    }
    function approve(address _spender, uint256 _value) public returns (bool success){
        require(balances[msg.sender]>=_value);
        allowed[msg.sender][_spender]=_value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }
    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowed[_owner][_spender];
    }

    
    function change(uint n) public returns(uint){
        atry=n;
        return atry;
    }

}