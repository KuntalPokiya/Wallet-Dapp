import { useState } from "react";
import "./SendEther.css"

function SendEther({ web3, account }) {
  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);

  const sendEther = async (event) => {
    event.preventDefault(); // to prevent page from reloading
    const _to = document.querySelector("#to").value;                    // const _from = document.querySelector("#from");
    const _value = document.querySelector("#value").value;
    const weiValue = web3.utils.toWei(_value, "ether");
    web3.eth.sendTransaction({
        from: account, //_from.value,
        to: _to,
        value: weiValue,
      })

      .then(function (receipt) {   //after completion of transaction call receipt function
        setReceipt(receipt);
        setToggle(true);
      });
  };
  return (
    <>
      <div class="form-container">
      <form onSubmit={sendEther}>
        {/* <p>
          <input type="text" id="from" placeholder="from"></input>
        </p> */}
        <p>
          <label for="to" class="form-label">Account Address of the Receiver:</label>
          <input type="text" id="to" placeholder="to" className="form-input"></input>
        </p>

        <p>
          <label for="value" class="form-label">Amount to be send:</label>
          <input type="text" id="value" placeholder="value" className="form-input"></input>
        </p>
        <button type="submit" className="form-button">Send</button>
      </form>
      </div>

      <pre>
        <code>
          {toggle &&
            JSON.stringify(
              receipt,
              ["transactionHash", "blockHash", "blockNumber", "gasUsed"],
              2
            )}
        </code>
      </pre>
    </>
  );
}

export default SendEther;
