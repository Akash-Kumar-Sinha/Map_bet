import { useContext } from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import { ThemeContext } from "../utils/Theme/ThemeContext";
import { connection } from "../utils/Connection";
import Participant from "./Participant";

const Mapboard = () => {
  const { theme } = useContext(ThemeContext);
  const { publicKey, sendTransaction, connected } = useWallet();

  const handleBet = async () => {
    if (!connected) {
      console.log("Connect the wallet");
      return;
    }
    const betAccountPublicKey = new PublicKey(
      "jGBVZGZqDQZz97VFmkMxmzbsLCiW9XZpVx5GJXMWdMF"
    );
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const transaction = new Transaction();

      const betSolInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: betAccountPublicKey,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      });

      transaction.add(betSolInstruction);

      const signature = await sendTransaction(transaction, connection);
      console.log(`Transaction signature: ${signature}`);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <button
        onClick={handleBet}
        className={`p-4 bottom-8 rounded-md border transition-transform duration-300 transform hover:scale-105 shadow-lg ${
          theme === "DARK"
            ? `bg-zinc-100 text-zinc-900`
            : `bg-zinc-900 text-zinc-100`
        }`}
      >
        Join the bet
      </button>
      <div>
        <Participant />
      </div>
    </div>
  );
};

export default Mapboard;
