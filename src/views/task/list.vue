<template>
	<div class="task_list">
		<v-card class="left_card">
			<div class="pa-4">
				<v-btn block large color="primary"
					><v-icon>mdi-plus</v-icon>add</v-btn
				>
			</div>
			<v-list nav class="pa-4">
				<v-list-item-group color="primary">
					<v-list-item
						v-for="(item, i) in menus"
						:key="i"
						exact
						:to="item.to"
					>
						<v-list-item-icon style="margin-right: 16px;">
							<v-icon dense v-text="item.icon"></v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title
								v-text="item.text"
							></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
			<v-list nav dense class="pa-4 mt-n4">
				<v-subheader>标签</v-subheader>
				<v-list-item-group color="primary">
					<v-list-item
						v-for="(item, i) in labels"
						:key="i"
						exact
						:to="item.to"
					>
						<v-list-item-icon style="margin-right: 16px;">
							<v-icon
								dense
								v-text="item.icon"
								:color="item.color"
							></v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title
								v-text="item.text"
							></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
		<v-card class="center_list_card">
			<v-list style="background: none">
				<div
					class="v-list-item-pro"
					v-for="(item, key) in items"
					:key="key"
					:class="'v-list-item-' + item.className"
				>
					<v-list-item
						:class="{ active: item.active }"
						@click.stop="() => {}"
						:ripple="false"
					>
						<v-list-item-action>
							<v-checkbox
								v-model="item.selected"
								color="primary"
								@change="itemSelectedChange(key)"
							></v-checkbox>
						</v-list-item-action>
						<v-list-item-content
							@click.stop="handleShowDetail(item, key)"
						>
							<v-list-item-title
								:title="item.title"
								v-text="item.name"
							/>
							<v-list-item-subtitle v-text="item.desc" />
							<div>
								<v-chip
									v-for="(label, i) in item.labels"
									:key="i"
									class="ma-2"
									color="primary"
									outlined
									pill
									small
									v-text="label"
								/>
							</div>
						</v-list-item-content>
						<v-list-item-action @click.stop="handleCollect(key)">
							<v-icon
								:color="
									item.isCollect
										? 'amber lighten-1'
										: 'grey lighten-1'
								"
								>mdi-star</v-icon
							>
						</v-list-item-action>
					</v-list-item>
					<v-divider></v-divider>
				</div>
			</v-list>
		</v-card>
		<v-card class="right_card">
			aaa
		</v-card>
		<v-dialog v-model="isLoad" hide-overlay persistent width="300">
			<v-card color="primary" dark>
				<v-card-text style="padding: 20px 24px">
					Please stand by
					<v-progress-linear
						indeterminate
						color="white"
						class="mt-2"
					></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
export default {
    data() {
        return {
            isLoad: true,
            items: [
                {
                    name: 'find the report on one winged airplanes',
                    className: 0,
                    active: false,
                    isCollect: false,
                    selected: false,
                    selectedColor: 'gray',
                    desc: '✈️ one wing is the way to go',
                    labels: ['fun','green']
                }
            ],
            detailStatus: false,
            detail: {
                name: '',
                key: 0,
                active: false,
                selectedColor: 'gray',
                selected: false,
                isCollect: false,
                startTime: '',
                endTime: '',
                desc: '',
                association: ''
            },
            menus: [
                { text: '任务', icon: 'mdi-checkbox-marked-circle-outline', to: { path: '/tasks/list' } },
                { text: '已完成', icon: 'mdi-checkbox-marked-outline', to: { path: '/tasks/completed' } },
                // { text: '任务', icon: 'mdi-check-circle-outline', to: { path: '/tasks/list' } },
                // { text: '已完成', icon: 'mdi-check-bold', to: { path: '/tasks/completed' } },
            ],
            labels: [                
                { text: 'Fun', icon: 'mdi-label-outline', to: { path: '/tasks/fun' }, color: 'primary' },
                { text: 'Work', icon: 'mdi-label-outline', to: { path: '/tasks/work' }, color: 'primary' },
                { text: 'Bug', icon: 'mdi-bug-outline', to: { path: '/tasks/bug' }, color: 'grey' },
                { text: 'Red', icon: 'mdi-invert-colors', to: { path: '/tasks/red' }, color: 'red' },
                { text: 'Yellow', icon: 'mdi-invert-colors', to: { path: '/tasks/yellow' }, color: 'yellow' },
            ],
            
        };
    },
    created() {
        setTimeout(() => {            
            this.isLoad = false;
        }, 1000);
    },
    methods: {
        itemSelectedChange(key) {
            this.detail.selected = this.items[key].selected;
            this.detail.selectedColor = this.detail.selected ? 'green' : 'gray';
        },
        handleCollect(key) {
            this.items[key].isCollect = !this.items[key].isCollect;
        },
        handleCheckbox(key) {            
            this.items[key].selected = !this.items[key].selected;
            this.detail.selected = this.items[key].selected;
            this.detail.selectedColor = this.detail.selected ? 'green' : 'gray';
        },
        handleHideDetail() {
            this.detailStatus = true;
        },
        handleShowDetail(item, key) {
            this.items[key].active = true;
            // this.items[this.detail.key].active = false;
            // item.selectedColor = item.selected ? 'green' : 'gray';
            // this.detail = item;
            // this.detailStatus = false;
            document.onclick = () => {
                this.detailStatus = true;
                this.items[key].active = false;
                document.onclick = null;
            };
        },
    }
};
</script>