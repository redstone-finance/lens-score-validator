import { useState, useEffect } from "react";
import { BigNumber, providers } from "ethers";
import Web3Modal from "web3modal";

export const useWeb3Modal = () => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | null>(null);
  const [network, setNetwork] = useState<providers.Network | null>(null);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    setWeb3Modal(web3Modal);
  }, []);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  const connectWallet = async () => {
    if (web3Modal) {
      try {
        const instance = await web3Modal.connect();
        addListeners(instance);
        const provider = new providers.Web3Provider(instance);
        const network = await provider.getNetwork();
        setNetwork(network);
        const signer = provider.getSigner();
        setSigner(signer);
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const addListeners = (web3ModalProvider: any) => {
    web3ModalProvider.on("accountsChanged", () => {
      window.location.reload();
    });

    web3ModalProvider.on("chainChanged", async (chainId: BigNumber) => {
      window.location.reload();
    });
  };

  return {
    signer,
    network,
    connectWallet,
  };
};
