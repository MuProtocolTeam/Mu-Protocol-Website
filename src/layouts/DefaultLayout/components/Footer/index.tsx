import React, { useState } from 'react';
import './index.scss';

const FooterLinksConfig = [
    {
        name: 'Discord',
        icon: 'i_social_media_discord',
        link: '#',
    },
    {
        name: 'Twitter',
        icon: 'i_social_media_twitter',
        link: '#',
    },
    {
        name: 'Telegram',
        icon: 'i_social_media_telegram',
        link: '#',
    },
    {
        name: 'GitHub',
        icon: 'i_social_media_gitHub',
        link: '#',
    },
];

const FooterLinks = () => (
    <div className="flex flex-wrap  gap-10">
        {FooterLinksConfig.map((item) => (
            <a key={item.name} href={item.link} target="_blank" rel="noreferrer" className={`i_icon_a i_icon_24 ${item.icon}`}>
            </a>
        ))}
    </div>
);

export default ({ layout }: { layout: any }) => {
    let today = new Date();
    let year = today.getFullYear();

    return (
        <div className="w-full footer">
            <div className="f_r_b w-full max-w-default lg:mx-auto pt-11 px-4">
                <div className={'f_c_l f_item'}>
                    <div className={'b'}>Resources</div>
                    <div className={'cp'}>Whitepaper</div>
                    <div className={'cp'}>FAQs</div>
                </div>

                <div className={'f_c_l f_item'}>
                    <div className={'b'}>Products</div>
                    <div className={'cp'}>Ecosystem</div>
                    <div className={'cp'}>Governance</div>
                </div>

                <div className={'f_c_l f_item'}>
                    <div className={'b'}>Developers</div>
                    <div className={'cp'}>Documentation</div>
                    <div className={'cp'}>Github</div>
                </div>

                <div className={'f_c_l f_item f_item_l'}>
                    <div className="flex gap-20 md:gap-4 flex-col md:flex-row justify-between md:items-center">
                        <FooterLinks />
                    </div>
                    <div className="w-full m_t_10">
                        <div className="">{`© ${year} Mu Inc. All rights reserved.`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
