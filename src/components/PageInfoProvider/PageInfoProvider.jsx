import React, { useMemo, useReducer, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PageInfoContext from './PageInfoContext';

const defaultPageInfo = {
    title: 'mUSD',
    description:
        'mUSD',
    nav: 'Home',
};

const reducer = (state, action) => {
    console.debug(`set page info...`);
    return state.nav === action.nav ? state : action;
};

const PageInfoProvider = (props) => {
    const [pageInfo, dispatch] = useState(defaultPageInfo);

    const contextWrapper = useMemo(
        () => ({
            pageInfo: pageInfo,
            dispatch: dispatch,
        }),
        [pageInfo],
    );

    return (
        <PageInfoContext.Provider value={contextWrapper}>
            <HelmetProvider>
                <Helmet>
                    <title>{pageInfo.title}</title>
                    <meta name="description" content={pageInfo.description} />
                </Helmet>
            </HelmetProvider>

            {props.children}
        </PageInfoContext.Provider>
    );
};

export default PageInfoProvider;
