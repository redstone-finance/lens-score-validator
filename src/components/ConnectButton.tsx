interface Props {
  connectWallet: () => void;
}

export const ConnectButton = ({ connectWallet }: Props) => {
  return (
    <div>
      <button
        className="hover:opacity-75 text-white"
        onClick={() => connectWallet()}
      >
        Connect
      </button>
    </div>
  );
};
