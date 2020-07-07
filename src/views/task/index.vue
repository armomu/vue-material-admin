<template>
  <div
    class="task_router_content"
    @touchstart.stop="testDown"
    @touchend.stop="touchtUp"
    @touchmove.stop="touchMove"
    @mouseout.stop="touchStart = false"
  >
    <div class="down_tip_section" ref="down_tip_section" :class="{ hisDetail: detailStatus }">
      <span>{{ loadText }}</span>
    </div>
    <div class="list_wrap" ref="down_section">
      <div class="inner-head">
        <v-btn small fab dark color="primary" class="mr-4" @click="createTaskmDialogVisible = true">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          label="Search"
          clearable
          prepend-inner-icon="mdi-magnify"
          class="min_hide"
          outlined
          dense
          style=" flex:150px 0 0; height: 40px"
        ></v-text-field>
        <v-select
          v-model="detail.association"
          :items="selects"
          clearable
          outlined
          dense
          label="Association"
          class="min_hide ml-5"
          style="flex:150px 0 0; height: 40px"
        ></v-select>
        <!--  -->
        <v-menu v-model="filterVisible" :close-on-content-click="false" offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn small fab v-on="on" class="ml-5">
              <v-icon dark>mdi-filter-menu</v-icon>
            </v-btn>
          </template>
          <v-card class="mx-auto" min-height="350" min-width="350">
            <v-subheader>RadioGroup Filter</v-subheader>
            <v-radio-group v-model="radioGroup" class="ml-5">
              <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n" color="primary"></v-radio>
            </v-radio-group>
            <v-subheader>Switch Filter</v-subheader>
            <v-switch v-model="switch1" color="primary" class="ml-5"></v-switch>
            <v-subheader>BottonGroup Filter</v-subheader>
            <v-btn-toggle v-model="toggle_exclusive" class="ml-5 mb-6">
              <v-btn>
                <v-icon>mdi-format-align-left</v-icon>
              </v-btn>

              <v-btn>
                <v-icon>mdi-format-align-center</v-icon>
              </v-btn>

              <v-btn>
                <v-icon>mdi-format-align-right</v-icon>
              </v-btn>

              <v-btn>
                <v-icon>mdi-format-align-justify</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-card>
        </v-menu>
        <v-btn small fab class="ml-5">
          <v-icon dark>mdi-printer</v-icon>
        </v-btn>
        <v-btn small fab class="ml-5">
          <v-icon dark>mdi-file-download</v-icon>
        </v-btn>
      </div>
      <!--主体部分-->
      <div class="scroll_wrap" @scroll="handleScoll" ref="scrollWrap">
        <v-card ref="cardSection">
          <v-list subheader style="background: none">
            <div
              class="v-list-item-pro"
              v-for="(item, key) in items"
              :key="key"
              :class="'v-list-item-' + item.className"
            >
              <v-list-item :class="{ active: item.active }" @click.stop="() => {}" :ripple="false">
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.selected"
                    color="primary"
                    @change="itemSelectedChange(key)"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content @click.stop="handleShowDetail(item, key)">
                  <v-list-item-title :title="item.title">
                    {{
                    item.name
                    }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action @click.stop="handleCollect(key)">
                  <v-btn icon ripple>
                    <v-icon
                      :color="
                                                item.isCollect
                                                    ? 'amber lighten-1'
                                                    : 'grey lighten-1'
                                            "
                    >mdi-star</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-list>
        </v-card>
      </div>
      <!--主体部分-->
    </div>
    <!--右边部分开始-->
    <div
      class="right_section"
      ref="right_section"
      :class="{ hidetaskdetail: detailStatus }"
      @click.stop="() => {}"
    >
      <v-card class="inner_wrap" v-if="!detailStatus">
        <v-toolbar style="width: 100%" absolute>
          <v-btn
            rounded
            :color="detail.selectedColor"
            outlined
            class="mr-5"
            @click.stop="handleCheckbox(detail.key)"
          >
            <v-icon dark>mdi-check</v-icon>Complete
          </v-btn>
          <v-btn icon ripple @click.stop="handleCollect(detail.key)">
            <v-icon
              :color="
                                detail.isCollect
                                    ? 'amber lighten-1'
                                    : 'grey darken-1'
                            "
            >mdi-star</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="detailStatus = true">
            <v-icon color="grey darken-1">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="content-wrap">
          <div class="content">
            <v-layout row wrap style="margin: 20px 20px 0 0">
              <v-flex xs2 style="display: flex; align-items: center; justify-content: center">
                <v-icon color="primary" large>mdi-run</v-icon>
              </v-flex>
              <v-flex xs5>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="detail.startTime"
                      v-on="on"
                      label="Start time"
                      required
                      style="margin-right: 10px"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="detail.startTime"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs5>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="detail.endTime"
                      v-on="on"
                      label="End time"
                      required
                      style="margin-left: 10px"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="detail.endTime"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-tabs
              v-model="tab"
              style="border-bottom: 1px solid rgba(0,0,0,0.12); min-width: 320px; background: #fff"
            >
              <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in tabs" :key="item">
                <v-card flat style="margin: 0;">
                  <v-card-text>{{ item }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </v-card>
    </div>
    <!--右边部分结束-->
    <v-snackbar v-model="dialog" multi-line top left absolute>
      {{ tips }}
      <v-btn color="primary" @click="dialog = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="isLoad" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text style="padding: 20px 24px">
          Please stand by
          <v-progress-linear indeterminate color="white" class="mt-2"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createTaskmDialogVisible" :persistent="false" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create task</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation class="task_form">
          <v-text-field
            v-model="detail.name"
            :counter="10"
            :rules="nameRules"
            label="Task name"
            required
          ></v-text-field>
          <v-layout row wrap style="margin: 0;">
            <v-flex xs6>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="detail.startTime"
                    v-on="on"
                    label="Start time"
                    required
                    style="margin-right: 10px"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="detail.startTime"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="detail.endTime"
                    v-on="on"
                    label="End time"
                    required
                    style="margin-left: 10px"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="detail.endTime"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-select v-model="detail.association" :items="selects" label="Association" required></v-select>
          <v-textarea name="desc" label="Descption" v-model="detail.desc"></v-textarea>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createTaskmDialogVisible = false">cancel</v-btn>
          <v-btn color="primary" @click="createTaskmDialogVisible = false">Save</v-btn>
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
            filterVisible: false,
            detailStatus: true,
            toggle_exclusive: 2,
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
            selects: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
            nameRules: [
                (v) => !!v || 'Task name is required',
                (v) =>
                    (v && v.length <= 10) ||
                    'Task name must be less than 10 characters'
            ],
            loadText: '下拉刷新',
            valid: true,
            tips:
                '本页面支持滚动底部加载分页，下拉刷新只支持手机端 (￣▽￣) """ >>>',
            dialog: true,
            createTaskmDialogVisible: false,
            touchStart: false,
            panelStartOffsetY: 0,
            panelMoveOffsetY: 0,
            pageIndex: 1,
            pageSize: 15,
            total: 0,
            isLoad: true,
            tab: null,
            tabs: ['comment', 'Flies'],
            checkbox: true,
            radioGroup: 1,
            switch1: true,
            noData: false
        };
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin;
        }
    },
    mounted() {
        console.log(process.env.NODE_ENV);
        setTimeout(() => {
            for (let i = 0; i < 15; i++) {
                this.items.push({
                    name: 'task' + i,
                    key: i,
                    className: i,
                    active: false,
                    isCollect: false,
                    selected: false,
                    selectedColor: 'gray',
                    startTime: '',
                    endTime: '',
                    desc: '',
                    association: ''
                });
            }
            this.detail = this.items[0];
            this.total = 15;
            this.isLoad = false;
        }, 1000);
    },
    methods: {
        click() {},
        testDown(e) {
            this.touchStart = true;
            this.panelStartOffsetY = e.targetTouches[0].clientY;
        },
        touchMove(e) {
            // console.log(this.$refs)
            if (this.touchStart && this.$refs.scrollWrap.scrollTop <= 0) {
                const offsetY = e.changedTouches[0].clientY;
                this.panelMoveOffsetY = offsetY;
                if (offsetY > this.panelStartOffsetY && this.detailStatus) {
                    const translateY = offsetY - this.panelStartOffsetY;
                    this.$refs.down_section.style.transform = `translateY(${translateY}px)`;
                    // this.$refs.down_tip_section.style.transform = `translateY(${0 - translateY}px)`;
                    if (translateY < 80) {
                        // this.$refs.down_tip_section.style.top = `${-30 + translateY}px`;
                        this.$refs.down_tip_section.style.transform = `translateY(${translateY}px)`;
                        this.loadText = '下拉刷新';
                    } else {
                        this.loadText = '别拉了快放手...';
                        // this.$refs.down_tip_section.style.top = "80px";
                        this.$refs.down_tip_section.style.transform =
                            'translateY(80px)';
                    }
                }
            }
        },
        touchtUp(e) {
            this.touchStart = false;
            const offsetY = e.changedTouches[0].clientY;
            if (
                offsetY - this.panelStartOffsetY >= 80 &&
                this.$refs.scrollWrap.scrollTop <= 0 &&
                this.detailStatus
            ) {
                this.isLoad = true;
                this.loadText = '加载中...';
                setTimeout(() => {
                    const items = [];
                    for (let i = 0; i < 15; i++) {
                        items.push({
                            name: 'task' + i,
                            key: i,
                            className: i,
                            active: false,
                            isCollect: false,
                            selected: false,
                            startTime: '',
                            endTime: '',
                            desc: '',
                            association: ''
                        });
                    }
                    this.$refs.scrollWrap.scrollTop = 0;
                    this.items = items;
                    this.total = 15;
                    this.pageIndex = 1;
                    this.isLoad = false;
                    this.$refs.down_section.style.transform = 'translateY(0px)';
                    this.$refs.down_tip_section.style.transform =
                        'translateY(0px)';
                    this.loadText = '下拉刷新';
                    // if(this.$refs.scrollWrap){
                    //     this.$router.push({
                    //     path: "/task/mine?pageIndex=" + this.pageIndex
                    // });
                    // }
                }, 1000);
            } else {
                this.$refs.down_section.style.transform = 'translateY(0px)';
                this.$refs.down_tip_section.style.transform = 'translateY(0px)';
                this.loadText = '下拉刷新';
            }
        },
        handleScoll(e) {
            const { scrollTop } = e.srcElement;
            const { offsetHeight } = this.$refs.scrollWrap;
            const cardOffsetHeight = this.total * 56 + 8;
            if (
                scrollTop > cardOffsetHeight - offsetHeight &&
                !this.isLoad &&
                !this.noData
            ) {
                if (this.total > 75) {
                    this.tips = '没有更多数据了';
                    this.dialog = true;
                    this.noData = true;
                    return;
                }
                this.loadPages();
            }
        },
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
            this.items[this.detail.key].active = false;
            item.selectedColor = item.selected ? 'green' : 'gray';
            this.detail = item;
            this.detailStatus = false;
            document.onclick = () => {
                this.detailStatus = true;
                this.items[key].active = false;
                document.onclick = null;
            };
        },
        loadPages() {
            this.isLoad = true;
            this.pageIndex += 1;
            // this.$router.history.current.params.pageIndex = this.pageIndex;
            // console.log(this.$router)
            this.$router.push({
                path: '/tasks?pageIndex=' + this.pageIndex
            });
            for (let i = this.total; i < this.total + 15; i++) {
                this.items.push({
                    name: 'task' + i,
                    key: i,
                    className: i,
                    active: false,
                    selected: false,
                    isCollect: false,
                    startTime: '',
                    endTime: '',
                    desc: '',
                    association: ''
                });
            }
            this.total += 15;
            this.scrollTop = this.$refs.scrollWrap.scrollTop;
            setTimeout(() => {
                this.isLoad = false;
            }, 1000);
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
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  .down_tip_section {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 700px);
    top: -30px;
    transition: transform 0ms;
    span {
      line-height: 30px;
      font-size: 15px;
    }
  }
  .down_tip_section.hisDetail {
    width: 100%;
  }
  .list_wrap {
    flex: 1;
    margin: 0 20px 50px 20px;
    transition: transform 0ms;
    .inner-head {
      padding: 0 15px 0 10px;
      height: 80px;
      position: relative;
      display: flex;
      align-items: center;
      .title {
        font-size: 21px;
        margin-right: auto;
      }
    }
    .scroll_wrap {
      height: calc(100vh - 144px);
      overflow-y: auto;
      padding: 5px 5px 5px 10px;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      .active {
        background: rgba(0, 0, 0, 0.04);
      }
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
      .v-card {
        margin-bottom: 20px;
        @for $i from 1 through 14 {
          .v-list-item-#{$i} {
            opacity: 0;
            animation: itemSlideIn 0.5s linear #{$i / 20}s;
            animation-fill-mode: forwards;
          }
        }
      }
    }
  }
  .list_wrap_am {
    transition: all 0.3s;
  }
  .right_section {
    width: 700px;
    flex: 0 0 700px;
    height: calc(100vh - 64px);
    z-index: 1;
    transition: all 0.3s;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    position: relative;
    .inner_wrap {
      width: 700px;
      padding: 64px 0;
      animation: fadeIn 0.3s linear;
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
        height: calc(100vh - 128px);
        overflow-y: auto;
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
          height: 2000px;
          .v-card {
            margin: 20px;
            padding-top: 10px;
          }
        }
      }
    }
  }
  .hidetaskdetail.right_section {
    width: 0;
    flex: 0 0 0;
  }
}
</style>
