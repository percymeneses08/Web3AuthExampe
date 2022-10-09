import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import Header from '../../components/Header/Header'
// import "../../App.css";
import './home.css'
import RPC from "../../web3RPC"; // for using web3.js
//import RPC from "./ethersRPC"; // for using ethers.js

import SantaAnita from '../../assets/images/santa-anita.jpg'
import MarketIcon from '../../assets/images/market.svg'
import { keccak256 } from "ethers/lib/utils";
import Orange from '../../assets/images/orange.jpeg'
import Lettuce from '../../assets/images/lettuce.jpg'
import Potatoes from '../../assets/images/potatoes.jpg'

const { ethers } = require("ethers");
const abi = require("../../abi.json");
// const clientId = "YOUR_CLIENT_ID"; // get from https://dashboard.web3auth.io




const SC = "0x39801B099eE3Adf6aC83c2F890F901447e852992";

const Home = () => {
  const [price1, setPrice1] = useState(0)
  const [price2, setPrice2] = useState(0)
  const [price3, setPrice3] = useState(0)
  const [promedio, setPromedio] = useState(0)
  const [limitValue, setLimitValue] = useState(0)

  useEffect(() => {
    callContract()
  }, []);

  async function callContract() {
    // Configuring the connection to an Ethereum node
    const network = "goerli";
    const provider = new ethers.providers.InfuraProvider(
      network,
      "fdc6d9439b804675b8e14fffa732c706"
    );
    // Creating a signing account from a private key
    const signer = new ethers.Wallet("78c3442523c34dd142c9ec2915eb9806a622474772521d4eccb76db5ae0a69ee", provider);

    // devolverprice1
    const contract = new ethers.Contract(SC, abi, signer);
    const price1 = await contract.price1();
    const price2 = await contract.price2();
    const price3 = await contract.price3();
    const promedio = await contract.averagePrice();
    // const promedio = await contract.devolverpromedio();

    setPrice1(price1.toString());
    setPrice2(price2.toString());
    setPrice3(price3.toString());
    setPromedio(promedio.toString());
    // setPromedio(promedio)
    // console.log(promedio.toString()/10**18);
  }

  const handleChange = (e: any) => {
    setLimitValue(e.target.value);
  }

  const setLimitOrder = () => {
    console.log(limitValue)
  }

  return (
    <div className="container content-width">
      <Header />

      <div className="home-content-container">
        <article className="small-cards">
          <figure className="small-cards__image-container">
            <img src={Orange} alt="product" />
          </figure>
          <div className="small-cards__information">
            <p className="small-cards__information__title">{promedio}</p>
            <div className="small-cards__source-prices">
              <p className='small-cards__information__description'>{price1} €</p>
              <p className='small-cards__information__description'>{price2} €</p>
              <p className='small-cards__information__description'>{price3} €</p>
            </div>
            <input id="limit-order" type="number" value={limitValue} onChange=
              {(e) => handleChange(e)} />
            <button className="small-cards__button" onClick={setLimitOrder}>Set limit order</button>
          </div>
        </article>

        <article className="small-cards">
          <figure className="small-cards__image-container">
            <img src={Lettuce} alt="product" />
          </figure>
          <div className="small-cards__information">
            <p className="small-cards__information__title">10 € average</p>
            <div className="small-cards__source-prices">
              <p className='small-cards__information__description'>12 €</p>
              <p className='small-cards__information__description'>8 €</p>
              <p className='small-cards__information__description'>10 €</p>
            </div>
            <input id="limit-order" type="number" />
            <button className="small-cards__button" onClick={setLimitOrder}>Set limit order</button>
          </div>
        </article>

        <article className="small-cards">
          <figure className="small-cards__image-container">
            <img src={Potatoes} alt="product" />
          </figure>
          <div className="small-cards__information">
            <p className="small-cards__information__title">17.67 € average</p>
            <div className="small-cards__source-prices">
              <p className='small-cards__information__description'>25 €</p>
              <p className='small-cards__information__description'>15 €</p>
              <p className='small-cards__information__description'>13 €</p>
            </div>
            <input id="limit-order" type="number" />
            <button className="small-cards__button" onClick={setLimitOrder}>Set limit order</button>
          </div>
        </article>
      </div>

      <h1 className="alert">Se registró un límite</h1>


      {/* <footer className="footer">
        <a href="https://github.com/Web3Auth/Web3Auth/tree/master/examples/react-app" target="_blank" rel="noopener noreferrer">
          Source code
        </a>
      </footer> */}
    </div>
  );

}


export default Home