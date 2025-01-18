<template>
    <v-card style="min-height: var(--content-height); flex: 1">
        <div class="d-flex pa-4 pb-0">
            <div>
                <v-text-field
                    clear-icon="mdi-close-circle-outline"
                    prepend-inner-icon="mdi-magnify"
                    label="Search User"
                    clearable
                    flat
                    hide-details
                    density="compact"
                    style="width: 300px"
                    @keydown.enter="usersEvent.onSearch"
                    v-model="usersEvent.data.query.username"
                ></v-text-field>
            </div>
            <div class="ml-4 mr-auto">
                <DictSelect
                    v-model="usersEvent.data.query.enable"
                    label="Status"
                    dict="UserStatusDict"
                    style="width: 300px"
                    @change="usersEvent.onSearch"
                />
            </div>
            <!-- <v-divider class="ma-4"></v-divider> -->
            <v-btn class="btn ml-4" color="primary" @click="usersEvent.onShowAddDialog">
                <v-icon icon="mdi-plus" size="large" />
            </v-btn>
        </div>
        <v-divider class="ma-4"></v-divider>
        <v-table class="ma-4 table">
            <thead>
                <tr>
                    <th class="text-left">Username</th>
                    <th class="text-left">Roles</th>
                    <th class="text-left">UpdateTime</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in usersEvent.data.list" :key="i">
                    <td class="td1 py-4">
                        <div class="name">
                            <v-avatar size="36px">
                                <v-img alt="John" :src="item.avatar"></v-img>
                            </v-avatar>
                            <span class="ml-2">{{ item.username }}</span>
                        </div>
                    </td>
                    <td>
                        <v-chip
                            v-for="role in item.roles"
                            :key="role.id"
                            class="mr-1"
                            @click="usersEvent.onShowRole(item)"
                        >
                            {{ role.name }}
                        </v-chip>
                        <!-- <v-chip :color="item.color"> Secondary </v-chip> -->
                    </td>
                    <td class="td1 py-4">
                        <span class="ml-2">{{ item.updateTime }}</span>
                    </td>
                    <td>
                        <!-- <v-switch v-model="item.enable" color="primary" hide-details></v-switch> -->
                        <v-chip v-if="item.enable" color="green" @click="usersEvent.onShowRole(item)"> Enable </v-chip>
                        <v-chip v-else color="red" @click="usersEvent.onShowRole(item)">Disable</v-chip>
                    </td>
                    <td>
                        <v-dialog max-width="340">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn
                                    v-bind="activatorProps"
                                    class="ml-2 text-none"
                                    size="small"
                                    variant="flat"
                                    flat
                                    :disabled="item.username === 'admin'"
                                >
                                    Delete
                                </v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card text="Cannot be restored after deletion" :title="'Delete ' + item.username">
                                    <template v-slot:actions>
                                        <v-btn
                                            class="ml-auto"
                                            text="Delete"
                                            @click="usersEvent.onDel(item.id, isActive)"
                                        ></v-btn>
                                    </template>
                                </v-card>
                            </template>
                        </v-dialog>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <div class="d-flex py-2" style="justify-content: center">
            <v-pagination
                v-model="usersEvent.data.query.pageNo"
                :length="usersEvent.data.totalPage"
                size="small"
                rounded="circle"
                @update:modelValue="usersEvent.initData"
            ></v-pagination>
        </div>
    </v-card>
    <v-dialog width="700" v-model="usersEvent.data.visible">
        <v-card>
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6" :text="usersEvent.data.dialogTitle"> </v-toolbar-title>
                <template v-slot:append>
                    <v-btn type="submit" variant="text" @click="usersEvent.data.visible = false" icon="mdi-close" />
                </template>
            </v-toolbar>
            <v-sheet width="500" class="ma-10 mx-auto">
                <v-form :ref="usersEvent.formRef" @submit.prevent>
                    <v-text-field
                        v-model="usersEvent.data.form.username"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        prepend-icon="mdi-account-edit-outline"
                        label="Username"
                        density="comfortable"
                        variant="outlined"
                        :disabled="usersEvent.data.dialogTitle === 'Edit User'"
                    ></v-text-field>
                    <!-- @vue-ignore -->
                    <v-text-field
                        v-if="usersEvent.data.dialogTitle === 'New User'"
                        v-model="usersEvent.data.password"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        prepend-icon="mdi-"
                        label="Password"
                        density="comfortable"
                        variant="outlined"
                        :disabled="usersEvent.data.dialogTitle === 'Edit User'"
                        type="password"
                    ></v-text-field>
                    <v-select
                        v-model="usersEvent.data.form.roleIds"
                        :items="rolesEvent.data.list"
                        item-title="name"
                        item-value="id"
                        multiple
                        chips
                        label="Roles"
                        class="ml-10"
                    >
                    </v-select>
                    <v-checkbox
                        v-model="usersEvent.data.form.enable"
                        label="Enable"
                        type="checkbox"
                        class="ml-7"
                    ></v-checkbox>
                </v-form>
            </v-sheet>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cancel" @click="usersEvent.onReset">Cancel</v-btn>
                <v-btn color="primary" size="large" @click="usersEvent.onSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import useUsers from './hooks/useUser';
import useRoles from './hooks/useRole';
import { VSpacer } from 'vuetify/components';

const usersEvent = useUsers();
const rolesEvent = useRoles();
</script>
<style lang="scss">
.treeMenuItem {
    justify-content: space-between;
    .title {
        cursor: pointer;
        min-height: 20px;
        min-width: 120px;
    }
    &:hover {
        .actions {
            opacity: 1;
        }
    }
    .actions {
        transition: 0.3s all;
        opacity: 0;
    }
}
</style>
