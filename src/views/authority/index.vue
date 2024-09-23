<template>
    <div class="d-flex">
        <v-card min-width="600" style="height: var(--content-height)">
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6" text="Messages"></v-toolbar-title>
                <template v-slot:append>
                    <v-btn icon="mdi-plus"></v-btn>
                    <v-btn color="primary">
                        <v-icon icon="mdi-plus" size="large" @click="menuEvent.onShowAddDialog" />
                    </v-btn>
                </template>
            </v-toolbar>
            <div class="d-flex mb-4 mt-2 mx-4">
                <v-text-field
                    prepend-inner-icon="mdi-magnify"
                    clear-icon="mdi-close-circle-outline"
                    label="Search menu"
                    clearable
                    flat
                    hide-details
                    density="compact"
                ></v-text-field>
            </div>

            <!-- <VTreeview :items="menuTree" /> -->
            <VTreeview
                :items="menuEvent.data.menuTree"
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
                                @click="menuEvent.onShowAddDialog(row.item.parentId)"
                            >
                                新增
                            </v-btn>
                            <v-dialog max-width="340">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                        v-bind="activatorProps"
                                        class="ml-2 text-none"
                                        size="small"
                                        variant="flat"
                                        flat
                                        >删除</v-btn
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
            <div class="search-bar d-flex mt-2">
                <v-text-field
                    clear-icon="mdi-close-circle-outline"
                    prepend-inner-icon="mdi-magnify"
                    label="Search menu"
                    clearable
                    flat
                    hide-details
                    density="compact"
                ></v-text-field>
                <DictSelect
                    v-model="usersEvent.data.query.enable"
                    label="Status"
                    dict="UserStatusDict"
                />
                <v-btn class="btn ml-4" color="primary">
                    <v-icon icon="mdi-plus" size="large" />
                </v-btn>
            </div>
            <v-divider class="ma-4"></v-divider>
            <v-table class="ma-4 table">
                <thead>
                    <tr>
                        <th class="text-left">Username</th>
                        <th class="text-left">Role</th>
                        <th class="text-left">Status</th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in usersEvent.data.list" :key="i">
                        <td class="td1 py-4">
                            <div class="name">{{ item.username }}</div>
                        </td>
                        <td>
                            <v-chip
                                v-for="role in item.roles"
                                :key="role.id"
                                class="mr-1"
                                color="primary"
                            >
                                {{ role.name }}
                            </v-chip>
                            <!-- <v-chip :color="item.color"> Secondary </v-chip> -->
                        </td>
                        <td>
                            <v-switch v-model="item.enable" color="primary" hide-details></v-switch>
                            <!-- <v-chip :color="item.color"> Secondary </v-chip> -->
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="d-flex py-2" style="justify-content: center">
                <v-pagination
                    :model-value="1"
                    :length="4"
                    size="small"
                    rounded="circle"
                ></v-pagination>
            </div>
        </v-card>
    </div>

    <v-dialog width="700" v-model="menuEvent.data.visible">
        <v-card :title="menuEvent.data.dialogTitle">
            <template #append>
                <div class="mr-n4">
                    <v-btn
                        type="submit"
                        variant="text"
                        @click="menuEvent.data.visible = false"
                        icon="mdi-close"
                    />
                </div>
            </template>
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

const menuEvent = useMenu();
const usersEvent = useUsers();
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
