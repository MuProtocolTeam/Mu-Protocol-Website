import './index.scss';

import React, {useCallback, useEffect, useState, useMemo, useContext} from 'react';

const Features = () => {

    return (
        <div className="f_c_c_c hp_features">
            <div className={`f_c_l section_s features`}>
                <div className={'title m_b_25'}>Features</div>

                <div className={'f_c_l gap-10'}>
                    <div className={'f_r_b f_item'}>
                        <div className={'f_c_l'}>
                            <div className={'index'}>01</div>
                            <div className={'f_title b'}>{`High capital efficiency`}</div>
                            <div className={'f_des'}>{`Offer 0% interest loan with up to 110% collateral ratio`}</div>
                        </div>

                        <div className={'f_learn_more b cp'}>{`Learn more →`}</div>
                    </div>

                    <div className={'f_r_b f_item f_item_2'}>
                        <div className={'f_c_l'}>
                            <div className={'index'}>02</div>
                            <div className={'f_title b'}>{`True decentralization`}</div>
                            <div className={'f_des'}>{`Accept only centralization risk-averse collaterals: BTC, ETH, Aptos, Sui`}</div>
                        </div>

                        <div className={'f_learn_more b cp'}>{`Learn more →`}</div>
                    </div>

                    <div className={'f_r_b f_item f_item_3'}>
                        <div className={'f_c_l'}>
                            <div className={'index'}>03</div>
                            <div className={'f_title b'}>{`Guaranteed price peg`}</div>
                            <div className={'f_des'}>{`Design on time-tested CDP model with overcollateralization and instant liquidation`}</div>
                        </div>

                        <div className={'f_learn_more b cp'}>{`Learn more →`}</div>
                    </div>

                    <div className={'f_r_b f_item f_item_4'}>
                        <div className={'f_c_l'}>
                            <div className={'index'}>04</div>
                            <div className={'f_title b'}>{`Yield-generating use cases`}</div>
                            <div className={'f_des'}>{`LP Aggregator, Liquidation Automator, Max 11x Leverage`}</div>
                        </div>

                        <div className={'f_learn_more b cp'}>{`Learn more →`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
