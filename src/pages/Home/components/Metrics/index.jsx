import './index.scss';

import React, {useCallback, useEffect, useState, useMemo, useContext} from 'react';
import {useGetObject} from "../../../../components/ContractHooks";
import {Amount, TokenAmount} from "../../../../utils/TokenAmountConverter";
import {getToken} from "../../../../contract/TokenContract";
import {TransactionBlock} from "@mysten/sui.js";
import WebThreeContext from "../../../../components/WebThreeProvider/WebThreeContext";
import { useWalletKit } from "@mysten/wallet-kit";

const Metrics = () => {
    const web3Context = useContext(WebThreeContext);
    const { signAndExecuteTransactionBlock, signTransactionBlock } = useWalletKit();

    let musdToken = getToken('mUSD');
    let collateralToken = getToken('COLLATERAL');

    const [collateralBalance, setCollateralBalance] = useState(new TokenAmount(0, musdToken, false, 0));
    const [collateralRatio, setCollateralRatio] = useState(new Amount(0));
    const [totalDebt, setTotalDebt] = useState(new TokenAmount(0, musdToken, false, 0));

    const registryObject = useGetObject(`0x69b422b263718262507c7167aa693e671d85cf8a4b29c20be49da7879b60aec8`);

    const circulatingMUSDObject = useGetObject(`0x37ef7f9d668519d0f072ae0c617957678d4583fba6972736fcc2e820de41c80e`);
    const circulatingMUSD = useMemo(() => {
        if(circulatingMUSDObject){
            let amount = circulatingMUSDObject?.total_supply?.fields?.value;
            return new TokenAmount(amount, musdToken, false, 0);
        }

        return new TokenAmount(0, musdToken, false, 0);
    }, [circulatingMUSDObject]);

    useEffect(() => {
        if(registryObject){
            console.debug(`registryObject =>`, registryObject);

            setCollateralBalance(new TokenAmount(registryObject?.global_collateral, collateralToken, false, 0));
            setTotalDebt(new TokenAmount(registryObject?.global_debt, musdToken, false, 0));
        }
    }, [registryObject]);

    useEffect(() => {
        if(web3Context.account){
            let packageObjectId = `0x4f6995bd1440cbe07dbf1259209a49226e874e28c472f9fe0227711d137a55d3`;
            const tx = new TransactionBlock();
            tx.setSender(web3Context.account);
            tx.moveCall({
                target: `${packageObjectId}::vault::get_vault_balance`,
                arguments: [tx.object(`0xcd226aa741272a1c648c30e02ad3b71a478885a16197fb0df06ebe6083719095`)],
            });

            tx.build({provider: web3Context.provider}).then(result => {
                console.debug(`tx.bytes =>`, result);

                let transactionBlock = {
                    transactionBlock: result
                };
                web3Context.provider.dryRunTransactionBlock(transactionBlock).then((_result) => {
                    console.debug(`dryRunTransactionBlock: result =>`, _result);
                }).catch((e) => {
                    console.error(`Error =>`,e);
                });
            });
        }
    }, [web3Context]);

    // useEffect(() => {
    //     if(web3Context.account){
    //         let packageObjectId = `0x4f6995bd1440cbe07dbf1259209a49226e874e28c472f9fe0227711d137a55d3`;
    //         const tx = new TransactionBlock();
    //         tx.setSender(web3Context.account);
    //         tx.moveCall({
    //             target: `${packageObjectId}::vault::mint`,
    //             arguments: [
    //                 tx.object(`0x69b422b263718262507c7167aa693e671d85cf8a4b29c20be49da7879b60aec8`),
    //                 tx.object(`0xcd226aa741272a1c648c30e02ad3b71a478885a16197fb0df06ebe6083719095`),
    //                 tx.object(`0x5ee201e2865b9682d3e12b0ec201a5e7e9e7f4ae2040d554d3516ae5d4e0690e`),
    //                 tx.object(`0x8b102bde3b29dc26e50e8f1e7c5e621544d39f00bcb1d5a5f2d3818ce038e30c`),
    //                 tx.object(`0x6da532014ec3de41526894f143a329867a391e125ecccb2269a29f36e6536ae3`),
    //                 tx.object(`0xd19cfd3057ee9c9a222e2aa893ead650f7774a48bd1b34eac6b1a17501cf37bd`),
    //                 tx.object(`0x37ef7f9d668519d0f072ae0c617957678d4583fba6972736fcc2e820de41c80e`),
    //                 tx.object(`0x713293bebe5c1cb8cf99edfb0dbbc9a0cccc44989ea6c06be56f13cfd0ccc0c4`),
    //                 tx.pure(`100000000`)
    //             ],
    //         });
    //
    //         signAndExecuteTransactionBlock({
    //             transactionBlock: tx,
    //         }).then(response => {
    //            console.debug(`tx response =>`, response);
    //         });
    //     }
    // }, [web3Context]);

    return (
        <div className="f_c_c_c hp_metrics">
            <div className="f_r_b section_s metrics">
                <div className={'m_item m_item_1'}>
                    <div className={'mi_title'}>{`Collateral balance`}</div>
                    <div className={'mi_content'}>{`${collateralBalance.amount.formativeValue} COLLATERAL`}</div>
                </div>

                {/*
            <div className={'m_item'}>
                <div className={'mi_title'}>{`Collateral ratio`}</div>
                <div className={'mi_content'}>{`100%`}</div>
            </div>
            */}

                <div className={'m_item m_item_2'}>
                    <div className={'mi_title'}>{`Total debt`}</div>
                    <div className={'mi_content'}>{`${totalDebt.amount.formativeValue} mUSD`}</div>
                </div>

                <div className={'m_item m_item_3'}>
                    <div className={'mi_title'}>{`Circulating mUSD`}</div>
                    <div className={'mi_content'}>{`${circulatingMUSD.amount.formativeValue} mUSD`}</div>
                </div>
            </div>
        </div>
    );
};

export default Metrics;
