<template>
	<div class="flowchart">
		<div class="page_title">
			AntV G6 Graph visualization engine
			<div class="min_title">
				Please checkout the full
				<a href="https://g6.antv.vision/zh" target="_black"
					>documentation</a
				>
			</div>
		</div>
		<v-card id="Graph" class="Graph" ref="Graph" :class="{isAddEdge: isAddEdge}">
			<v-card color="primary" class="icon_panel" dark>
				<v-icon x-large>mdi-vector-triangle</v-icon>
			</v-card>
			<v-card-title style="padding-left: 180px"
				>Simple Flow Editor</v-card-title
			>
			<v-card-actions>
				<v-btn
					v-for="item in nodes"
					:key="item.type"
					@click="onAddItem(item)"
					:color="item.color"
					dark
					><v-icon>mdi-plus</v-icon> {{ item.type }}</v-btn
				>
				<v-spacer></v-spacer>
				<v-btn @click="onSave"><v-icon>mdi-plus</v-icon> save</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
import G6 from '@antv/g6/lib';
export default {
    data() {
        return {
            addedCount: 0, // 生成唯一的 id
            isMove: false, // 当前节点是否在移动
            addingEdge: false, // 是否正在增加边线
            addConfirm: false, // 是否已经确定增加
            currentItem: null, // 当前节点实例
            currentEdge: null, // 当前边线实例
            graph: null,
            isAddEdge: false,
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
                }
            ]
        };
    },
    mounted() {
        const width = this.$refs['Graph'].$el.clientWidth;
        const minimap = new G6.Minimap({
            size: [100, 100],
            animate: true, 
            className: 'minimap',
            type: 'delegate',
        });
        // 实例化 grid 插件
        const grid = new G6.Grid();
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
                setTimeout(() => {
                    this.graph.setMode('nodeMove');
                }, 200);
            },
            onMousemove: (e) => {
                if (this.addConfirm) {
                    return;
                }
                this.currentItem.update({
                    x: e.canvasX,
                    y: e.canvasY
                });
            }
        });

        // 根据鼠标所在的节点位置判断modes
        G6.registerBehavior('nodeMove', {
            getEvents: () => {
                return {
                    'mousemove': 'mousemove',
                    'node:mousemove': 'nodeMousemove',
                    'node:mousedown': 'nodeMousedown'
                };
            },
            mousemove: (ev) => {
                const point = {
                    x: ev.x,
                    y: ev.y
                };
                if (this.addingEdge && this.currentEdge) {
                    this.graph.updateItem(this.currentEdge, {
                        target: point
                    });
                }
            },
            nodeMousemove: (e) => {
                this.checkNodePoint(e, 'move');
            },
            nodeMousedown: (e) => {
                this.checkNodePoint(e, 'down');
            }
        });

        // 节点按下鼠标 && 拖动 && 抬起动作
        G6.registerBehavior('nodeDrag', {
            getEvents: () => {
                return {
                    drag: 'mousemove',
                    dragend: 'mouseup'
                };
            },
            mousemove: (e) => {
                if (this.addConfirm) {
                    return;
                }
                this.currentItem.update({
                    x: e.canvasX,
                    y: e.canvasY
                });
                this.currentItem.getEdges().map((item) => {
                    item.refresh();
                });
            },
            mouseup: () => {
                this.addConfirm = true;
                // if(this.currentItem) {
                //     this.currentItem.getEdges().map((item) => {
                //         item.refresh();
                //     });
                // }
                setTimeout(() => {
                    this.graph.setMode('nodeMove');
                }, 200);
            }
        });
        
        this.graph = new G6.Graph({            
            container: 'Graph',
            height: 650,            
            width: width,
            groupType: 'circle',
            modes: {
                default: ['drag-canvas', 'zoom-canvas'], // 默认
                addNode: ['addNode', 'click-select'], // 增加节点
                addEdge: ['addEdge', 'click-select'], // 增加线节点
                nodeMove: ['nodeMove', 'drag-canvas'], // 鼠标移入节点
                nodeDrag: ['nodeDrag', 'drag-nodes'], // 拖动

            },
            defaultNode: {
                type: 'circle',
                style: {
                    cursor: 'move'
                },
                linkPoints: {
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                    fill: '#fff',
                    size: 5
                },
                anchorPoints: [
                    [0, 0.5], // 左 0
                    [0.5, 0], // 上 1
                    [1, 0.5], // 右 2
                    [0.5, 1] // 下 3
                ]
            },
            defaultEdge: {
                type: 'polyline',
                // type: 'cubic-horizontal',
                style: {
                    radius: 10,
                    offset: 30,
                    lineWidth: 2,
                    endArrow: true
                }
            },
            plugins: [minimap, grid]
        });
    },
    methods: {
        checkNodePoint(e, type) {
            const { canvasX, canvasY } = e;
            const { x, y, width, height } = e.item.getBBox();
            // 5是四个小圆点的宽高
            if (
                canvasX >= x + width / 2 - 5 &&
				canvasX <= x + width / 2 + 5 &&
				canvasY >= y &&
				canvasY <= y + 5
            ) {
                // console.log('上 1');
                type === 'move' ? null : this.onAddEdge(e, 1);
            } else if (
                canvasX >= x - 5 &&
				canvasX <= x + 5 &&
				canvasY >= y + height / 2 - 5 &&
				canvasY <= y + height / 2 + 5
            ) {
                // console.log('左 0');
                type === 'move' ? null : this.onAddEdge(e, 0);
            } else if (
                canvasX >= x + width / 2 - 5 &&
				canvasX <= x + width / 2 + 5 &&
				canvasY >= y + height - 5 &&
				canvasY <= y + height + 5
            ) {
                // console.log('下 3');
                type === 'move' ? null : this.onAddEdge(e, 3);
            } else if (
                canvasX >= x + width - 5 &&
				canvasX <= x + width + 5 &&
				canvasY >= y + height / 2 - 5 &&
				canvasY <= y + height / 2 + 5
            ) {
                // console.log('右边 2');
                type === 'move' ? null : this.onAddEdge(e, 2);
            }else {
                // console.log('进入可拖拽状态');
                // if(type === 'move') {
                //     this.isAddEdge = false;
                // }
                if(type === 'down') {
                    this.currentItem = e.item;
                    this.addConfirm = false;
                    this.graph.setMode('nodeDrag');
                }
            }
        },
        onSetModeOfAddEdge() {
            // this.isAddEdge = true;
            // console.log(startArrow);
        },
        onSetNodeCursor(e, cursor) {
            this.graph.updateItem(e.item, {
                style: {
                    cursor
                }
            });
        },
        onSave() {
            console.log(this.graph.save());
        },
        onMoveInNode(ev, targetAnchor) {
            this.addingEdge = false;
            const node = ev.item;
            const model = node.getModel();
            this.graph.updateItem(this.currentEdge, {
                target: model.id,
                targetAnchor
            });
        },
        onAddEdge(ev, sourceAnchor) {
            const node = ev.item;
            const graph = this.graph;
            const point = {
                x: ev.x,
                y: ev.y
            };
            const model = node.getModel();
            if (this.addingEdge && this.currentEdge) {
                graph.updateItem(this.currentEdge, {
                    target: model.id,
                    targetAnchor: sourceAnchor
                });
                this.currentEdge = null;
                this.addingEdge = false;
            } else {
                this.currentEdge = graph.addItem('edge', {
                    source: model.id,
                    target: point,
                    sourceAnchor
                });
                this.addingEdge = true;
            }
        },
        onAddItem(item) {
            // if (this.currentItem) {
            //     this.graph.setItemState(this.currentItem, 'selected', false);
            // }
            this.currentItem = this.graph.addItem('node', {
                x: 0,
                y: 0,
                size: item.size,
                type: item.type,
                label: item.type,
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
	.v-card__actions {
		width: 100%;
		position: absolute;
		top: 64px;
		left: 0;
	}
	.Graph {
        canvas {
            cursor: grab;
        }
		.icon_panel {
			position: absolute;
			left: 30px;
			top: -50px;
			padding: 35px 45px;
		}
	}
    .isAddEdge {
        cursor: pointer;
    }
}
.minimap {
	position: absolute;
	bottom: 0;
	left: 0;
}
</style>
