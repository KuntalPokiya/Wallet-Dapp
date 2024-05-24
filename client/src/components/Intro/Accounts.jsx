import { useState, useEffect } from "react";
import "./Accounts.css";

function Accounts({ web3, accountAddress }) {

  const [account, setAccount] = useState(null);
  const [accountBalance, setaccountBalance] = useState(0);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const allAccounts = async () => {
      setProvider("Ganache");  //web3.eth.currentProvider.host
    
      const select = document.querySelector("#selectNumber");
      try{
      const options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) { 
        let opt = options[i];
        let _element = document.createElement("option"); //to create options
        _element.textContent = opt; //to show account
        _element.value = opt; //to fetch account
        select.appendChild(_element); // to append(to add, to show) options @ choose an account 
      }
    }
    catch(error)
    {
      setProvider("Not Connected");
    }
    };
    web3 && allAccounts();
  }, [web3]);

  const selectAccount = async () => {
    let selectedAccountAddress = document.querySelector("#selectNumber").value;
    if(selectedAccountAddress && selectedAccountAddress!=="Choose an account"){
    accountAddress(selectedAccountAddress);
    const accountBalance = await web3.eth.getBalance(selectedAccountAddress);
    const etherBalance =web3.utils.fromWei(accountBalance,"ether");
    setaccountBalance(etherBalance);
    setAccount(selectedAccountAddress);
  }
  };

  return (
    <>
      <form id="myForm" className="form">
        <select id="selectNumber" onChange={selectAccount} className="form-select"> // onchange will call selectAccount 
          <option>Choose an account</option>
        </select>
      </form>
      <div class="account-container">

      <p className="account-label"><b>Connected Account:</b> {account}</p>  

      <br></br>

      <p className="account-label"><b>Account Balance:</b>{accountBalance} ether</p>
      
      <br></br>
      
      <p className="account-label"><b>Provider:</b>{provider}</p>

      </div>
    </>
  );
}

export default Accounts;
//To have
//there should be no need of from field. The selected account should send transaction
//check balance before transfering
