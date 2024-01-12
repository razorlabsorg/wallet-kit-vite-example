import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from '@razorlabs/wallet-kit'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      {/* if you want to custiomize you wallet list, please check this doc
        https://kit.razorwallet.xyz/docs/components/WalletProvider#customize-your-wallet-list-on-modal
      */}
      <App />
    </WalletProvider>
  </React.StrictMode>,
)
