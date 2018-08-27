/**
 * Created by RCC on 2018/8/27.
 */

const initState = {
    testStr: 'abcdef',
    rows: [
        {id: '1', status: '健康', moneyId: '123', vender: 'a', image: '', location: '上海'},
        {id: '2', status: '健康', moneyId: '123', vender: 'b', image: '', location: '无锡'}
    ]
};

const namespace = 'demoTest';

export default {
    namespace: namespace,
    reducer: (state = initState, { type, response, error }) => {
        switch (type) {
            default:
                return state;
        }
    }
}
