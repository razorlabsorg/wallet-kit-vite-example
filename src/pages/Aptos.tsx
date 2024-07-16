/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import razorLogo from '../assets/logo.png';
import "../App.css";
import {
  AptosConnectButton,
  useAptosAccountBalance,
  useAptosWallet,
  ErrorCode,
  formatCurrency,
} from "@razorlabs/wallet-kit";
import "@razorlabs/wallet-kit/style.css";


function App() {
  const wallet = useAptosWallet();
  const { balance } = useAptosAccountBalance();

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return value.toString("hex");
  }

  async function handleSignMsg() {
    if (!wallet.account) return;
    try {
      const msg = "Hello world!";
      // const msgBytes = new TextEncoder().encode(msg);
      const result = await wallet.signMessage({
        message: msg,
        nonce: '0',
      });
      console.log("verify signedMessage", result);
      if (!result) {
        alert(`signMessage succeed, but verify signedMessage failed`);
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`);
      }
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed (see response in the console)");
    }
  }

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
      <AptosConnectButton
        className={'aaa'}
        style={{ marginTop: '16px' }}
        onConnectSuccess={(name) => {
          console.log('connect success: ', name);
        }}
        onConnectError={(err) => {
          //@ts-ignore
          if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
            console.warn(
              'user rejected the connection to ' + err.details?.wallet,
            );
          } else {
            console.warn('unknown connect error: ', err);
          }
        }}
        onDisconnectSuccess={(name) => {
          console.log('disconnect success: ', name);
        }}
        onDisconnectError={(err) => {
          console.log('disconnect error: ', err);
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
                {formatCurrency(balance ?? 0, {
                  withAbbr: false,
                  decimals: 8,
                })}{" "}
                MOVE
              </p>
              <p>
                wallet publicKey: {uint8arrayToHex(wallet.account?.publicKey)}
              </p>
            </div>
            <div className={"btn-group"} style={{ margin: "8px 0" }}>
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

export default App;
