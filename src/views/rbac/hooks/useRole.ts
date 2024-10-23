import { onBeforeMount, reactive, ref } from 'vue';
import { ApiRole } from '@/api/role';
import type { Role } from '@/api/role';

const useUsers = () => {
    const formRef = ref<any>();
    const data = reactive({
        list: [] as Role[],
        headers: [
            // {
            //     key: 'id',
            //     title: 'ID',
            //     sortable: false,
            // },
            {
                key: 'name',
                title: 'Name',
                sortable: false,
            },
            {
                key: 'code',
                title: 'Code',
                sortable: false,
            },
            {
                key: 'enable',
                title: 'Enable',
                sortable: false,
            },
            {
                key: 'actions',
                title: 'Actions',
                sortable: false,
            },
        ],
        form: {
            code: '',
            enable: true,
            id: 0,
            name: '',
            permissionIds: [0],
        },
        query: {
            name: '',
            pageNo: 1,
            pageSize: 10,
        },
        totalPage: 0,
        loading: true,
        visible: false,
        dialogTitle: 'New Role',
    });

    const initData = async () => {
        const res = await ApiRole.listPage(data.query);
        data.list = res.data.pageData;
        data.totalPage = Math.ceil(res.data.total / data.query.pageSize);
    };

    const onSubmit = async () => {
        console.log(formRef.value);
        const res = await formRef.value.validate();
        if (!res.valid) return;
        if (data.dialogTitle === 'New Role') {
            onAdd();
        } else {
            onEdit();
        }
    };
    const onSearch = () => {
        data.query.pageNo = 1;
        initData();
    };

    const onShowAddDialog = () => {
        data.dialogTitle = 'New Role';
        data.form.id = 0;
        data.form.code = '';
        data.form.name = '';
        data.form.permissionIds = [];
        data.visible = true;
    };
    const onShowEditDialog = (item: Role) => {
        data.dialogTitle = 'Edit Role';
        data.form.id = item.id;
        data.form.code = item.code;
        data.form.name = item.name;
        data.form.permissionIds = item.permissionIds.map((item) => item);
        data.visible = true;
    };

    const onAdd = async () => {
        await ApiRole.add(data.form);
        data.visible = false;
        initData();
    };

    const onEdit = async () => {
        await ApiRole.edit(data.form);
        data.visible = false;
        initData();
    };

    const onReset = async () => {
        await formRef.value.reset();
        data.visible = false;
    };

    onBeforeMount(initData);

    return {
        formRef,
        data,
        onSubmit,
        onReset,
        onSearch,
        onShowAddDialog,
        onShowEditDialog,
        initData,
    };
};

export default useUsers;
