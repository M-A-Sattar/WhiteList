"use client";

import Image from "next/image";
import Head from "next/head";
import styles from "./page.module.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import React, { useEffect, useState, useRef } from "react";
import { abi, WHITELIST_CONTRACT_ADDRESS } from "./constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 5) {
        window.alert("change the network to Goerli");
        throw new Error("change the network to Goerli");
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    } catch (err) {
      console.error(err);
    }
  };

  const addAddressToWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
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
    } catch (err) {
      console.error(err);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numberOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading....</button>;
      } else {
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      <button onClick={connectWallet} className={styles.button}>
        Connect your wallet
      </button>;
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressIsWhitelisted();
      getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "Goerli",
        providerOptions: {},
        disabledInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title> Whitelist dApp </title>
        <meta name="description" content="Whitelist-Dapp" />
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
        <div className={styles.description}>
          {numberOfWhitelisted} have already joined the Whitelist
        </div>
        {renderButton()}
        <div>
          <img className={module.image} alt="couldn't load" src="./crypto-devs.svg" />
        </div>
      </div>
      <footer className={styles.footer}>
        Made by crypto Devs
      </footer>     
    </div>
  );
}
