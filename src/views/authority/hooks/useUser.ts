import { ref, onBeforeMount, reactive } from 'vue';
import { ApiAuth } from '@/api/auth';
import type { MenuInterface } from '@/api/auth';

const useUsers = () => {
    const data = reactive({
        list: [],
        query: {
            username: '',
            enable: '',
            pageNo: 1,
            pageSize: 10,
        },
        total: 0,
        loading: true,
    });

    const initDate = async () => {
        const res = await ApiAuth.users(data.query);
        data.list = res.data.pageData;
        data.total = res.data.total;
    };
    onBeforeMount(initDate);

    return {
        data,
    };
};

export default useUsers;
