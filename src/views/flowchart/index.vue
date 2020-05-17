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
        <v-card
            id="Graph"
            class="Graph"
            ref="Graph"
            :class="{ isAddEdge: isAddEdge }"
        >
            <v-card color="primary" class="icon_panel" dark>
                <v-icon x-large>mdi-vector-triangle</v-icon>
            </v-card>
            <v-card-title style="padding-left: 166px"
                >Simple Flow Editor</v-card-title
            >
            <v-card-text class="mt-3">
                操作说明（*切勿拖拽画布，如果动过节点第二次页面进入必须按F5刷新页面，这里有个bug）：
                增加节点：点击一下下面带加号的按钮移动鼠标（不是拖拽/拖动鼠标）到画布中点击一下即可添加成功，添加连接边线：点击节点四个方向的小圆点画布上方出现删除按钮或者移动鼠标看到边线即表示
                添加边线成功，移动鼠标（不是拖拽/拖动鼠标）至另外一个节点四个方向的小圆点点一下连接两个节点，删除节点/边线：点击节点/边线画布上方出现红色删除按钮点击即可删除，编辑：点击节点/边线选中右边出现相关编辑选项，
                边线变换目标节点：双击边线移动鼠标重新选中即可。
            </v-card-text>
            <v-card-actions class="Graph_actions pl-5 pr-5">
                <v-btn
                    v-for="item in nodes"
                    :key="item.type"
                    @click="onAddItem(item)"
                    :color="item.style.stroke"
                    dark
                    ><v-icon>mdi-plus</v-icon> {{ item.type }}</v-btn
                >

                <v-btn
                    color="red"
                    dark
                    @click="onDelItem('dode')"
                    v-if="!addConfirm"
                    ><v-icon>mdi-delete</v-icon> Delete</v-btn
                >
                <v-btn
                    color="red"
                    dark
                    @click="onDelItem('edge')"
                    v-if="edgeEdit"
                    ><v-icon>mdi-delete</v-icon> Delete</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn @click="onAddData" color="primary">测试导出数据渲染流程图</v-btn>
                <v-btn @click="onClear" color="primary">clear</v-btn>
                <v-btn @click="onSave" color="primary"
                    ><v-icon>mdi-database</v-icon> View Data</v-btn
                >
            </v-card-actions>
            <v-divider />
            <v-card class="label_wrap" v-if="!addConfirm">
                <v-card-title>
                    Node
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        label="label"
                        v-model="nodeOption.label"
                        @change="currentItemChange"
                    ></v-text-field>
                    <v-select
                        :items="colorOptions"
                        label="Color Options"
                    ></v-select>
                </v-card-text>
            </v-card>
            <v-card class="label_wrap" v-if="edgeEdit">
                <v-card-title>
                    Edge
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        label="label"
                        v-model="edgeOption.label"
                        @change="currentEdgeChange"
                    ></v-text-field>
                    <v-select
                        :items="colorOptions"
                        label="Color Options"
                    ></v-select>
                </v-card-text>
            </v-card>
        </v-card>
        <v-dialog v-model="dialog" max-width="700" scrollable>
            <v-card>
                <v-card-title>
                    Data String
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 600px;">
                    {{ dataStr }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false"
                        >close</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            edgeEdit: false, // 是否正在增加边线
            addConfirm: true, // 是否已经确定增加
            currentItem: null,
            nodeOption: {
                label: ''
            },
            edgeOption: {
                label: ''
            },
            // 当前节点实例
            currentEdge: null, // 当前边线实例
            graph: null,
            isAddEdge: false,
            dialog: false,
            nodes: [
                {
                    type: 'circle',
                    size: 100,
                    style: {
                        fill: '#FFF9C4',
                        stroke: '#FBC02D'
                    },
                    stateStyles: {
                        selected: {
                            fill: '#FFEE58'
                        }
                    }
                },
                {
                    type: 'rect',
                    size: [100, 60],
                    style: {
                        fill: '#E1F5FE',
                        stroke: '#29B6F6'
                    },
                    stateStyles: {
                        selected: {
                            fill: '#81D4FA'
                        }
                    }
                },
                {
                    type: 'ellipse',
                    size: [100, 60],
                    style: {
                        fill: '#B2DFDB',
                        stroke: '#26A69A'
                    },
                    stateStyles: {
                        selected: {
                            fill: '#80CBC4'
                        }
                    }
                },
                {
                    type: 'diamond',
                    size: 100,
                    style: {
                        fill: '#FFCCBC',
                        stroke: '#FF7043'
                    },
                    stateStyles: {
                        selected: {
                            fill: '#FFAB91'
                        }
                    }
                }
            ],
            colorOptions: ['#FBC02D', '#29B6F6', '#26A69A', '#FF7043'],
            dataStr: ''
        };
    },
    mounted() {
        const width = this.$refs['Graph'].$el.clientWidth;
        // const minimap = new G6.Minimap({
        //     size: [100, 100],
        //     animate: true,
        //     className: 'minimap',
        //     type: 'delegate'
        // });
        // 实例化 grid 插件
        // const grid = new G6.Grid();
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
                    y: e.canvasY,
                    linkPoints: {
                        size: 10,
                        top: true,
                        bottom: true,
                        left: true,
                        right: true,
                        fill: '#fff'
                    }
                });
            }
        });

        // 根据鼠标所在的节点位置判断modes
        G6.registerBehavior('nodeMove', {
            getEvents: () => {
                return {
                    'mousemove': 'mousemove',
                    'edge:click': 'edgeclick',
                    'edge:dblclick': 'edgedblclick',
                    'node:mousedown': 'nodeMousedown',
                    'drag': 'nodeDrag'
                };
            },
            // 增加边线鼠标移动
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
            // nodeMousemove: (e) => {
            //     this.checkNodePoint(e, 'move');
            // },
            // 点击节点获得位置判断点位
            nodeMousedown: (e) => {
                this.checkNodePoint(e, 'down');
            },
            nodeDrag: (e) => {
                if (this.addConfirm) {
                    return;
                }
                this.currentItem.update({
                    x: e.canvasX,
                    y: e.canvasY,
                    linkPoints: {
                        size: 10,
                        top: true,
                        bottom: true,
                        left: true,
                        right: true,
                        fill: '#fff'
                    }
                });
                this.currentItem.getEdges().map((item) => {
                    item.refresh();
                });
            },
            // 边线点击
            edgeclick: (e) => {
                this.addConfirm = true;
                this.edgeEdit = true;
                // TODO这个地方有点问题
                try {
                    this.currentItem &&
                        this.graph.setItemState(
                            this.currentItem,
                            'selected',
                            false
                        );
                    this.currentEdge &&
                        this.graph.setItemState(
                            this.currentEdge,
                            'selected',
                            false
                        );
                    this.currentEdge && this.currentEdge.refresh();
                } catch (err) {
                    console.log(err);
                }
                this.currentEdge = e.item;
                this.edgeOption.label = this.currentEdge.defaultCfg.model.label;
                this.graph.setItemState(this.currentEdge, 'selected', true);
            },
            // 边线双击
            edgedblclick: (e) => {
                console.log(e);
                this.addConfirm = true;
                this.addingEdge = true;
                this.currentEdge = e.item;
                const point = {
                    x: e.x,
                    y: e.y
                };
                this.graph.updateItem(this.currentEdge, {
                    target: point
                });
            }
        });

        // 节点按下鼠标 && 拖动 && 抬起动作
        G6.registerBehavior('nodeDrag', {
            getEvents: () => {
                return {
                    drag: 'drag',
                    dragend: 'dragend'
                };
            },
            //  开始拖拽节点
            drag: (e) => {
                if (this.addConfirm) {
                    return;
                }
                this.currentItem.update({
                    x: e.canvasX,
                    y: e.canvasY,
                    linkPoints: {
                        size: 10,
                        top: true,
                        bottom: true,
                        left: true,
                        right: true,
                        fill: '#fff'
                    }
                });
                this.currentItem.getEdges().map((item) => {
                    item.refresh();
                });
            },
            // 拖拽完成
            dragend: () => {
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
            height: 580,
            width: width,
            groupType: 'circle',
            modes: {
                default: ['nodeMove', 'drag-canvas'],
                addNode: ['addNode', 'click-select'], // 增加节点
                addEdge: ['addEdge', 'click-select'], // 增加线节点
                nodeMove: ['nodeMove', 'drag-canvas'] // 鼠标移入节点
                // nodeDrag: ['nodeDrag', 'drag-nodes'] // 拖动
            },
            defaultNode: {
                type: 'circle',
                label: '',
                style: {
                    cursor: 'move',
                    fill: '#FFF9C4',
                    stroke: '#FBC02D'
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
            edgeStateStyles: {
                selected: {
                    stroke: '#4DD0E1'
                }
            },
            defaultEdge: {
                type: 'polyline',
                // type: 'cubic-horizontal',
                label: '',
                style: {
                    stroke: '#B2EBF2',
                    radius: 10,
                    offset: 30,
                    lineWidth: 2,
                    endArrow: true,
                    cursor: 'pointer'
                }
            }
        });
    },
    methods: {
        // 获取鼠标点下所在节点的位置
        checkNodePoint(e, type) {
            const { canvasX, canvasY } = e;
            const { x, y, width, height } = e.item.getBBox();
            // 5是四个小圆点的宽高
            if (
                canvasX >= x + width / 2 - 5 &&
                canvasX <= x + width / 2 + 5 &&
                canvasY >= y - 5 &&
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
            } else {
                // console.log('进入可拖拽状态');
                // if(type === 'move') {
                //     this.isAddEdge = false;
                // }
                if (this.addingEdge && type === 'down') {
                    return;
                } else {
                    // console.log(this.currentItem, this.currentEdge);
                    // TODO这个地方有点问题
                    try {
                        // 取消选中的状态
                        this.currentItem &&
                            this.graph.setItemState(
                                this.currentItem,
                                'selected',
                                false
                            );
                        this.currentEdge &&
                            this.graph.setItemState(
                                this.currentEdge,
                                'selected',
                                false
                            );
                        this.currentEdge && this.currentEdge.refresh();
                    } catch (err) {
                        console.log(err);
                    }
                    // 获得当前选中的节点
                    this.currentItem = e.item;
                    this.nodeOption.label = this.currentItem.defaultCfg.model.label;
                    this.addConfirm = false;
                    this.addingEdge = false;
                    this.edgeEdit = false;
                    this.graph.setItemState(this.currentItem, 'selected', true);
                    // this.graph.setMode('nodeDrag');
                }
            }
        },
        onSetModeOfAddEdge() {
            // this.isAddEdge = true;
            // console.log(startArrow);
        },
        onSave() {
            this.dialog = true;
            this.dataStr = JSON.stringify(this.graph.save());
        },
        // 增加边线
        onAddEdge(ev, sourceAnchor) {
            this.currentItem &&
                this.graph.setItemState(this.currentItem, 'selected', false);
            const node = ev.item;
            const graph = this.graph;
            const point = {
                x: ev.x,
                y: ev.y
            };
            const model = node.getModel();
            // 如果存在就只更新位置
            if (this.addingEdge && this.currentEdge) {
                graph.updateItem(this.currentEdge, {
                    target: model.id,
                    targetAnchor: sourceAnchor
                });
                this.addingEdge = false;
            } else {
                this.currentEdge = graph.addItem('edge', {
                    source: model.id,
                    target: point,
                    sourceAnchor
                });
                this.addingEdge = true;
                this.edgeEdit = true;
                this.addConfirm = true;
            }
        },
        onDelItem(type) {
            if (type === 'edge') {
                this.graph.removeItem(this.currentEdge);
                this.edgeEdit = false;
                this.addingEdge = false;
                this.currentEdge = null;
            } else {
                this.graph.removeItem(this.currentItem);
                this.addConfirm = true;
                this.currentItem = null;
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
                label: item.type,
                style: item.style,
                stateStyles: item.stateStyles,
                id: `node_${this.addedCount}` // 生成唯一的 id
            });
            this.nodeOption.label = item.type;
            this.addedCount++;
            this.addConfirm = false;
            this.graph.setMode('addNode');
        },
        currentItemChange(val) {
            console.log(val);
            this.currentItem.update({
                label: val,
                linkPoints: {
                    size: 10,
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                    fill: '#fff'
                }
            });
        },
        currentEdgeChange(val) {
            this.currentEdge.update({
                label: val
            });
        },
        onAddData() {
            // 测试导出来的数据能重新放进去
            const dataStr =
                '{"nodes":[{"x":151,"y":328,"size":100,"type":"circle","label":"开始","style":{"selected":{"fill":"#FFEE58"},"fill":"#FFF9C4","stroke":"#FBC02D"},"stateStyles":{"selected":{"fill":"#FFEE58"}},"id":"node_0","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]},{"x":380,"y":328,"size":[100,60],"type":"rect","label":"审批","style":{"selected":{"fill":"#81D4FA"},"fill":"#E1F5FE","stroke":"#29B6F6"},"stateStyles":{"selected":{"fill":"#81D4FA"}},"id":"node_1","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]},{"x":605,"y":328,"size":[100,60],"type":"ellipse","label":"ellipse","style":{"selected":{"fill":"#80CBC4"},"fill":"#B2DFDB","stroke":"#26A69A"},"stateStyles":{"selected":{"fill":"#80CBC4"}},"id":"node_2","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]},{"x":859,"y":328,"size":[100,60],"type":"rect","label":"rect","style":{"selected":{"fill":"#81D4FA"},"fill":"#E1F5FE","stroke":"#29B6F6"},"stateStyles":{"selected":{"fill":"#81D4FA"}},"id":"node_3","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]},{"x":604,"y":144,"size":100,"type":"diamond","label":"人事","style":{"selected":{"fill":"#FFAB91"},"fill":"#FFCCBC","stroke":"#FF7043"},"stateStyles":{"selected":{"fill":"#FFAB91"}},"id":"node_4","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]},{"x":605,"y":513,"size":100,"type":"diamond","label":"厨房","style":{"selected":{"fill":"#FFAB91"},"fill":"#FFCCBC","stroke":"#FF7043"},"stateStyles":{"selected":{"fill":"#FFAB91"}},"id":"node_5","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]},{"x":1105,"y":328,"size":100,"type":"circle","label":"circle","style":{"selected":{"fill":"#FFEE58"},"fill":"#FFF9C4","stroke":"#FBC02D"},"stateStyles":{"selected":{"fill":"#FFEE58"}},"id":"node_6","linkPoints":{"size":10,"top":true,"bottom":true,"left":true,"right":true,"fill":"#fff"},"anchorPoints":[[0,0.5],[0.5,0],[1,0.5],[0.5,1]]}],"edges":[{"source":"node_0","target":"node_1","sourceAnchor":2,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge17","startPoint":{"x":201.5,"y":328,"index":2,"id":"201.5-328"},"endPoint":{"x":329.5,"y":328,"index":0,"id":"329.5-328"},"targetAnchor":0},{"source":"node_1","target":"node_2","sourceAnchor":2,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge18","startPoint":{"x":430.5,"y":328,"index":2,"id":"430.5-328"},"endPoint":{"x":554.5,"y":328,"index":0,"id":"554.5-328"},"targetAnchor":0},{"source":"node_2","target":"node_3","sourceAnchor":2,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge19","startPoint":{"x":655.5,"y":328,"index":2,"id":"655.5-328"},"endPoint":{"x":808.5,"y":328,"index":0,"id":"808.5-328"},"targetAnchor":0},{"source":"node_3","target":"node_6","sourceAnchor":2,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge20","startPoint":{"x":909.5,"y":328,"index":2,"id":"909.5-328"},"endPoint":{"x":1054.5,"y":328,"index":0,"id":"1054.5-328"},"targetAnchor":0},{"source":"node_4","target":"node_1","sourceAnchor":0,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge21","startPoint":{"x":553.2928932188134,"y":144,"index":0,"id":"553.2928932188134-144"},"endPoint":{"x":380,"y":297.5,"index":1,"id":"380-297.5"},"targetAnchor":1},{"source":"node_5","target":"node_2","sourceAnchor":1,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge23","startPoint":{"x":605,"y":462.29289321881345,"index":1,"id":"605-462.29289321881345"},"endPoint":{"x":605,"y":358.5,"index":3,"id":"605-358.5"},"targetAnchor":3},{"source":"node_4","target":"node_2","sourceAnchor":3,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge24","startPoint":{"x":604,"y":194.70710678118655,"index":3,"id":"604-194.70710678118655"},"endPoint":{"x":605,"y":297.5,"index":1,"id":"605-297.5"},"targetAnchor":1},{"source":"node_4","target":"node_3","sourceAnchor":1,"type":"polyline","label":"奶茶","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge26","startPoint":{"x":604,"y":93.29289321881345,"index":1,"id":"604-93.29289321881345"},"endPoint":{"x":859,"y":297.5,"index":1,"id":"859-297.5"},"targetAnchor":1},{"source":"node_5","target":"node_3","sourceAnchor":3,"type":"polyline","label":"做饭","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge28","startPoint":{"x":605,"y":563.7071067811866,"index":3,"id":"605-563.7071067811866"},"endPoint":{"x":859,"y":358.5,"index":3,"id":"859-358.5"},"targetAnchor":3},{"source":"node_5","target":"node_1","sourceAnchor":0,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge29","startPoint":{"x":554.2928932188134,"y":513,"index":0,"id":"554.2928932188134-513"},"endPoint":{"x":380,"y":358.5,"index":3,"id":"380-358.5"},"targetAnchor":3},{"source":"node_5","target":"node_0","sourceAnchor":2,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge30","startPoint":{"x":655.7071067811866,"y":513,"index":2,"id":"655.7071067811866-513"},"endPoint":{"x":100.5,"y":328,"index":0,"id":"100.5-328"},"targetAnchor":0},{"source":"node_4","target":"node_0","sourceAnchor":2,"type":"polyline","label":"","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge31","startPoint":{"x":654.7071067811866,"y":144,"index":2,"id":"654.7071067811866-144"},"endPoint":{"x":100.5,"y":328,"index":0,"id":"100.5-328"},"targetAnchor":0},{"source":"node_0","target":"node_6","sourceAnchor":1,"type":"polyline","label":"label","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge32","startPoint":{"x":151,"y":277.5,"index":1,"id":"151-277.5"},"endPoint":{"x":1105,"y":277.5,"index":1,"id":"1105-277.5"},"targetAnchor":1},{"source":"node_6","target":"node_0","sourceAnchor":3,"type":"polyline","label":"labe;l","style":{"selected":{"stroke":"#4DD0E1"},"stroke":"#B2EBF2","radius":10,"offset":30,"lineWidth":2,"endArrow":true,"cursor":"pointer"},"id":"edge33","startPoint":{"x":1105,"y":378.5,"index":3,"id":"1105-378.5"},"endPoint":{"x":151,"y":378.5,"index":3,"id":"151-378.5"},"targetAnchor":3}],"groups":[]}';
            const obj = JSON.parse(dataStr);
            console.log(obj);
            for (let i = 0; i < obj.nodes.length; i++) {
                obj.nodes[i].linkPoints.size = 5;
            }
            this.graph.data(obj);
            this.graph.render();
        },
        onClear() {
            this.graph.clear();
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
    .Graph_actions {
        width: 100%;
        position: absolute;
        top: 170px;
        left: 0;
    }
    .Graph {
        canvas {
            cursor: grab;
        }
        .icon_panel {
            position: absolute;
            left: 16px;
            top: -50px;
            padding: 35px 45px;
        }
        .label_wrap {
            max-width: 250px;
            position: absolute;
            right: 16px;
            top: 240px;
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
