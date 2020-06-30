<template>
    <div class="table_page">
        <v-card>
            <v-card-title>
                Modify search or paging properties
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    style="flex:400px 0 0;"
                    hint="Niubility Keyword"
                    placeholder="修改这里的值，点击表格项跳转"
                    persistent-hint
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                :loading="tableLoading"
                :server-items-length="1000"
                :footer-props="{showFirstLastPage: true, showCurrentPage: true}"
                show-current-page
                :options.sync="options"
                @click:row="rowClick"
                height="calc(100vh - 265px)"
                class="elevation-1"
            >
                <template v-slot:items="props">
                    <td v-for="(tr, index) in headers" :key="index">{{ props.item[tr.value] }}</td>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import XLSX from 'xlsx';
const data = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%'
    },
    {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%'
    },
    {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%'
    },
    {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%'
    },
    {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%'
    },
    {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%'
    },
    {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%'
    },
    {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%'
    },
    {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%'
    },
    {
        name: 'p0',
        calories: 456,
        fat: 26.1,
        carbs: 65,
        protein: 7,
        iron: '6%'
    },
    {
        name: 'p1',
        calories: 748,
        fat: 26.5,
        carbs: 65,
        protein: 7,
        iron: '6%'
    },
    {
        name: 'p2',
        calories: 211,
        fat: 26.6,
        carbs: 65,
        protein: 7,
        iron: '6%'
    },
    {
        name: 'p3',
        calories: 374,
        fat: 2.0,
        carbs: 65,
        protein: 7,
        iron: '6%'
    },
];
export default {
    data() {
        return {
            loading: false,
            tableLoading: false,
            search: '',
            excelData: {
                header: null,
                results: null
            },
            options: {itemsPerPage: 15, page: 2},
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', sortable: false, value: 'calories' },
                { text: 'Fat (g)', sortable: false, value: 'fat' },
                { text: 'Carbs (g)', sortable: false, value: 'carbs' },
                { text: 'Protein (g)', sortable: false, value: 'protein' },
                { text: 'Iron (%)', sortable: false, value: 'iron' }
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
        },
        readerData(rawFile) {
            this.loading = true;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const headers = this.getHeaderRow(worksheet);
                const results = XLSX.utils.sheet_to_json(worksheet);
                this.ressetTable(headers, results);
            };
            reader.readAsArrayBuffer(rawFile);
        },
        ressetTable(headers, results) {
            this.headers = headers.map((key) => {
                return {
                    text: key,
                    align: 'left',
                    sortable: false,
                    value: key
                };
            });
            this.desserts = results;
        },
        getHeaderRow(sheet) {
            const headers = [];
            const range = XLSX.utils.decode_range(sheet['!ref']);
            let C;
            const R = range.s.r;
            /* start in the first row */
            for (C = range.s.c; C <= range.e.c; ++C) {
                /* walk every column in the range */
                const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
                /* find the cell in the first row */
                let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
                if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                headers.push(hdr);
            }
            return headers;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table_page {
    padding: 20px;
}
</style>

