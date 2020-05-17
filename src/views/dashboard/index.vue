<template>
	<div class="dashboard__page">
		<v-card class="ma-5 d-flex flex-wrap">
            <v-col cols="12" class=" pa-0">
                <v-card-actions>
                    <v-card-title>Sales Last 24h</v-card-title>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-col>
			<v-col cols="12" sm="12" md="8">
				<v-data-table
					:headers="headers"
					:items="desserts"
                    :loading="tableLoading"
                    hide-default-footer
				>
					<template v-slot:item.calories="{ item }">
						<v-chip :color="getColor(item.calories)" dark>{{
							item.calories
						}}</v-chip>
					</template>
				</v-data-table>
			</v-col>
			<v-col cols="4" sm="12" md="4">
				<v-card class="text-center" color="green" dark style="width: 100%">
					<v-card-text>
						<v-sheet color="rgba(0, 0, 0, .12)">
							<v-sparkline
								:value="value"
								color="rgba(255, 255, 255, .7)"
								height="100"
								padding="24"
								stroke-linecap="round"
								smooth
							>
								<template v-slot:label="item">
									${{ item.value }}
								</template>
							</v-sparkline>
						</v-sheet>
					</v-card-text>

					<v-card-text>
						<div class="display-1 font-weight-thin">
							Sales Last 24h
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions class="justify-center">
						<v-btn block text>Go to Report</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-card>
		<v-row class="justify-center px-5">
			<v-col cols="4" md="4" sm="12" v-for="(item, i) in row1" :key="i">
				<v-card>
					<v-sheet
						class="v-sheet--offset mx-auto"
						:color="item.color"
						elevation="8"
						max-width="calc(100% - 32px)"
					>
						<v-sparkline
							:labels="labels"
							:value="value"
							height="150px"
							color="white"
							line-width="2"
							:padding="16"
						></v-sparkline>
					</v-sheet>

					<v-card-text class="pt-0">
						<div class="title font-weight-light mb-2">
							User {{ item.title }}
						</div>
						<div class="subheading font-weight-light grey--text">
							Last Campaign Performance
						</div>
						<v-divider class="my-2"></v-divider>
						<v-icon class="mr-2" small>
							mdi-clock
						</v-icon>
						<span class="caption grey--text font-weight-light"
							>last registration 26 minutes ago</span
						>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
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
    }
];
export default {
    data() {
        return {
            value: [423, 446, 675, 510, 590, 610, 760],
            labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
            row1: [
                {
                    title: 'Registrations',
                    color: 'primary'
                },
                {
                    title: 'Pays',
                    color: 'pink'
                },
                {
                    title: 'Registrations',
                    color: 'cyan'
                }
            ],
            loading: false,
            tableLoading: false,
            search: '',
            excelData: {
                header: null,
                results: null
            },
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)',value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
            desserts: []
        };
    },
    created() {
        this.tableLoading = true;
    },
    mounted() {
        setTimeout(() => {
            this.tableLoading = false;
            this.desserts = data;
        }, 1500);
    },
    methods: {
        getColor (calories) {
            if (calories > 400) return 'red';
            else if (calories > 200) return 'orange';
            else return 'green';
        },
    },
};
</script>
