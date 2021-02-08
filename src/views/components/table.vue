<template>
    <div class="table_page">
        <v-row>
            <v-col cols="4" xl="4" md="4" sm="12">
                <v-card>
                    <v-card-actions>
                        <v-card
                            color="teal"
                            class="ml-2 d-flex justify-center align-center pa-2"
                            elevation="0"
                        >
                            <v-icon dark large
                                >mdi-clipboard-list-outline</v-icon
                            >
                        </v-card>
                        <v-spacer></v-spacer>
                        <div class="ml-auto">
                            <div class="grey--text text-right mr-2">count</div>
                            <p class="title text-right mr-2">854</p>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="4" xl="4" md="4" sm="12">
                <v-card>
                    <v-card-actions>
                        <v-card
                            color="cyan"
                            class="ml-2 d-flex justify-center align-center pa-2"
                            elevation="0"
                        >
                            <v-icon dark large>mdi-motion-sensor</v-icon>
                        </v-card>
                        <v-spacer></v-spacer>
                        <div class="ml-auto">
                            <div class="grey--text text-right mr-2">online</div>
                            <p class="title text-right mr-2">800</p>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="4" xl="4" md="4" sm="12">
                <v-card>
                    <v-card-actions>
                        <v-card
                            color="purple"
                            class="ml-2 d-flex justify-center align-center pa-2"
                            elevation="0"
                        >
                            <v-icon dark large>mdi-bug</v-icon>
                        </v-card>
                        <v-spacer></v-spacer>
                        <div class="ml-auto">
                            <div class="grey--text text-right mr-2">
                                off-line
                            </div>
                            <p class="title text-right mr-2">54</p>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-card class="mt-2">
            <v-card-title>
                <v-chip close class="mr-3">filter1</v-chip>
                <v-chip close>filter2</v-chip>
                <v-spacer></v-spacer>
                <v-select
                    :items="items"
                    label="select"
                    clearable
                    style="flex:200px 0 0;"
                    class="mr-5"
                ></v-select>
                <v-text-field
                    hint="keyword name age"
                    label="search"
                    clearable
                    style="flex:200px 0 0;"
                    append-icon="mdi-magnify"
                    class="mr-5"
                ></v-text-field>
                <v-menu
                    v-model="filtersVisible"
                    :close-on-content-click="false"
                    offset-y
                    open-on-click
                >
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-filter-menu-outline</v-icon>
                    </template>
                    <v-card class="pa-4">
                        others filter
                    </v-card>
                </v-menu>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" class="ml-5"
                            >mdi-restart</v-icon
                        >
                    </template>
                    <span>Reset</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            x-small
                            fab
                            dark
                            color="primary"
                            class="mr-2 ml-5"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon dark small>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>New</span>
                </v-tooltip>
            </v-card-title>
            <v-data-table
                fixed-header
                :headers="headers"
                :items="desserts"
                :search="search"
                :loading="tableLoading"
                :server-items-length="1000"
                :footer-props="{
                    showFirstLastPage: true,
                    showCurrentPage: true
                }"
                show-current-page
                height="calc(100vh - 365px)"
                :options.sync="options"
            >
                <template v-slot:name="{ item }">
                    <router-link to="/">{{ item.name }}</router-link>
                </template>
                <template v-slot:calories="{ item }">
                    <router-link to="/">{{ item.calories }}</router-link>
                </template>
                <template v-slot:status="{ item }">
                    <v-chip dark small color="teal">{{ item.status }}</v-chip>
                </template>
                <template v-slot:iron3>
                    <v-btn depressed x-small fab color="primary" dark>
                        <v-icon x-small>mdi-pencil</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
const data = [
    {
        name: '0898LHH03',
        calories: 'name',
        carbs: '2020-07-24',
        protein: 0,
        iron: '400-0755-553',
        iron1: 'open',
        iron2: '1',
        status: '2',
        iron3: '3',
    }    
];
export default {
    data() {
        return {
            filtersVisible: false,
            loading: false,
            tableLoading: false,
            search: '',
            excelData: {
                header: null,
                results: null
            },
            items: ['item', 'item', 'item', 'item'],
            options: {itemsPerPage: 15, page: 2},
            headers: [
                {
                    text: 'number',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'name', sortable: false, value: 'calories' },
                { text: 'date', sortable: false, value: 'carbs' },
                { text: 'user', sortable: false, value: 'protein' },
                { text: 'phone', sortable: false, value: 'iron' },
                { text: 'open', sortable: false, value: 'iron1' },
                { text: 'lle', sortable: false, value: 'iron2' },
                { text: 'status', sortable: false, align: 'center', value: 'status' },
                { text: 'actions', sortable: false, align: 'center', value: 'iron3' },
            ],
            desserts: []
        };
    },
    computed: {
        strategy: function() {
            return this.$route.meta.strategy;
        }
    },
    created() {   
        this.tableLoading = true;
        setTimeout(() => {
            this.tableLoading = false;
            this.desserts = data;
        }, 1500);     
    },
    mounted() {
        
    },
    activated() {     
        if (this.strategy === 'refresh') {
            this.search = '';
            this.options.itemsPerPage = 15;
            this.options.page = 1;
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
                this.desserts = data;
            }, 1500);
        }
    },
    deactivated() {
        // console.log('deactivated');
    },
    methods: {
        rowClick(row) {
            this.$router.push('/keep-alive/' + row.calories);
        },
        handleFileChange(e) {
            const files = e.target.files;
            const rawFile = files[0]; // only use files[0]
            if (!rawFile) return;
            this.readerData(rawFile);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table_page {
    padding: 0 20px;
    .cku_filters_panel {
        position: relative;
        .hide_sction {
            background: #ffffff;
            display: none !important;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            z-index: 3;
        }
        &:hover .hide_sction {
            display: flex !important;
        }
    }
}
</style>

