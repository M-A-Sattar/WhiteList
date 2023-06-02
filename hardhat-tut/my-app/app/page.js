import Image from 'next/image';
import styles from './page.module.css';
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import React, { useEffect, useState, useRef } from 'react';
import { walletconnect } from 'web3modal/dist/providers/connectors';
import ConnectToWalletConnect from 'web3modal/dist/providers/connectors/walletconnect';


export default function Home() {

  useClient();

  const [walletConnected, setWalletConnected] = useState(false);
  const [numOfWhitelisted, setnumOfwhitelisted] = useState(0);
  const web3ModalRef = useRef();

  const connectWallet = async() => {
    try {

      setWalletConnected(true)
    } catch(err) {
      console.error(err)
    }
    
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disabledInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <head>
        <title> Whitelist dApp </title>
        <meta name="description" content="Whitelist-Dapp" />
      </head>
      <div className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Crypto Devs!
        </h1>
        <div className={styles.description}>
          {numOfWhitelisted} have already joined the Whitelist
        </div>
      </div>
      <div>
        <img className={module.image} src="./crypto-devs.svg" />
      </div>
        <footer> className={styles.footer}
          Made by crypto Devs
        </footer>
    </div>
  );
}
