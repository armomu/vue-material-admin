<template>
    <div
        class="task_router_content"
        @click.stop="handleHideDetail"
        @mousedown.stop="testDown"
        @mouseup.stop="testUp"
        @mousemove.stop="testMove"
        @mouseout.stop="touchStart = false"
    >
        <div></div>
        <div class="scroll-wrap" ref="scrollWrap">
            <div class="inner-head">
                <div class="title">{{ $t("task.title") }}</div>
                <v-btn small fab dark color="primary" @click="click">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </div>
            <v-card :class="{ slider: slider }">
                <v-list subheader>
                    <template
                        v-for="(item,key) in items"
                    >   
                        <v-list-tile                            
                            :key="key + 2"
                            avatar
                            @click.stop="handleShowDetail(item)"
                        >
                            <v-list-tile-avatar @click.stop="handleCheckbox(key)">
                                <v-checkbox v-model="item.active"></v-checkbox>
                            </v-list-tile-avatar>                        
                            <v-list-tile-content>
                                <v-list-tile-title :title="item.title">{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action @click.stop="handleCollect(key)">
                                <v-btn icon ripple>
                                    <v-icon color="amber lighten-1" v-if="item.isCollect">star</v-icon>
                                    <v-icon color="grey lighten-1" v-else>star</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </div>
        <v-card class="task-detail" :class="{ hidetaskdetail:detailStatus }">
            <div class="toolbar">
                <v-btn fab dark small :color="detail.iconClass">
                    <v-icon dark>{{ detail.icon }}</v-icon>
                </v-btn>
                <div class="title">
                    <span>{{detail.title}}</span>
                </div>
            </div>
            <div class="content-wrap">
                <div class="content">
                    <h1>111</h1>
                </div>
            </div>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Dialog title</span>
                </v-card-title>
                <v-card-text>本页面支持滚动底部加载分页，下拉刷新 (￣▽￣)""</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [],
            slider: true,
            detailStatus: true,
            detail: {
                title: "title"
            },
            dialog: true,
            touchStart: false,
            panelStartOffsetY: 0,
            panelMoveOffsetY: 0
        };
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin;
        }
    },
    mounted() {
        this.$vuetify.theme.primary = "#1890ff";
        setTimeout(() => {
            this.slider = false;
            for (let i = 0; i < 15; i++) {
                console.log(i);
                this.items.push({
                    title: "task" + i,
                    acitive: false,
                    isCollect: false
                });
            }
        }, 200);
    },
    methods: {
        click() {},
        testDown(e) {
            this.touchStart = true;
            this.panelStartOffsetY = e.offsetY;
            console.log(e.offsetY);
        },
        testMove(e) {
            if (this.touchStart) {
                // console.log(e.offsetY);
                const { offsetY } = e;
                console.log(offsetY, this.panelStartOffsetY);
                this.panelMoveOffsetY = offsetY;
                if (offsetY > this.panelStartOffsetY) {
                    this.$refs.scrollWrap.style.transform = `translateY(${offsetY -
                        this.panelStartOffsetY}px)`;
                }
            }
        },
        testUp(e) {
            this.touchStart = false;
            this.$refs.scrollWrap.style.transform = `translateY(${0}px)`;
            console.log(e.offsetY);
        },
        handleCollect(key) {
            this.items[key].isCollect = !this.items[key].isCollect;
        },
        handleCheckbox(key) {
            this.items[key].acitve = !this.items[key].acitve;
        },
        handleHideDetail() {
            this.detailStatus = true;
        },
        handleShowDetail(item) {
            this.detail = item;
            this.detailStatus = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.nav-link.router-link-active {
    color: #fff;
}
.task_router_content {
    flex: 1;
    display: flex;
    height: calc(100vh - 64px);
    overflow-y: auto;
    align-items: flex-start;
    &:hover::-webkit-scrollbar-thumb {
        background: #bdbdbd;
    }
    &::-webkit-scrollbar {
        // 定义了滚动条整体的样式；
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        width: 8px;
        border-radius: 4px;
        background: transparent;
    }
    .scroll-wrap {
        flex: 1;
        margin: 0 30px 50px 30px;
        transition: transform 0.3s;
        height: auto;
        .inner-head {
            height: 80px;
            position: relative;
            display: flex;
            align-items: center;
            .title {
                font-size: 21px;
                margin-right: auto;
            }
        }
    }
    .task-detail {
        flex: 0 0 600px;
        height: calc(100vh - 64px);
        overflow-y: auto;
        z-index: 1;
        .toolbar {
            background: #ffffff;
            height: 80px;
            display: flex;
            align-items: center;
            box-shadow: 0px 5px 5px #efefef;
            position: relative;
            z-index: 2;
        }
        .content-wrap {
            height: calc(100vh - 144px);
            overflow-y: auto;
            background: #fafafa;
            &:hover::-webkit-scrollbar-thumb {
                background: #bdbdbd;
            }
            &::-webkit-scrollbar {
                // 定义了滚动条整体的样式；
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                width: 8px;
                border-radius: 4px;
                background: transparent;
            }
            .content {
                .v-card {
                    margin: 20px;
                }
                h1 {
                    height: 1000px;
                }
            }
        }
    }
    .hidetaskdetail.task-detail {
        flex: 0 0 0;
    }
    .slider.v-card {
        .v-list {
            > div {
                padding: 30px 0;
            }
        }
    }
}
</style>
