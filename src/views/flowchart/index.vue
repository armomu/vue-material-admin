<template>
	<div class="flowchart">
		<div class="page_title">
			AntV G6 Graph visualization engine
			<div class="min_title">
				Please checkout the full <a href="https://g6.antv.vision/zh" target="_black">documentation</a>
			</div>
		</div>
		<v-card id="Graph" class="Graph"  ref="Graph">
            <v-card color="primary" class="icon_panel" dark>
                <v-icon x-large >mdi-vector-triangle</v-icon>
            </v-card>
            <v-card-title style="padding-left: 180px">Simple Flow Editor</v-card-title>
			<v-card-actions>
                <v-spacer></v-spacer>
				<v-btn
                    v-for="item in nodes"
                    :key='item.type'
                    @click="onAddItem(item)"
                    :color="item.color"
                    dark
                ><v-icon>mdi-plus</v-icon> {{item.type}}</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
import G6 from '@antv/g6';
export default {
    data() {
        return {
            addedCount: 0, // 生成唯一的 id
            isMove: false, // 是否在移动
            addConfirm: false, // 是否已经确定增加
            currentItem: null, // 当前节点实例
            currentEdge: null, // 当前边线实例
            graph: null,
            nodes: [
                {
                    type: 'circle',
                    size: 100,
                    color: 'primary'
                },
                {
                    type: 'rect',
                    size: [100, 60],
                    color: 'blue'
                },
                {
                    type: 'ellipse',
                    size: [100, 60],
                    color: 'pink'
                },
                {
                    type: 'diamond',
                    size: 100,
                    color: 'primary'
                },
            ]
        };
    },
    mounted() {
        const width = this.$refs['Graph'].$el.clientWidth;
        // 增加节点
        G6.registerBehavior('addNode', {
            getEvents: () => {
                return {
                    mousemove: 'onMousemove',
                    mousedown: 'onMousedown'
                };
            },
            onMousedown: () => {
                this.addConfirm = true;
                this.graph.setMode('canvasMove');
            },
            onMousemove: (e) => {
                if(this.addConfirm){
                    return;
                }
                this.currentItem.update({
                    x: e.canvasX,
                    y: e.canvasY,
                });
            }
        });
        G6.registerBehavior('canvasMove', {
            getEvents: () => {
                return {
                    'node:click': 'onClick',
                    'node:mousemove': 'nodeMouseover',
                    'anchorPoint:mousemove': 'anchorPointMouseover',
                };
            },
            onClick: (e) => {
                const { item } = e;
                if(this.currentItem) {
                    this.graph.setItemState(this.currentItem, 'selected', false);
                }
                this.currentItem = item;
                this.graph.setItemState(item, 'selected', true);
            },
            nodeMouseover: () => {
                // console.log(e);
            },
            anchorPointMouseover: (e) => {
                console.log(e);
            },
        });

        this.graph = new G6.Graph({
            plugins: [],
            container: 'Graph',
            height: 560,
            width: width,
            groupType: 'circle',
            modes: {
                default: ['drag-canvas', 'zoom-canvas'],
                addNode: ['addNode', 'click-select'],
                canvasMove: ['canvasMove', 'drag-canvas']
            },
            nodeStateStyles: {
                selected: {
                    fill: '#FFCC80',
                    linkPoints: {
                        lineWidth: 20,
                    }
                }
            },
            defaultNode: {
                type: 'circle',
                linkPoints: {
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                    fill: '#fff',
                    size: 5
                }
            },
            defaultEdge: {
                type: 'polyline'
            }
        });
    },
    methods: {
        onAddItem(item) {
            if(this.currentItem) {
                this.graph.setItemState(this.currentItem, 'selected', false);
            }
            this.currentItem = this.graph.addItem('node', {
                x: 0,
                y: 0,
                size: item.size,
                type: item.type,
                id: `node_${this.addedCount}` // 生成唯一的 id
            });
            this.addedCount++;
            this.addConfirm = false;
            this.graph.setMode('addNode');
        },
        onEdit() {
            this.graph.setMode('edit');
            console.log(this.graph.getCurrentMode());
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
    .Graph {
        canvas {
            border:1px solid #eeeeee
        }
        .icon_panel {
            position: absolute;
            left: 30px;
            top: -50px;
            padding: 35px 45px;
        }
    }
}
.minimap {
	position: absolute;
	bottom: 0;
	left: 0;
}
</style>
