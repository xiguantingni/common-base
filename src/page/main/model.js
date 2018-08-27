/**
 * Created by RCC on 2018/6/28.
 */

const namespace = 'main';
const initState = {
    breadcrumb: []
};

export default {
    namespace: namespace,
    reducer: (state = initState, { type, payload }) => {
        switch (type) {
            default:
                return state;
        }
    }
}
