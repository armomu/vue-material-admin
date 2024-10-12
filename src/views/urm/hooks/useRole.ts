import { onBeforeMount, reactive, ref } from 'vue';
import { ApiRole } from '@/api/role';
import type { UserInterface } from '@/api/user';

const useUsers = () => {
    const formRef = ref<any>();
    const data = reactive({
        list: [] as UserInterface[],
        form: {
            username: '',
            enable: '',
        },
        loading: true,
        visible: false,
    });

    const initDate = async () => {
        const res = await ApiRole.list();
        data.list = res.data;
    };

    const onSubmit = async () => {
        console.log(formRef.value);
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

    onBeforeMount(initDate);

    return {
        formRef,
        data,
        onSubmit,
        onReset,
    };
};

export default useUsers;
