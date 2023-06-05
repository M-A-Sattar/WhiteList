'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import React, { useEffect, useState, useRef } from 'react';
import { WHITELIST_CONTRACT_ADDRESS } from './constants';



export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [numOfWhitelisted, setNumOfwhitelisted] = useState(0);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    try{
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const {chainId} = await web3Provider.getNetwork();
      if(chainId !== 5) {
        window.alert("change the network to Goerli");
        throw new Error("change the network to Goerli")
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    } catch(err) {
      console.error(err);
    }
  };

  const checkIfAddressIsWhitelisted = async () => {
    try {
      const signer = getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const address = await signer.getAddress();
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);

    } catch(err) {
      console.error(err)
    }
  };

  const getNumberOfWhitelisted =async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted()
      setNumOfwhitelisted(_numOfWhitelisted);
    } catch(err) {
      console.error(err)
    }
  };
  
  
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressIsWhitelisted();
      getNumberOfWhitelisted();           
    } catch(err) {
      console.error(err);
    }    
  };

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
