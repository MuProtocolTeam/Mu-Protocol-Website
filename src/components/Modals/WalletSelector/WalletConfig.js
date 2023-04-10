export const WalletMap = {
    injected: {
        name: 'MetaMask',
        icon: 'i_metamask',
    },
    walletconnect: {
        name: 'WalletConnect',
        icon: 'i_walletconnect',
    },
    okx: {
        name: 'OKX wallet',
        icon: 'i_okx_wallet',
    },
    walletlink: {
        name: 'Coinbase',
        icon: 'i_coinbase',
    },
};

export const WalletConfig = [
    {
        name: WalletMap.injected.name,
        connector: 'injected',
        icon: WalletMap.injected.icon,
        des: 'Connect with MetaMask wallet',
        enable: () => {
            if (window.ethereum) {
                return !window.ethereum?.isOkxWallet;
            }

            return false;
        },
    },
    {
        name: WalletMap.okx.name,
        connector: 'injected',
        icon: WalletMap.okx.icon,
        des: 'OKX wallet',
        enable: () => {
            if (window.okxwallet) {
                return window.ethereum?.isOkxWallet;
            }

            return false;
        },
    },
    {
        name: WalletMap.walletconnect.name,
        connector: 'walletconnect',
        icon: WalletMap.walletconnect.icon,
        des: 'Connect with Walletconnect',
    },
    // {
    //     name:WalletMap.walletlink.name,
    //     connector:'walletlink',
    //     icon:WalletMap.walletlink.icon,
    //     des:'Connect with Coinbase wallet'
    // }
];
