import { onBeforeMount, reactive, ref } from 'vue';
import { ApiUser } from '@/api/user';
import type { UserInterface } from '@/api/user';

const useUsers = () => {
    const formRef = ref<any>();
    const data = reactive({
        list: [] as UserInterface[],
        query: {
            username: '',
            enable: null,
            pageNo: 1,
            pageSize: 10,
        },
        form: {
            id: 0,
            username: '',
            enable: true,
            roleIds: [0],
        },
        password: '',
        totalPage: 0,
        loading: true,
        visible: false,
        isUser: true,
        dialogTitle: 'New User',
    });

    const initData = async () => {
        const res = await ApiUser.users(data.query);
        data.list = res.data.pageData;
        data.totalPage = Math.ceil(res.data.total / data.query.pageSize);
    };

    const onSearch = () => {
        data.query.pageNo = 1;
        initData();
    };

    const onSubmit = async () => {
        console.log(formRef.value);
        const res = await formRef.value.validate();
        if (!res.valid) return;
        if (data.dialogTitle === 'New User') {
            onAdd();
        } else {
            onEdit();
        }
    };

    const onAdd = async () => {
        await ApiUser.add({
            password: data.password,
            ...data.form,
        });
        onReset();
        initData();
    };
    const onEdit = async () => {
        await ApiUser.edit(data.form);
        onReset();
        initData();
    };

    const onDel = async (id: number, dialog: any) => {
        await ApiUser.delete(id);
        initData();
        dialog.value = false;
    };

    const onReset = async () => {
        await formRef.value.reset();
        data.visible = false;
    };

    const onShowAddDialog = () => {
        data.dialogTitle = 'New User';

        data.form.id = 0;
        data.form.username = '';
        data.form.roleIds = [];
        data.form.enable = true;

        data.visible = true;
    };

    const onShowRole = (item: UserInterface) => {
        data.dialogTitle = 'Edit User';
        data.form.id = item.id;
        data.form.roleIds = item.roles.map((item) => item.id);
        data.form.enable = item.enable;
        data.form.username = item.username;
        data.visible = true;
    };

    onBeforeMount(initData);

    return {
        formRef,
        data,
        onSearch,
        onShowAddDialog,
        onShowRole,
        onSubmit,
        onReset,
        initData,
        onDel,
    };
};

export default useUsers;
