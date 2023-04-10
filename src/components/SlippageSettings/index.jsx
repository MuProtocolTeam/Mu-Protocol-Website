import './index.scss';
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import NumberPicker from 'rc-input-number/es';
import { numberInputValueFormat } from '../../utils/NumberFormat';
import Button from '../Button';
import ConditionDisplay from '../ConditionDisplay';

const SLIPPAGE_ITEMS = [
    {
        key: '0.1',
        value: '0.001',
    },
    {
        key: '0.5',
        value: '0.005',
    },
    {
        key: '1',
        value: '0.01',
    },
];

const SlippageSettings = ({ slippageKey = `TX_SLIPPAGE`, show = false, setShow }) => {
    const [slippageCache, cacheSlippage] = useLocalStorage(`${slippageKey}`, {
        key: '0.5',
        value: '0.005',
    });
    const [isCustomSlippage, setIsCustomSlippage] = useState(false);
    const [customSlippage, setCustomSlippage] = useState(false);

    const onCustomSlippageChanged = (slippage) => {
        if (slippage && slippage !== '0') {
            let slippageValue = slippage * 0.01;
            setCustomSlippage({
                key: slippage,
                value: `${slippageValue}`,
            });

            setIsCustomSlippage(true);
        }
    };

    const onSlippageItemClick = (slippage) => {
        setCustomSlippage(slippage);
        setIsCustomSlippage(false);
    };

    const doUpdateCustomSlippage = (slippage) => {
        cacheSlippage(slippage);
    };

    const onSaveSlippage = () => {
        console.debug(`current slippage => `, customSlippage);
        doUpdateCustomSlippage(customSlippage);
        setShow(false);
    };

    useEffect(() => {
        setCustomSlippage(slippageCache);
        setIsCustomSlippage(SLIPPAGE_ITEMS.filter((s) => s.value === slippageCache.value).length === 0);
    }, [slippageCache]);

    return (
        <ConditionDisplay display={show}>
            <div className="slippage_settings_box brs_20">
                <div className="f_12 g m_t_8 b">TRANSACTION SETTINGS</div>
                <div className="m_t_32 f_16 cg_6">Slippage tolerance</div>

                <div className="f_r_b m_t_15">
                    {SLIPPAGE_ITEMS.map((item, index) => {
                        return (
                            <div
                                className={`br_12 f_14 cp s_item ${item.value === customSlippage?.value && 'active'}`}
                                key={index}
                                onClick={() => {
                                    onSlippageItemClick(item);
                                }}
                            >{`${item.key}%`}</div>
                        );
                    })}

                    <div className={`f_r_b br_12 s_item custom ${isCustomSlippage && 'active'}`}>
                        <NumberPicker
                            formatter={numberInputValueFormat}
                            placeholder={'Custom'}
                            value={isCustomSlippage ? customSlippage?.key : ''}
                            step={1}
                            precision={8}
                            min={0}
                            max={100}
                            stringMode={false}
                            onChange={onCustomSlippageChanged}
                            className={'custom_input'}
                        />
                        <div className="f_14 f_ms_r">%</div>
                    </div>
                </div>

                <div className="m_t_32 f_12 g">*Saving will save this settings for future transactions</div>

                <div className="f_r_b m_t_10">
                    <Button
                        type="default"
                        className="m_r_12"
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button className="mw_200" disabled={false} onClick={onSaveSlippage}>
                        Save
                    </Button>
                </div>
            </div>
        </ConditionDisplay>
    );
};

export default SlippageSettings;
