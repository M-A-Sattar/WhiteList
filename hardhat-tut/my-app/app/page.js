import Image from 'next/image';
import styles from './page.module.css';
import { useClient } from 'next/client';
import { useState } from 'react';


export default function Home() {
  useClient();

  const [numOfWhitelisted, setnumOfwhitelisted] = useState(0);
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
        <img className={styles.image} src="./crypto-devs.svg" />
      </div>
        <footer> className={styles.footer}
          Made by crypto Devs
        </footer>
    </div>
  );
}