/**
 * Created by RCC on 2018/6/20.
 */

const initState = {
    loading: false,
    errorTip: '',
    username: '',
    password: ''
};

const namespace = 'login';

export default {
    namespace: namespace,
    reducer: (state = initState, { type, response, error }) => {
        switch (type) {
            default:
                return state;
        }
    }
}
