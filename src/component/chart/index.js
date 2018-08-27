'use strict';
//预估图表
import * as echarts from 'echarts/lib/echarts';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { ChartUI } from './ui';
import { formatVolume } from '@util';
const defaultFormat = val => {
    return val;
};
const Status = ['success', 'processing'];

const renderHtml  = (index, text) => {
    return `<span class="ant-badge ant-badge-status ant-badge-not-a-wrapper"><span class="ant-badge-status-dot ant-badge-status-${Status[index]}"></span><span class="ant-badge-status-text color-white">${text}</span></span>`
};

const renderOpts = ({ title, legend,xContext, series, format = defaultFormat, xFormat = defaultFormat, visualMap = {} }) => {
    series = series.map(item => {
        item.symbolSize = 0;
        return item;
    })
    return {
        title: {
            text: title,
            left: '20px',
            top: '3%',
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#2B3031',
            padding: 10,
            axisPointer: {
                lineStyle: {
                    type: 'dashed',
                }
            },
            formatter: function (params, ticket, callback) {
                let res = '';
                if(params.length > 0) {
                    res += `<div class="color-grey">${xFormat(params[0].name)}</div>`;
                }
                params.map((item, i) => {
                    const value = Array.isArray(item.value)?item.value[1]:item.value;
                    res += renderHtml(i, `${item.seriesName}- ${format(value)}`);
                    if(item.length !== (i + 1))
                        res += '<br/>';
                });

                return `<div>${res}</div>`;

            }
        },
        visualMap,
        legend: {
            data: legend,
            right: '30px',
            selectedMode: false,//是否可点击小点点
            top: '3%',
        },
        xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: xContext,
            interval: 40,
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                formatter: (value) => {
                    return xFormat(value);
                },
            }
        },
        yAxis: {
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false,
            },
            type: 'value',
            axisLabel: {
                formatter: (value) => {
                    return format(value);
                },
            }
        },
        grid: {
            left: '20px',
            right: '30px',
            bottom: '3%',
            containLabel: true
        },
        series: [...series],
    };
};

class Chart extends PureComponent{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            xContext: [],
            series: [],
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        const { series, xContext } = nextProps;
        this.setState({
            series,
            xContext,
        },() => {
            const dom = ReactDom.findDOMNode(this.chartRef);
            this.renderEstimateChart(dom.clientWidth, 300);
        })
    }
    renderEstimateChart(width = 0, height = 0) {
        const props = this.props;
        let estimateChart = echarts.init(this.chartRef, 'light', {
            width,
            height,
        }); //初始化echarts
        const { xContext, series } = this.state;
        const opts = renderOpts({
            ...props,
            xContext,
            series,
        });
        estimateChart.setOption(opts);
    }
    render() {
        return (
            <div style={ChartUI}>
                <div ref={(c) => this.chartRef = c}></div>
            </div>
        )
    }
}

Chart.propTypes = {
    title: PropTypes.string.isRequired,

};

export default Chart;
