import './index.scss';

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { getToken } from '../../contract/TokenContract';
import { utils, Contract } from 'ethers';
import ERC20Token_abi from '../../contract/abi/ERC20Token_abi';
import { useContractCall, useContractSend } from '../../components/ContractHooks';
import ContractConfig from '../../contract/ContractConfig';

const UI = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={'f_c_l_c w-full ui_helper'}>
            <div className={'f_c_l_c w-11/12 xl:w-pc-content'}>
                <div className={'i'}>
                    <div className={'title h2'}>Layouts</div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_r_l</div>
                            <div className={'i_l f_r_l'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_r_l_t</div>
                            <div className={'i_l f_r_l_t'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_r_r</div>
                            <div className={'i_l f_r_r'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_r_c</div>
                            <div className={'i_l f_r_c'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_r_b</div>
                            <div className={'i_l f_r_b'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_r_b_t</div>
                            <div className={'i_l f_r_b_t'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    {/* */}
                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_l</div>
                            <div className={'i_l f_c_l'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_c</div>
                            <div className={'i_l f_c_c'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_b</div>
                            <div className={'i_l f_c_b'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_c_c</div>
                            <div className={'i_l f_c_c_c'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_l_c</div>
                            <div className={'i_l f_c_l_c'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_c_l</div>
                            <div className={'i_l f_c_c_l'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'f_c_l'}>
                            <div className={'h3'}>f_c_c_r</div>
                            <div className={'i_l f_c_c_r'}>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                                <div className={'i_l_c'}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Width</div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-full</div>
                        <div className={'i_w w-full'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-11/12</div>
                        <div className={'i_w w-11/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-10/12</div>
                        <div className={'i_w w-10/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-9/12</div>
                        <div className={'i_w w-9/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-8/12</div>
                        <div className={'i_w w-8/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-7/12</div>
                        <div className={'i_w w-7/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-6/12</div>
                        <div className={'i_w w-6/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-5/12</div>
                        <div className={'i_w w-5/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-4/12</div>
                        <div className={'i_w w-4/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-3/12</div>
                        <div className={'i_w w-3/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-2/12</div>
                        <div className={'i_w w-2/12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>w-1/12</div>
                        <div className={'i_w w-1/12'}></div>
                    </div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Padding</div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>c_p_8(padding: 4px 8px;)</div>
                        <div className={'i_p c_p_8'}>
                            <div className={'i_p_c'}></div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>c_p_0_8(padding: 0 8px;)</div>
                        <div className={'i_p c_p_0_8'}>
                            <div className={'i_p_c'}></div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>c_p_12(padding: 8px 12px;)</div>
                        <div className={'i_p c_p_12'}>
                            <div className={'i_p_c'}></div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>c_p_16(padding: 0 16px;)</div>
                        <div className={'i_p c_p_16'}>
                            <div className={'i_p_c'}></div>
                        </div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>c_p_20(padding: 14px 20px;)</div>
                        <div className={'i_p c_p_20'}>
                            <div className={'i_p_c'}></div>
                        </div>
                    </div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Background color</div>
                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>bg_guide_msg_box, option_box(background-color: #f8fafa;)</div>
                        <div className={'i_bg r_6 option_box'}></div>
                    </div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Border style</div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>r_6</div>
                        <div className={'i_b r_6'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>br_6</div>
                        <div className={'i_b br_6'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>r_12</div>
                        <div className={'i_b r_12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>br_12</div>
                        <div className={'i_b br_12'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>r_16</div>
                        <div className={'i_b r_16'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>r_20</div>
                        <div className={'i_b r_20'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>br_20</div>
                        <div className={'i_b br_20'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>r_24</div>
                        <div className={'i_b r_24'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>br_16</div>
                        <div className={'i_b br_16'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>br_24</div>
                        <div className={'i_b br_24'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>brs_24(border & radius & box-shadow)</div>
                        <div className={'i_b brs_24'}></div>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>r_90</div>
                        <div className={'i_b r_90'}></div>
                    </div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Text style</div>

                    <div className={'h0'}>h0</div>
                    <div className={'h1'}>h1</div>
                    <div className={'h2'}>h2</div>
                    <div className={'h3'}>h3</div>
                    <div className={'f_18'}>f_18(font-size:18px)</div>
                    <div className={'h4'}>h4</div>
                    <div className={'h5'}>h5</div>
                    <div className={'c'}>c(content)</div>
                    <div className={'cg'}>cg(content_gray)</div>
                    <div className={'t'}>t(title)</div>
                    <div className={'f_12'}>f_12(font-size:12px)</div>
                    <div className={'b f_12'}>b(font-weight: 600;)</div>
                    <div className={'g f_12'}>g(gray)</div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Button style</div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>sub_btn_primary sub_btn_long_blue</div>
                        <button className={'i_btn w-4/12 sub_btn_primary sub_btn_long_blue'}>Button</button>
                    </div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>sub_btn_primary sub_btn_long_blue(disabled)</div>
                        <button className={'i_btn w-4/12 sub_btn_primary sub_btn_long_blue'} disabled={true}>
                            Button
                        </button>
                    </div>
                </div>

                <div className={'i'}>
                    <div className={'title h2'}>Modal style</div>

                    <div className={'w-full f_c_l'}>
                        <div className={'h3'}>overlay_container+common_modal</div>
                        <button
                            className={'i_btn w-2/12 sub_btn_primary sub_btn_long_blue'}
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            Show modal
                        </button>
                        <DemoModal open={showModal} setOpen={setShowModal} />
                    </div>
                </div>

                <TransactionDemo />
            </div>
        </div>
    );
};

const DemoModal = ({ open, setOpen }) => {
    return (
        <Modal
            title=""
            footer={null}
            open={open}
            width={576}
            onCancel={() => setOpen(false)}
            className={'overlay_container common_modal xxxx_some_customer_class'}
        >
            <div className={'f_r_l h3 m_title'}>
                <div
                    className={'i_icon_32 i_icon_button i_arrow_left'}
                    onClick={() => {
                        setOpen(false);
                    }}
                ></div>
                <div>Demo Modal</div>
            </div>

            <div className={'w-full c_p_20'}>content.xxxxxxxxxxxxxxxx</div>
        </Modal>
    );
};

const TransactionDemo = () => {
    const contractConfig = getToken('SPA');
    const contractAddress = contractConfig.address;
    const abi = new utils.Interface(ERC20Token_abi);
    const contract = new Contract(contractAddress, abi);
    const { send } = useContractSend(contract, 'transfer', 'SPA transfer testing');


    const testSend = () => {
        // let bn = toBignumber(1, 'SPA');
        console.debug(`test send...`);
        send('0x0805CF8647c047EC6a76CcfeD56D012d5be7715A', '1000000000000000000');
    };

    return (
        <div className={'i'}>
            <div className={'title h2'}>Transaction Demo</div>

            <div className={'w-full f_c_l'}>
                <div className={'h3'}>transaction modal</div>
                <button className={'i_btn w-2/12 sub_btn_primary sub_btn_long_blue'} onClick={testSend}>
                    Send SPA
                </button>
            </div>
        </div>
    );
};

export default UI;
