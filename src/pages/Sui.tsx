/* eslint-disable @typescript-eslint/no-explicit-any */
import razorLogo from '../assets/logo.png';
import "../App.css";
import {
  SuiConnectButton,
  useSuiAccountBalance,
  useSuiWallet,
  // SuiChainId,
  ErrorCode,
  formatSUI,
} from "@razorlabs/wallet-kit";
import "@razorlabs/wallet-kit/style.css";
// import { TransactionBlock } from "@mysten/sui.js/transactions";
// import { useMemo } from "react";

// type StringOrNumber = string | number;

/* const sampleNft = new Map<StringOrNumber, string>([
  [
    "movement:m2:devnet",
    "0x2f60e33e33a1c880e8749073c5ef89288cf4df8974d8b872dfd72bc6c58f1172::nft::mint",
  ],
]); */

function Sui() {
  const wallet = useSuiWallet();
  const { balance } = useSuiAccountBalance();
  /* const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return sampleNft.get(wallet.chain.id) ?? "";
  }, [wallet]); */

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return value.toString("hex");
  }

  /* async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure("Razor NFT"),
          tx.pure("Razor Sample NFT"),
          tx.pure(
            "https://ipfs.io/ipfs/QmYbAuxRGdSgNsfDopufzRrXsXfeuRsMnd1T1JR7qdi5Kn"
          ),
        ],
      });
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log("executeMoveCall success", resData);
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  } */

  async function handleSignMsg() {
    if (!wallet.account) return;
    try {
      const msg = "Hello world!";
      const msgBytes = new TextEncoder().encode(msg);
      const result = await wallet.signPersonalMessage({
        message: msgBytes,
      });
      const verifyResult = await wallet.verifySignedMessage(
        result,
        wallet.account.publicKey
      );
      console.log("verify signedMessage", verifyResult);
      if (!verifyResult) {
        alert(`signMessage succeed, but verify signedMessage failed`);
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`);
      }
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed (see response in the console)");
    }
  }

  /* const chainName = (chainId: StringOrNumber | undefined) => {
    switch (chainId) {
      case SuiChainId.MAIN_NET:
        return "M2 Mainnet";
      case SuiChainId.TEST_NET:
        return "M2 Testnet";
      case SuiChainId.DEV_NET:
        return "M2 Devnet";
      default:
        return "Unknown";
    }
  }; */

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://github.com/razorlabsorg/wallet-kit" target="_blank">
          <img src={razorLogo} className="logo" alt="Razor logo" />
        </a>
      </div>
      <h1>Vite + Razor Kit</h1>
      <div className="card">
        <SuiConnectButton
          onConnectError={(error) => {
            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
              console.warn(
                "user rejected the connection to " + error.details?.wallet
              );
            } else {
              console.warn("unknown connect error: ", error);
            }
          }}
        />

        {!wallet.connected ? (
          <p>Connect DApp with Razor wallet from now!</p>
        ) : (
          <div>
            <div>
              <p>current wallet: {wallet.adapter?.name}</p>
              <p>
                wallet status:{" "}
                {wallet.connecting
                  ? "connecting"
                  : wallet.connected
                  ? "connected"
                  : "disconnected"}
              </p>
              <p>wallet address: {wallet.account?.address}</p>
              <p>current network: {wallet.chain?.name}</p>
              <p>
                wallet balance:{" "}
                {formatSUI(balance ?? 0, {
                  withAbbr: false,
                })}{" "}
                MOVE
              </p>
              <p>
                wallet publicKey: {uint8arrayToHex(wallet.account?.publicKey)}
              </p>
            </div>
            <div className={"btn-group"} style={{ margin: "8px 0" }}>
              {/* {nftContractAddr && (
                <button onClick={() => handleExecuteMoveCall(nftContractAddr)}>
                  Mint {chainName(wallet.chain?.id)} NFT
                </button>
              )} */}
              <button onClick={handleSignMsg}>signMessage</button>
            </div>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and Razor logos to learn more
      </p>
    </div>
  );
}

export default Sui;
