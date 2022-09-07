import { ConnectButton } from "./components/ConnectButton";
import { ScoreValidator } from "./components/ScoreValidator";
import { useWeb3Modal } from "./hooks/useWeb3Modal";

export const App = () => {
  const { signer, network, connectWallet } = useWeb3Modal();

  const isGoerli = network?.name === "goerli";

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-800">
      {signer ? (
        isGoerli ? (
          <ScoreValidator signer={signer} />
        ) : (
          <p className="text-white font-bold text-lg">
            Please connect to Goerli network
          </p>
        )
      ) : (
        <ConnectButton connectWallet={connectWallet} />
      )}
    </div>
  );
};
