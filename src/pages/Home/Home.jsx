import './index.scss';

import React, { useContext, useEffect } from 'react';
import PageInfoContext from '../../components/PageInfoProvider/PageInfoContext';
import Metrics from "./components/Metrics";
import Banner from "./components/Banner";
import Features from "./components/Features";
import MintRedeem from "./components/MintRedeem";

const Home = () => {
    const pageInfoContext = useContext(PageInfoContext);

    useEffect(() => {
        pageInfoContext.dispatch({
            title: 'Mu Protocol',
            description: 'Mu Protocol',
            nav: 'Home',
        });
    }, []);

    return (
        <div className={'f_c_l_c w-full hp_sections'}>
            <Banner/>
            <Features/>
            <Metrics/>
            <MintRedeem/>
        </div>
    );
};

export default Home;
