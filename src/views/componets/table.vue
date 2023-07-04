<template>
    <div class="tables_page">
        <v-row align="center" no-gutters style="margin: 0 -8px">
            <v-col cols="12" sm="4">
                <v-card class="elevation-0 tjjj pa-4 mx-2 mb-sm-0 mb-4" append-icon="">
                    <div class="d-flex jsb">
                        <div class="text-h6">Statistics</div>
                        <v-icon icon="mdi-dots-horizontal" />
                    </div>
                    <div class="d-flex jsb mt-5">
                        <div class="text-h4">2,524</div>
                        <v-chip class="ms-0 me-2" small color="red">
                            <v-icon size="mini" icon="mdi-arrow-up" />20%
                        </v-chip>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="elevation-0 tjjj pa-4 mx-2 mb-sm-0 mb-4" append-icon="">
                    <div class="d-flex jsb">
                        <div class="text-h6">Statistics</div>
                        <v-icon icon="mdi-dots-horizontal" />
                    </div>
                    <div class="d-flex jsb mt-5">
                        <div class="text-h4">1,312</div>
                        <v-chip class="ms-0 me-2" small color="green">
                            <v-icon size="mini" icon="mdi-arrow-down" />5%
                        </v-chip>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="elevation-0 tjjj pa-4 mx-2 mb-sm-0 mb-4" append-icon="">
                    <div class="d-flex jsb">
                        <div class="text-h6">Statistics</div>
                        <v-icon icon="mdi-dots-horizontal" />
                    </div>
                    <div class="d-flex jsb mt-5">
                        <div class="text-h4">14,324</div>
                        <v-chip class="ms-0 me-2" small color="red">
                            <v-icon size="mini" icon="mdi-arrow-up" />15%
                        </v-chip>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <div class="search_bar mt-4 d-flex jsb">
            <div class="d-flex jsb search_tool">
                <div class="search_wrap mr-4">
                    <v-text-field
                        rounded
                        class="elevation-0"
                        density="compact"
                        variant="solo"
                        label="Search sample"
                        append-inner-icon="mdi-magnify"
                        single-line
                        hide-details
                    ></v-text-field>
                </div>
                <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant" @click="onTest"
                    ><span> More</span></v-btn
                >
            </div>
            <div>
                <v-chip class="mx-2" closable color="pink"> Secondary </v-chip>
                <v-chip class="mx-2" closable color="secondary"> Label </v-chip>
                <v-chip class="mx-2"> Status </v-chip>
            </div>
        </div>
        <v-table class="mt-4 table">
            <thead>
                <tr>
                    <th class="text-left">Company</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">About</th>
                    <th class="text-left">Users</th>
                    <th class="text-left">License use</th>
                    <th class="text-left"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" :icon="item.icon" />
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
                        <v-avatar color="info">
                            <v-icon icon="mdi-account-circle"></v-icon>
                        </v-avatar>
                    </td>
                    <td>
                        <v-progress-linear
                            v-model="item.progress"
                            :color="item.color"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <div>
                            <v-icon icon="mdi-message-text" color="#999" @click="dialog = true" />
                            <v-icon
                                icon="mdi-share-variant"
                                class="ml-2"
                                color="#999"
                                @click="dialog = true"
                            />
                            <v-icon
                                icon="mdi-trash-can-outline"
                                class="ml-2"
                                color="#999"
                                @click="dialog = true"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <div class="d-flex py-2" style="justify-content: center">
            <v-pagination :model-value="1" :length="4" size="small" rounded="circle"></v-pagination>
        </div>
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
import router from '@/router';
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
        console.log(list.value);
    }, 300);
});
const onTest = () => {
    // router.push({
    //     path: '/graphics/oasis-engine',
    // });
};
</script>
<style lang="scss">
.tables_page {
    .tjjj {
        .tj_label {
            padding: 4px 8px;
            border-radius: 15px;
            background: rgba(244, 67, 54, 0.2);
            color: #f44336;
        }
        .v-chip {
            margin-inline-end: 0 !important;
        }
    }
    .search_bar {
        .search_tool {
            .search_wrap {
                flex: 0 0 260px;
            }
            .btn {
                height: 40px;
            }
        }
        .v-field--variant-solo {
            box-shadow: none;
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
