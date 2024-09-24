import React, { useContext } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Lightbulb, LightbulbOff } from "lucide-react";

import { LIGHT } from "../types/message";
import { ThemeContext } from "../utils/Theme/ThemeContext";
import useBalance from "../utils/Hook/useBalance";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { balance } = useBalance();

  return (
    <div className="fixed top-0 left-0 right-0 bg-zinc-900 p-2 z-50 flex justify-between rounded-b-lg">
      <button
        onClick={toggleTheme}
        className="border-1 border-zinc-50 px-3 rounded-lg bg-[rgb(173,173,173)] text-zinc-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        {theme === LIGHT ? (
          <LightbulbOff size={20} className="text-black" />
        ) : (
          <Lightbulb size={20} className="text-black" />
        )}
      </button>
      <div className="flex items-center gap-1">
        <div className="text-zinc-400 text-sm font-semibold">
          {balance !== null ? (
            <p>{balance.toFixed(2)} SOL</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default Header;
