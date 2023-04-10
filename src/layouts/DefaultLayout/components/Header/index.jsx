import './index.scss';

import React, { useCallback, useEffect, useState } from 'react';
import useHeaderVO from './HeaderVO';
import logo from '/src/assets/img/icon_website_logo.svg';
import WalletConnect from './components/WalletConnect';
import { useContext } from 'react';
import PageInfoContext from '../../../../components/PageInfoProvider/PageInfoContext';
import { Link } from 'react-router-dom';
import ConditionDisplay from '../../../../components/ConditionDisplay';

const DefaultHeader = ({ navArr, pageInfoContext }) => {
    return (
        <div className="w-full h-full flex flex-row justify-between">
            <div className="flex flex-row items-center justify-center">
                <a href="/" className={'logo_link'}>
                    <img alt="icon" src={logo} className="logo" />
                </a>
            </div>
            <div className="operations">
                <div className="hidden lg:block">
                    <WalletConnect />
                </div>
            </div>
        </div>
    );
};

const Header = ({ layout }) => {
    const [navArr] = useHeaderVO();
    const pageInfoContext = useContext(PageInfoContext);

    return (
        <div className="w-full">
            <div className="header_container">
                <div className="max-w-default w-full">
                    <DefaultHeader navArr={navArr} pageInfoContext={pageInfoContext} />
                </div>
            </div>
        </div>
    );
};

export default Header;
