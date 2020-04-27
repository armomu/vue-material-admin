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
        <v-card id="Graph" class="Graph" ref="Graph">
            <v-card color="primary" class="icon_panel" dark>
                <v-icon x-large>mdi-vector-triangle</v-icon>
            </v-card>
            <v-card-title style="padding-left: 180px"
                >Simple Flow Editor</v-card-title
            >
            <v-card-actions>
                <v-btn @click="onSave" ><v-icon>mdi-plus</v-icon> save</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    v-for="item in nodes"
                    :key="item.type"
                    @click="onAddItem(item)"
                    :color="item.color"
                    dark
                    ><v-icon>mdi-plus</v-icon> {{ item.type }}</v-btn
                >
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
        G6.registerBehavior('nodeMove', {
            getEvents: () => {
                return {
                    'node:click': 'onClick',
                    'mousemove': 'mousemove',
                    'node:mousemove': 'nodeMousemove',
                    'node:mousedown': 'nodeMousedown'
                };
            },
            onClick: (e) => {
                const { item } = e;
                if (this.currentItem) {
                    this.graph.setItemState(
                        this.currentItem,
                        'selected',
                        false
                    );
                }
                this.currentItem = item;
                this.graph.setItemState(item, 'selected', true);
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
            nodeMousemove: () => {},
            nodeMousedown: (e) => {
                const { canvasX, canvasY } = e;
                const { x, y, width, height } = e.item.getBBox();
                // console.log(type, canvasX, canvasY, x, y, width, height);
                // 5是四个小圆点的宽高
                if (
                    canvasX >= x + width / 2 - 5 &&
                    canvasX <= x + width / 2 + 5 &&
                    canvasY >= y &&
                    canvasY <= y + 5
                ) {
                    // console.log('上 1');
                    this.onAddEdge(e, 1);
                } else if (
                    canvasX >= x - 5 &&
                    canvasX <= x + 5 &&
                    canvasY >= y + height / 2 - 5 &&
                    canvasY <= y + height / 2 + 5
                ) {
                    // console.log('左 0');
                    this.onAddEdge(e, 0);
                } else if (
                    canvasX >= x + width / 2 - 5 &&
                    canvasX <= x + width / 2 + 5 &&
                    canvasY >= y + height - 5 &&
                    canvasY <= y + height + 5
                ) {
                    // console.log('下 3');
                    this.onAddEdge(e, 3);
                } else if (
                    canvasX >= x + width - 5 &&
                    canvasX <= x + width + 5 &&
                    canvasY >= y + height / 2 - 5 &&
                    canvasY <= y + height / 2 + 5
                ) {
                    // console.log('右边 2');
                    this.onAddEdge(e, 2);
                }
            }
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
                nodeMove: ['nodeMove', 'drag-canvas']
            },
            nodeStateStyles: {
                selected: {
                    fill: '#FFCC80'
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
                    lineWidth: 2,
                    endArrow: true,
                    startArrow: true
                }
            }
        });
    },
    methods: {
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
            if (this.currentItem) {
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
            border: 1px solid #eeeeee;
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
