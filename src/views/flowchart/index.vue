<template>
    <div class="flowchart">
        <div class="page_title">
            AntV G6 Graph visualization engine
            <div class="min_title">
                Please checkout the full documentation https://g6.antv.vision/zh
            </div>
        </div>
        <v-card id="Graph" :height="700">
            <v-card-actions>
                <v-btn text @click="onAddItem">add</v-btn>
                <v-btn text @click="onEdit">edit</v-btn>
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
    addedCount: 0,
    mounted() {
        const minimap = new G6.Minimap({
            size: [200, 300],
            className: 'minimap'
        });
        // Register a custom behavior to add node
        G6.registerBehavior('click-add-node', {
            getEvents: () => {
                return {
                    'node:click': 'onClick',
                    // eslint-disable-next-line quote-props
                    mousemove: 'onMousemove',
                    'edge:click': 'onEdgeClick' // 点击空白处，取消边
                };
            },
            onClick: (ev) => {
                console.log(ev);
                // this.graph;
                // this.graph.addItem('node', {
                //     x: ev.canvasX,
                //     y: ev.canvasY,
                //     id: `node-${this.addedCount}` // 生成唯一的 id
                // });
                // this.addedCount++;
            },
            onMousemove: (e) => {
                // console.log(e);
                
            },
            onEdgeClick: (e) => {
                console.log(e);
            }
        });
        this.graph = new G6.Graph({
            plugins: [minimap],
            container: 'Graph',
            height: 600,
            width: 1000,
            groupType: 'circle',
            modes: {
                default: ['drag-canvas', 'zoom-canvas'],
                view: [],
                edit: ['click-add-node', 'click-select'],
            },
            defaultNode: {
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
                type: 'flow-polyline-round'
            }
        });
    },
    methods: {
        onAddItem() {
            const data = {
                nodes: [
                    {
                        size: 100,
                        x: 300,
                        y: 300,
                        type: 'circle',
                        label: 'circle'
                    },
                    {
                        width: 100,
                        height: 50,
                        x: 110,
                        y: 110,
                        type: 'rect',
                        label: 'circle'
                    },
                    {
                        width: 100,
                        height: 50,
                        x: 110,
                        y: 250,
                        type: 'ellipse',
                        label: 'circle'
                    }
                ]
            };
            this.graph.data(data);
            this.graph.render();
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
}
.minimap {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
