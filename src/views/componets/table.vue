<template>
    <div class="tables_page">
        <v-row align="center" no-gutters style="margin: 0 -8px">
            <v-col cols="12" sm="4"><Statistic /></v-col>
            <v-col cols="12" sm="4"
                ><Statistic
                    :up="false"
                    value="360"
                    chart-color="#4caf50"
                    :chart-data="[30, 47, 75, 47, 65]"
            /></v-col>
            <v-col cols="12" sm="4"
                ><Statistic value="15,260" :chart-data="[68, 58, 65, 72]"
            /></v-col>
        </v-row>
        <v-card class="elevation-0 my-4">
            <div class="search-bar ma-4 d-flex">
                <div class="filter d-flex">
                    <div class="row">
                        <v-text-field
                            clearable
                            hide-details
                            label="Search"
                            placeholder="Company name"
                            prepend-inner-icon="mdi-magnify"
                            density="comfortable"
                        ></v-text-field>
                    </div>
                    <div class="row">
                        <div class="px-4">
                            <v-select
                                clearable
                                hide-details
                                label="Status"
                                placeholder="Status"
                                density="comfortable"
                                :items="['secondary', 'red', 'green', 'pink', 'blue']"
                            ></v-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="px-4">
                            <v-select
                                clearable
                                hide-details
                                label="License use"
                                placeholder="License use"
                                density="comfortable"
                                :items="[
                                    '0% - 20%',
                                    '20% - 40%',
                                    '40% - 60%',
                                    '60% - 80%',
                                    '80% - 100%',
                                ]"
                            ></v-select>
                        </div>
                    </div>
                </div>
                <v-btn
                    size="large"
                    class="btn mr-4"
                    variant="tonal"
                    prepend-icon="mdi-filter-variant"
                    >Filter</v-btn
                >
                <div class="d-flex jsb">
                    <v-divider vertical></v-divider>
                    <v-btn size="large" class="btn ml-4" variant="tonal"
                        ><v-icon icon="mdi-tray-arrow-down" size="large"
                    /></v-btn>
                    <v-btn size="large" class="btn ml-4" variant="tonal"
                        ><v-icon icon="mdi-share" size="large"
                    /></v-btn>
                    <v-dialog width="500">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" size="large" class="btn ml-4" color="primary">
                                <v-icon icon="mdi-plus" size="large" />
                            </v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="New">
                                <v-sheet width="350" class="ma-10 mx-auto">
                                    <v-form @submit.prevent>
                                        <v-text-field
                                            clearable
                                            :rules="[(firstName) => !!firstName || 'required']"
                                            label="Company name"
                                            density="comfortable"
                                        ></v-text-field>
                                        <v-file-input label="Logo"></v-file-input>
                                        <v-select
                                            clearable
                                            :rules="[(firstName) => !!firstName || 'required']"
                                            label="Status"
                                            density="comfortable"
                                            :items="['secondary', 'red', 'green', 'pink', 'blue']"
                                        ></v-select>
                                        <div class="mt-4" />
                                        <v-slider
                                            label="License use"
                                            thumb-label="always"
                                            model-value="30"
                                            color="primary"
                                        ></v-slider>
                                        <v-textarea
                                            label="About"
                                            clearable
                                            :rules="[(firstName) => !!firstName || 'required']"
                                        ></v-textarea>
                                        <v-btn
                                            type="submit"
                                            block
                                            class="mt-4"
                                            color="primary"
                                            size="large"
                                            @click="isActive.value = false"
                                            >Submit</v-btn
                                        >
                                    </v-form>
                                </v-sheet>
                            </v-card>
                        </template>
                    </v-dialog>
                </div>
            </div>
            <v-divider class="ma-4"></v-divider>
            <v-table class="ma-4 table">
                <thead>
                    <tr>
                        <th class="text-left">Company</th>
                        <th class="text-left">Status</th>
                        <th class="text-left">About</th>
                        <th class="text-left">License use</th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <td class="td1 py-4">
                            <div class="d-flex">
                                <v-btn variant="flat" :icon="item.icon" :color="item.color" />
                                <div class="ml-2">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="sub_title">{{ item.net }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <v-chip :color="item.color"> Secondary </v-chip>
                        </td>
                        <td class="td1">
                            <div class="ml-2">
                                <div class="name">
                                    Online software source code hosting service platform
                                </div>
                                <div class="sub_title">
                                    GitHub is where over 94 million developers shape the future of
                                    software, together....
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="width: 200px">
                                <v-progress-linear
                                    v-model="item.progress"
                                    :color="item.color"
                                    rounded
                                    height="6"
                                ></v-progress-linear>
                            </div>
                        </td>
                        <td>
                            <div>
                                <v-icon
                                    icon="mdi-message-text"
                                    color="#999"
                                    @click="dialog = true"
                                />
                                <v-icon
                                    icon="mdi-share-variant"
                                    class="mx-4"
                                    color="#999"
                                    @click="dialog = true"
                                />
                                <v-icon
                                    icon="mdi-trash-can-outline"
                                    color="#999"
                                    @click="dialog = true"
                                />
                            </div>
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
        <v-dialog v-model="dialog" width="30%">
            <v-card title="Dialog">
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import Statistic from '@/components/Statistic/index.vue';
import { ref, onMounted } from 'vue';
const dialog = ref(false);
const list = ref([
    {
        icon: 'mdi-github',
        name: 'GitHub',
        net: 'https://github.com',
        color: 'secondary',
        progress: 0,
    },
    {
        icon: 'mdi-angular',
        name: 'Angular',
        net: 'https://angular.com',
        color: 'red',
        progress: 0,
    },
    {
        icon: 'mdi-apple',
        name: 'Apple',
        net: 'https://apple.com',
        color: 'green',
        progress: 0,
    },
    {
        icon: 'mdi-blender-software',
        name: 'Blender Software',
        net: 'https://blender.com',
        color: 'pink',
        progress: 0,
    },
    {
        icon: 'mdi-facebook',
        name: 'Facebook',
        net: 'https://facebook.com',
        color: 'pink',
        progress: 0,
    },
    {
        icon: 'mdi-microsoft-xbox',
        name: 'Microsoft Xbox',
        net: 'https://xbox.microsoft.com',
        color: 'green',
        progress: 0,
    },
]);
onMounted(() => {
    setTimeout(() => {
        list.value.forEach((item) => {
            item.progress = Math.floor(Math.random() * 100) + 1;
        });
    }, 600);
});
const onTest = () => {
    // router.push({
    //     path: '/graphics/oasis-engine',
    // });
};
</script>
<style lang="scss">
.tables_page {
    .search-bar {
        .filter {
            flex: 1;
            .row {
                width: 33.3%;
            }
        }
    }
    .table {
        .td1 {
            .name {
                font-weight: 700;
                height: 21px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .sub_title {
                font-size: 12px;
            }
            .v-icon {
                font-size: 35px;
            }
        }
    }
}
.isMobile {
    .tables_page {
        .search_bar {
            display: block !important;
            .search_tool {
                margin-bottom: 16px;
                .search_wrap {
                    flex: 1;
                }
            }
        }
        .table {
            width: calc(100vw - 32px);
            overflow: hidden;
        }
    }
}
</style>
