<template>
    <div class="tables_page">
        <v-row align="center" no-gutters style="margin: 0 -8px">
            <v-col cols="4">
                <v-card class="elevation-0 tjjj pa-4 mx-2" append-icon="">
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
            <v-col cols="4">
                <v-card class="elevation-0 tjjj pa-4 mx-2" append-icon="">
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
            <v-col cols="4">
                <v-card class="elevation-0 tjjj pa-4 mx-2" append-icon="">
                    <div class="d-flex jsb">
                        <div class="text-h6">Statistics</div>
                        <v-icon icon="mdi-dots-horizontal" />
                    </div>
                    <div class="d-flex jsb mt-5">
                        <div class="text-h4">14,324</div>
                        <!-- <div class="d-flex jsb tj_label">
                            <v-icon size="mini" icon="mdi-arrow-up" />
                            <span class="ml-1">20%</span>
                        </div> -->
                        <v-chip class="ms-0 me-2" small color="red">
                            <v-icon size="mini" icon="mdi-arrow-up" />15%
                        </v-chip>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <div class="search_bar mt-4 d-flex jsb">
            <div>
                <v-chip class="mx-2" closable color="pink"> Secondary </v-chip>
                <v-chip class="mx-2" closable color="secondary"> Label </v-chip>
                <v-chip class="mx-2"> Status </v-chip>
            </div>
            <div class="d-flex jsb">
                <div style="width: 260px" class="mr-4">
                    <v-text-field
                        rounded
                        class="elevation-0"
                        density="compact"
                        variant="solo"
                        label="Search templates"
                        append-inner-icon="mdi-magnify"
                        single-line
                        hide-details
                    ></v-text-field>
                </div>

                <v-btn
                    variant="flat"
                    rounded="pill"
                    color="#ffffff"
                    prepend-icon="mdi-filter-variant"
                >
                    More Filters</v-btn
                >
            </div>
        </div>
        <v-table class="mt-4 tabel">
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
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="secondary"> Secondary </v-chip>
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
                            model-value="62"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="red"> Secondary </v-chip>
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
                            model-value="50"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="green"> Secondary </v-chip>
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
                            model-value="35"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="pink"> Secondary </v-chip>
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
                            model-value="75"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="secondary"> Secondary </v-chip>
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
                            model-value="20"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="secondary"> Secondary </v-chip>
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
                            model-value="90"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
                <tr>
                    <td class="td1 py-4">
                        <div class="d-flex">
                            <v-btn variant="flat" icon="mdi-github" />
                            <div class="ml-2">
                                <div class="name">Github</div>
                                <div class="sub_title">https://github.com</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <v-chip color="secondary"> Secondary </v-chip>
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
                            model-value="96"
                            color="deep-purple-accent-4"
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </td>
                    <td>
                        <v-icon icon="mdi-share-variant" color="#999" />
                        <v-icon icon="mdi-trash-can-outline" class="ml-2" color="#999" />
                    </td>
                </tr>
            </tbody>
        </v-table>
        <div class="d-flex py-2" style="justify-content: flex-end">
            <v-pagination :model-value="1" :length="4" size="small" rounded="circle"></v-pagination>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
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
        .v-field--variant-solo {
            box-shadow: none;
        }
    }
    .tabel {
        .td1 {
            .name {
                font-weight: 700;
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
</style>
