<template>
	<div class="flowchart">
		<div class="page_title">
			AntV G6 Graph visualization engine
			<div class="min_title">
				Please checkout the full documentation https://g6.antv.vision/zh
			</div>
		</div>
		<v-card id="Graph" :height="700" >
			<v-card-actions>
				<v-btn text @click="onAddItem">add</v-btn>
				<v-btn text>Button</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
import G6 from '@antv/g6';
export default {
    data() {
        return {};
    },
    graph: null,
    mounted() {
        const minimap = new G6.Minimap({
            size: [200, 300],
            className: 'minimap',
            type: 'delegate'
        });
        this.graph = new G6.Graph({
            plugins: [minimap],
            container: 'Graph',
            height: 600,
            width: 1000,
            groupType: 'circle',
            modes: {
                default: ['drag-canvas', 'clickSelected'],
                view: [],
                edit: [
                    'drag-canvas',
                    'hoverNodeActived',
                    'hoverAnchorActived',
                    'dragNode',
                    'dragEdge',
                    'dragPanelItemAddNode',
                    'clickSelected',
                    'deleteItem',
                    'itemAlign'
                ]
            },
            defaultEdge: {
                type: 'flow-polyline-round'
            }
        });
    },
    methods: {
        onAddItem() {
            const data = {
                nodes: [
                    {
                        r: 50,
                        x: 300,
                        y: 300,
                        type: 'circle',
                        label: 'circle'
                    }
                ]
            };
            this.graph.data(data);
            this.graph.render();
        }
    }
};
</script>
<style lang="scss">
.flowchart {
	padding: 20px;
	.page_title {
		font-size: 25px;
		text-align: center;
		margin-bottom: 48px;
		.min_title {
			font-size: 13px;
		}
	}
}
.minimap {
	position: absolute;
	bottom: 0;
	right: 0;
}
</style>
