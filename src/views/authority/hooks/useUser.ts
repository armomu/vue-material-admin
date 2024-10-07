import { onBeforeMount, reactive, ref } from 'vue';
import { ApiUser } from '@/api/user';
import type { UserInterface } from '@/api/user';
import { ApiRole } from '@/api/role';
import { da } from 'vuetify/locale';

const useUsers = () => {
    const formRef = ref<any>();
    const data = reactive({
        list: [] as UserInterface[],
        query: {
            username: '',
            enable: '',
            pageNo: 1,
            pageSize: 10,
        },
        form: {
            id: 0,
            username: '',
            enable: true,
        },
        roleIds: [],
        total: 0,
        loading: true,
        visible: false,
    });

    const initData = async () => {
        const res = await ApiUser.users(data.query);
        data.list = res.data.pageData;
        data.total = res.data.total;
        onRoles();
    };

    const onRoles = async () => {
        // const res = await ApiRole.list();
        // data.list = res.data.pageData;
    };

    const onSearch = () => {
        data.query.pageNo = 1;
        initData();
    };

    const onSubmit = async () => {
        // console.log(formRef.value);
        // const res = await formRef.value.validate();
        // if (!res.valid) return;
        // if (data.dialogTitle === 'New Menu') {
        //     onAdd();
        // } else {
        //     onEdit();
        // }
    };
    const onReset = async () => {
        await formRef.value.reset();
        data.visible = false;
    };

    const onShowRole = (item: UserInterface) => {
        data.form.id = item.id;
        data.roleIds = item.roles.map((item) => item.id);
        data.form.enable = item.enable;
        data.form.username = item.username;
        data.visible = true;
    };

    onBeforeMount(initData);

    return {
        formRef,
        data,
        onSearch,
        onShowRole,
        onSubmit,
        onReset,
    };
};

export default useUsers;
