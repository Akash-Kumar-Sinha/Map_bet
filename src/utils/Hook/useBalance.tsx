import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import { connection } from "../Connection";

const useBalance = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    let subscriptionId: number;

    const fetchBalance = async () => {
      try {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(balanceInSOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    const subscribeToBalanceChanges = () => {
      try {
        subscriptionId = connection.onAccountChange(
          publicKey,
          (accountInfo) => {
            const balanceInLamports = accountInfo.lamports;
            const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
            setBalance(balanceInSOL);
          }
        );
      } catch (error) {
        console.error("Error subscribing to account changes:", error);
      }
    };

    fetchBalance();
    subscribeToBalanceChanges();

    return () => {
      if (subscriptionId) {
        connection.removeAccountChangeListener(subscriptionId);
      }
    };
  }, [publicKey]);

  return { balance };
};

export default useBalance;
