import './index.scss';

import React, {useCallback, useEffect, useState, useMemo, useContext} from 'react';

const Banner = () => {

    return (
        <div className="f_c_c_c hp_banner">
            <div className={`f_r_b section_s banner`}>
                <div>
                    <div className={'b title'}>{`mUSD,`}</div>
                    <div className={'des m_t_20'}>{`0% interest loan empowered by a decentralized stablecoin`}</div>
                </div>

                <div className={'icon_website_logo logo'}></div>
            </div>
        </div>
    );
};

export default Banner;
