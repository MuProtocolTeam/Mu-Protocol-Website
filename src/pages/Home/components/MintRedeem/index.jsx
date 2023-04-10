import './index.scss';

import ReactDOM from 'react-dom';
import React, {useCallback, useEffect, useState, useMemo, useContext} from 'react';
import CoinIcon from "../../../../components/Coin/CoinIcon";
import {numberInputValueFormat} from "../../../../utils/NumberFormat";
import ApplicationConfig from "../../../../ApplicationConfig";
import NumberPicker from 'rc-input-number';
import { Chart, Line, Point, Tooltip,getTheme, Interval, LineAdvance, Legend } from "bizcharts";
import DataSet from '@antv/data-set';
import {myMoment} from "../../../../utils/DateUtil";

const Mint = () => {

    return (
        <div className={'w_100 f_c_l m_t_30'}>
            <div className={'f_c_l token_input_box'}>
                <div className={'f_r_r'}>
                    <div className={'balance'}>{`Balance: 10,000`}</div>
                </div>

                <div className={'f_r_b'}>
                    <div className={'f_r_l'}>
                        <CoinIcon/>
                        <div className={'b token_name m_l_10'}>{`COLLATERAL`}</div>
                    </div>

                    <NumberPicker
                        formatter={numberInputValueFormat}
                        placeholder="Enter amount"
                        value={''}
                        step={1}
                        precision={9}
                        min={0}
                        max={ApplicationConfig.maxNumberPickerValue}
                        stringMode={true}
                        className={`text_input i_number`}
                    />
                </div>
            </div>

            <button className="sub_btn m_t_30" disabled={false}>
                {`Mint`}
            </button>
        </div>
    );
};

const Redeem = () => {

    return (
        <div className={'w_100 f_c_l m_t_30'}>
            <div className={'f_c_l token_input_box'}>
                <div className={'f_r_r'}>
                    <div className={'balance'}>{`Balance: 10,000`}</div>
                </div>

                <div className={'f_r_b'}>
                    <div className={'f_r_l'}>
                        <CoinIcon/>
                        <div className={'b token_name m_l_10'}>{`mUSD`}</div>
                    </div>

                    <NumberPicker
                        formatter={numberInputValueFormat}
                        placeholder="Enter amount"
                        value={''}
                        step={1}
                        precision={9}
                        min={0}
                        max={ApplicationConfig.maxNumberPickerValue}
                        stringMode={true}
                        className={`text_input i_number`}
                    />
                </div>
            </div>

            <button className="sub_btn m_t_30" disabled={false}>
                {`Redeem`}
            </button>
        </div>
    );
};

const Metrics = () => {

    return (
        <div className={'f_r_b metrics'}>
            <div className={'f_c_l'}>
                <div className={'m_title'}>My mUSD Balance</div>
                <div className={'m_value b'}>{`1 mUSD`}</div>
            </div>

            <div className={'f_c_l'}>
                <div className={'m_title'}>Collateral ratio</div>
                <div className={'m_value b'}>{`100%`}</div>
            </div>
        </div>
    );
};

const buildStaticData = (lastRatio) => {
    const mockValue = [110, 108, 107, 101, 109, 105];

    let data = [];
    let now = myMoment();
    let start = now.clone().add(-7, 'day');

    for (let i = 0; i < 6; i++) {
        let date = start.clone().add(i, 'day').format('MMM DD, yyyy');
        let theData = {
            metric: 'collateralRatio',
            date: date,
            ratio: mockValue[i],
        };
        data.push(theData);
    }

    let theData = {
        metric: 'collateralRatio',
        date: now.format('MMM DD, yyyy'),
        ratio: lastRatio,
    };
    data.push(theData);

    console.debug(`data =>`, data);

    return data;
};

const colors = ['#6eb854'];

const AnalysisChart = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        setTimeout(() => {
            let _data = buildStaticData(100);

            let ds = new DataSet();
            let dv = ds.createView().source(_data);
            setData(dv.rows);
        }, 500);
    }, []);

    return (
        <div className={'f_r_b chart'}>
            <Chart
                appendPadding={[5, 0, 0, 0]}
                autoFit height={159} data={data} >
                <Legend visible={false} />
                <Tooltip visible={true} />
                <LineAdvance
                    shape="smooth"
                    point
                    area
                    position="date*ratio"
                    color={['metric', colors]}
                />

            </Chart>
        </div>
    );
};

const MintRedeem = () => {
    const [operation, setOperation] = useState('mint');


    return (
        <div className="f_c_c_c hp_musd">
            <div className={`f_r_b_t section_s musd`}>
                <div className={'f_c_l m_item mint_redeem'}>
                    <div className={'f_r_l tab'}>
                        <div className={`item cp ${operation === 'mint' && 'active'}`} onClick={() => {setOperation('mint')}}>{`Mint`}</div>
                        <div className={`item cp ${operation === 'redeem' && 'active'}`} onClick={() => {setOperation('redeem')}}>{`Redeem`}</div>
                    </div>

                    {operation === 'mint' ? <Mint/> : <Redeem/>}
                </div>

                <div className={'f_c_l m_item analysis'}>
                    <Metrics/>
                    <AnalysisChart/>
                </div>
            </div>
        </div>
    );
};

export default MintRedeem;
