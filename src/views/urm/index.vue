<template>
    <div class="d-flex">
        <v-card width="30%" style="height: var(--content-height)">
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6" text="Menus"> </v-toolbar-title>
                <template v-slot:append>
                    <v-btn icon="mdi-compare-horizontal" @click="menuEvent.getMenutree"></v-btn>
                    <v-btn icon="mdi-refresh" @click="menuEvent.getMenutree"></v-btn>
                    <v-btn
                        icon="mdi-plus"
                        @click="menuEvent.onShowAddDialog(0)"
                        class="mr-2"
                    ></v-btn>
                </template>
            </v-toolbar>
            <div class="d-flex mb-4 mt-2 mx-4">
                <v-text-field
                    v-model="menuEvent.data.search"
                    prepend-inner-icon="mdi-magnify"
                    clear-icon="mdi-close-circle-outline"
                    label="Search menu"
                    clearable
                    flat
                    hide-details
                    density="compact"
                ></v-text-field>
            </div>
            <VTreeview
                :items="menuEvent.data.menuTree"
                :search="menuEvent.data.search"
                activatable
                item-title="name"
                density="compact"
                item-value="id"
                open-all
                class="mx-4"
            >
                <template v-slot:title="row">
                    <div class="d-flex treeMenuItem">
                        <div class="title" @click="menuEvent.onMenu(row)">{{ row.title }}</div>
                        <div class="actions">
                            <v-btn
                                color="primary"
                                class="text-none"
                                size="small"
                                variant="flat"
                                flat
                                @click="menuEvent.onShowAddDialog(row.item.id)"
                            >
                                New
                            </v-btn>
                            <v-dialog max-width="340">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                        v-bind="activatorProps"
                                        class="ml-2 text-none"
                                        size="small"
                                        variant="flat"
                                        flat
                                        >Delete</v-btn
                                    >
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card
                                        prepend-icon="mdi-database-remove"
                                        text="Cannot be restored after deletion"
                                        title="Delete Menu"
                                    >
                                        <template v-slot:actions>
                                            <v-btn
                                                class="ml-auto"
                                                text="Delete"
                                                @click="menuEvent.onDel(row.item.id, isActive)"
                                            ></v-btn>
                                        </template>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </div>
                    </div>
                </template>
            </VTreeview>
        </v-card>

        <v-card class="px-4 ml-4" style="height: var(--content-height); flex: 1" title="Users">
            <div class="d-flex mt-2">
                <div>
                    <v-text-field
                        clear-icon="mdi-close-circle-outline"
                        prepend-inner-icon="mdi-magnify"
                        label="Search menu"
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
                <v-btn class="btn ml-4" color="primary">
                    <v-icon icon="mdi-plus" size="large" />
                </v-btn>
            </div>
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
                            <v-chip
                                v-if="item.enable"
                                color="green"
                                @click="usersEvent.onShowRole(item)"
                            >
                                Enable
                            </v-chip>
                            <v-chip v-else color="red" @click="usersEvent.onShowRole(item)"
                                >Disable</v-chip
                            >
                        </td>
                        <td>
                            <v-btn class="ml-2 text-none" size="small" variant="flat" flat>
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="d-flex py-2" style="justify-content: center">
                <v-pagination
                    v-model="usersEvent.data.query.pageNo"
                    :length="usersEvent.data.total"
                    size="small"
                    rounded="circle"
                ></v-pagination>
            </div>
        </v-card>
    </div>
    <v-dialog width="700" v-model="usersEvent.data.visible" title="">
        <v-card>
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6">Edit User</v-toolbar-title>
                <template v-slot:append>
                    <v-btn
                        type="submit"
                        variant="text"
                        @click="usersEvent.data.visible = false"
                        icon="mdi-close"
                    />
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
                        disabled
                    ></v-text-field>
                    <v-select
                        v-model="usersEvent.data.roleIds"
                        :items="rolesEvent.data.list"
                        :rules="[(firstName: any) => firstName.length > 0 || 'required']"
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
    <v-dialog width="700" v-model="menuEvent.data.visible" title="">
        <v-card>
            <v-toolbar color="transparent">
                <v-toolbar-title
                    class="text-h6"
                    :text="menuEvent.data.dialogTitle"
                ></v-toolbar-title>
                <template v-slot:append>
                    <v-btn
                        type="submit"
                        variant="text"
                        @click="menuEvent.data.visible = false"
                        icon="mdi-close"
                    />
                </template>
            </v-toolbar>
            <v-sheet width="500" class="ma-10 mx-auto">
                <v-form :ref="menuEvent.formRef" @submit.prevent>
                    <v-text-field
                        v-model="menuEvent.data.form.name"
                        prepend-icon="mdi-view-module"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        label="Menu Title"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="menuEvent.data.form.code"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        prepend-icon="mdi-"
                        label="Component Name"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="menuEvent.data.form.icon"
                        prepend-icon="mdi-"
                        label="Menu Icon"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="menuEvent.data.form.path"
                        prepend-icon="mdi-link"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        label="Router Path"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="menuEvent.data.form.redirect"
                        prepend-icon="mdi-"
                        label="Redirect"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="menuEvent.data.form.component"
                        prepend-icon="mdi-"
                        label="Cmponent Path"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-checkbox
                        v-model="menuEvent.data.form.show"
                        label="Show Menu"
                        type="checkbox"
                        class="ml-7"
                    ></v-checkbox>
                </v-form>
            </v-sheet>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cancel" @click="menuEvent.onReset">Cancel</v-btn>
                <v-btn color="primary" size="large" @click="menuEvent.onSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { VTreeview } from 'vuetify/labs/VTreeview';
import useMenu from './hooks/useMenu';
import useUsers from './hooks/useUser';
import useRoles from './hooks/useRole';
import { VSpacer } from 'vuetify/components';

const menuEvent = useMenu();
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
