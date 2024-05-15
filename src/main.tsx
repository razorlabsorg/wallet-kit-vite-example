import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { SuiWalletProvider, AptosWalletProvider } from '@razorlabs/wallet-kit'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SuiWalletProvider>
        <AptosWalletProvider>
          {/* if you want to custiomize you wallet list, please check this doc
            https://kit.razorwallet.xyz/docs/components/WalletProvider#customize-your-wallet-list-on-modal
          */}
          <App />
        </AptosWalletProvider>
      </SuiWalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
