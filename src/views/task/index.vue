<template>
    <div class="task_router_content">       
        <div
            class="scroll-wrap"
            @click.stop="handleHideDetail"
        >
            <div class="inner-head">
                <div class="title">{{ $t("task.title") }}</div>
                <v-btn
                    small
                    fab
                    dark
                    color="indigo"
                    @click="click"
                >
                    <v-icon dark>add</v-icon>
                </v-btn>
            </div>
            <v-card :class="{ slider: slider }">
                <v-list
                    two-line
                    subheader
                >
                    <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        avatar
                        @click.stop="handleShowDetail(item)"
                    >
                        <v-list-tile-avatar>
                            <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title :title="item.title">{{ item.title }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn
                                icon
                                ripple
                            >
                                <v-icon color="grey lighten-1">star</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </div>
        <v-card
            class="task-detail"
            :class="{ hidetaskdetail:detailStatus }"
        >
            <div class="toolbar">
                <v-btn
                    fab
                    dark
                    small
                    :color="detail.iconClass"
                >
                    <v-icon dark>{{ detail.icon }}</v-icon>
                </v-btn>
                <div class="title">
                    <span>{{detail.title}}</span>
                </div>
            </div>
            <div class="content-wrap">
                <div class="content">
                    <v-card>
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                            height="300px"
                        >
                            <v-layout
                                column
                                fill-height
                            >
                                <v-card-title>
                                    <v-btn
                                        dark
                                        icon
                                    >
                                        <v-icon>chevron_left</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn
                                        dark
                                        icon
                                        class="mr-3"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>

                                    <v-btn
                                        dark
                                        icon
                                    >
                                        <v-icon>more_vert</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-spacer></v-spacer>

                                <v-card-title class="white--text pl-5 pt-5">
                                    <div class="display-1 pl-5 pt-5">Ali Conners</div>
                                </v-card-title>
                            </v-layout>
                        </v-img>

                        <v-list two-line>
                            <v-list-tile @click="click">
                                <v-list-tile-action>
                                    <v-icon color="indigo">phone</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                                    <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon>chat</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-list-tile @click="click">
                                <v-list-tile-action></v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>(323) 555-6789</v-list-tile-title>
                                    <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon>chat</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-divider inset></v-divider>

                            <v-list-tile @click="click">
                                <v-list-tile-action>
                                    <v-icon color="indigo">mail</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                                    <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile @click="click">
                                <v-list-tile-action></v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                                    <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-divider inset></v-divider>

                            <v-list-tile @click="click">
                                <v-list-tile-action>
                                    <v-icon color="indigo">location_on</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>1400 Main Street</v-list-tile-title>
                                    <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                    <h1>111</h1>
                </div>
            </div>
        </v-card>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            menu: [
                {
                    action: 'move_to_inbox',
                    title: 'Inbox'
                },
                {
                    action: 'send',
                    title: 'Sent'
                },
                {
                    action: 'delete',
                    title: 'Trash'
                },
                {
                    action: 'report',
                    title: 'Spam'
                },
                { divider: true },
                { header: 'Labels' },
                {
                    action: 'label',
                    title: 'Family'
                },
                {
                    action: 'label',
                    title: 'Friends'
                },
                {
                    action: 'label',
                    title: 'Work'
                }
            ],
            items: [
                {
                    icon: 'folder',
                    iconClass: 'grey lighten-1 white--text',
                    title: 'Photos task',
                    subtitle: 'Jan 9, 2014'
                },
                {
                    icon: 'folder',
                    iconClass: 'grey lighten-1 white--text',
                    title: 'Recipes',
                    subtitle: 'Jan 17, 2014'
                },
                {
                    icon: 'folder',
                    iconClass: 'grey lighten-1 white--text',
                    title: 'Work',
                    subtitle: 'Jan 28, 2014'
                },
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    title: 'Vacation itinerary',
                    subtitle: 'Jan 20, 2014'
                },
                {
                    icon: 'call_to_action',
                    iconClass: 'amber white--text',
                    title: 'Kitchen remodel',
                    subtitle: 'Jan 10, 2014'
                }
            ],
            slider: true,
            detailStatus: true,
            detail: {
                title: 'title'
            }
        };
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin;
        }
    },
    mounted() {
        this.$vuetify.theme.primary = '#1890ff';
        setTimeout(() => {
            this.slider = false;
        }, 100);
    },
    methods: {
        click() {},
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
    .scroll-wrap {
        flex: 1;
        margin: 0 30px;
        .inner-head {
            height: 80px;
            position: relative;
            display: flex;
            align-items: center;
            .title {
                font-size: 21px;
                margin-right: auto;
            }
            .v-btn {
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
