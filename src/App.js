
import {getRate} from "./util/api";
import {WALLETS_INIT, CURRENCY} from "./constant";
import { useEffect, useState } from "react";

function App() {
  const [api, setApi] = useState(0);
  const [wallets, setWallets] = useState(WALLETS_INIT);
  const [walletFrom, setWalletFrom] = useState({});
  const [walletTo, setWalletTo] = useState({});
  const [rate, setRate] = useState(1);
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [errorBalance, setErrorBalance] = useState();
  
  console.log(errorBalance);
  
  useEffect(()=>{
    getRate(walletFrom.name,walletTo.name).then(res =>{
      if(res>0){
        setRate(res);
        setAmountTo(amountFrom*res)
      }
    })
  },[walletFrom,walletTo])
  // useEffect(()=>{
  //   const rate= getRate(walletFrom.name,walletTo.name).then(res =>{
  //     if(res>0){
  //       setApi(res);
  //     }
  //   })
    
  // },[])
  const handleOnchangeAmountFrom =(e) =>{
    const valueFrom = e.target.value;
    if(valueFrom > wallets[walletFrom.name]){
      setErrorBalance('Exceeds balance');
    }else{
      setErrorBalance(null);
    }
    setAmountFrom(valueFrom);
    setAmountTo(valueFrom*rate);
  }
  const handleOnchangeAmountTo =(e) =>{
    const valueFrom = e.target.value;
    console.log(e.target)
    console.log(wallets[walletFrom.name])
    if(valueFrom > wallets[walletFrom.name]){
      setErrorBalance('Exceeds balance');
      console.log()
    }else{
      setErrorBalance(null);
    }
    setAmountFrom(valueFrom/rate);
    setAmountTo(valueFrom);
  }

  const handleExchange =() =>{
    setWallets({
      ...wallets,
      [walletFrom.name] : wallets[walletFrom.name] - amountFrom,
      [walletTo.name] : +wallets[walletTo.name] + amountTo,
    })
    setAmountFrom(0)
    setAmountTo(0)
  }
  return ( 
    <div className="mx-auto w-full h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center space-y-6 ">
          <h1 className="text-2xl font-semibold text-gray-200">Currency Exchange</h1>
          <div className="bg-white p-6 w-full rounded-md md:w-96">
            <div className="flex justify-between">
              {CURRENCY.map(item =>(
                <button key={item.name} onClick={(e) =>setWalletFrom(item)} className={`py-1 border  border-indigo-500  uppercase rounded px-8 ${walletFrom.name===item.name?'text-white bg-indigo-500': 'text-indigo-500'}`}>{item.name}</button>
              ))}
            </div>
            {walletFrom.name ? (
            <div>
              <div className="flex  justify-between items-center mt-6">
                <span className="font-medium">
                  Balance: {walletFrom.symbol}
                  {wallets[walletFrom.name]}
                </span>
                <span className="text-gray-600">
                  -
                  <input
                    type="number"
                    step="0.1"
                    value={amountFrom}
                    onChange={(e) =>handleOnchangeAmountFrom(e)}
                    className={
                      `ml-2 w-28 h-10 border px-4 py-2 rounded-md outline-none ${errorBalance?'border-red-500': ''}`}
                  ></input>
                </span>
              </div>
              <div className="w-full text-right text-red-500 text-sm mt-1"><span>{errorBalance? errorBalance : ''}</span></div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Select your currency to exchange
            </p>
          )}
          </div>

          <div className="text-center">
            {walletFrom.name && walletTo.name && (<span className="text-white px-4 py-1 border rounded-xl">{walletFrom.symbol}1 = {walletTo.symbol}{rate}</span>)}
          </div>
          <div className="bg-white p-6 w-full rounded-md md:w-96">
            <div className="flex justify-between">
            {CURRENCY.map(item =>(
                <button key={item.name} onClick={(e) =>setWalletTo(item)} className={`py-1 border  border-indigo-500  uppercase rounded px-8 ${walletTo.name===item.name?'text-white bg-indigo-500': 'text-indigo-500'}`}>{item.name}</button>
              ))}
            </div>
            {walletTo.name ? (
            <div>
              <div className="flex  justify-between items-center mt-6">
                <span className="font-medium">
                  Balance: {walletTo.symbol}
                  {wallets[walletTo.name]}
                </span>
                <span className="text-gray-600">
                  -
                  <input
                    type="number"
                    value={amountTo}
                    onChange={(e) =>handleOnchangeAmountTo(e)}
                    className={
                      "ml-2 w-28 h-10 border px-4 py-2 rounded-md outline-none "}
                  ></input>
                </span>
              </div>
                      
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Select your currency to exchange
            </p>
          )}
          </div>
          <button disabled={errorBalance ||walletFrom.name===walletTo.name} onClick={handleExchange}  className={`${errorBalance ||walletFrom.name===walletTo.name ? 'cursor-not-allowed bg-gray-600 ' :''} w-full uppercase  text-white font-semibold bg-green-500 py-4 rounded-lg`}>Exchange</button>
        </div>
    </div>
   );
}

export default App;