<template>
    <div class="d-flex">
        <v-card width="36%" style="height: var(--content-height)">
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6" text="Menus"> </v-toolbar-title>
                <template v-slot:append>
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
            <div style="height: calc(100vh - 225px); overflow-y: scroll">
                <VTreeview
                    :items="menuEvent.data.menuTree"
                    :search="menuEvent.data.search"
                    activatable
                    item-title="name"
                    density="compact"
                    item-value="id"
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
            </div>
        </v-card>
        <v-card class="ml-4" style="min-height: var(--content-height); flex: 1">
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6">Roles</v-toolbar-title>
            </v-toolbar>
            <div class="d-flex mt-2 px-4">
                <div class="mr-auto">
                    <v-text-field
                        clear-icon="mdi-close-circle-outline"
                        prepend-inner-icon="mdi-magnify"
                        label="Search Role"
                        clearable
                        flat
                        hide-details
                        density="compact"
                        style="width: 300px"
                        @keydown.enter="rolesEvent.onSearch"
                        v-model="rolesEvent.data.query.name"
                    ></v-text-field>
                </div>
                <v-btn class="btn ml-4" color="primary" @click="rolesEvent.onShowAddDialog">
                    <v-icon icon="mdi-plus" size="large" />
                </v-btn>
            </div>
            <v-data-table
                class="ma-4"
                :items="rolesEvent.data.list"
                :headers="rolesEvent.data.headers"
                hide-default-footer
            >
                <template v-slot:[`item.enable`]="{ item }">
                    <v-chip v-if="item.enable" color="green"> Enable </v-chip>
                    <v-chip v-else color="red">Disable</v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                        @click="rolesEvent.onShowEditDialog(item)"
                        class="ml-2 text-none"
                        size="small"
                        variant="flat"
                        flat
                        :disabled="item.id === 1"
                    >
                        Edit
                    </v-btn>
                    <v-btn class="ml-2 text-none" size="small" variant="flat" flat> Delete </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
    <v-dialog width="700" v-model="rolesEvent.data.visible">
        <v-card>
            <v-toolbar color="transparent">
                <v-toolbar-title
                    class="text-h6"
                    :text="rolesEvent.data.dialogTitle"
                ></v-toolbar-title>
                <template v-slot:append>
                    <v-btn
                        type="submit"
                        variant="text"
                        @click="rolesEvent.data.visible = false"
                        icon="mdi-close"
                    />
                </template>
            </v-toolbar>
            <v-sheet width="500" class="ma-10 mx-auto">
                <v-form :ref="rolesEvent.formRef" @submit.prevent>
                    <v-text-field
                        v-model="rolesEvent.data.form.name"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        label="Role name"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="rolesEvent.data.form.code"
                        :rules="[(firstName: any) => !!firstName || 'required']"
                        label="Role Code"
                        density="comfortable"
                        variant="outlined"
                    ></v-text-field>
                    <div style="height: 280px; overflow-y: scroll">
                        <VTreeview
                            v-model:selected="rolesEvent.data.form.permissionIds"
                            :items="menuEvent.data.menuTree"
                            item-title="name"
                            density="compact"
                            item-value="id"
                            selectable
                            select-strategy="independent"
                        >
                        </VTreeview>
                    </div>
                </v-form>
            </v-sheet>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cancel" @click="rolesEvent.onReset">Cancel</v-btn>
                <v-btn color="primary" size="large" @click="rolesEvent.onSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog width="700" v-model="menuEvent.data.visible">
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
                <v-btn
                    color="primary"
                    size="large"
                    @click="menuEvent.onSubmit(menuEvent.formRef.value)"
                    >Submit</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { VTreeview } from 'vuetify/labs/VTreeview';
import useMenu from './hooks/useMenu';
import useRoles from './hooks/useRole';
import { VSpacer } from 'vuetify/components';

const menuEvent = useMenu();
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
