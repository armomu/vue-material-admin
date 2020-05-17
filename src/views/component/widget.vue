<template>
    <div class="widget_page ma-5">
        <div class="page_title">
            Material Design
Component Framework
            <div class="min_title">
                Please checkout the full
                <a href="https://vuetifyjs.com/en/" target="_black"
                    >documentation</a
                >
            </div>
        </div>
        <v-card class="mt-5">
            <v-card-title>提示框</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6"> </v-col>
                <v-col cols="6" sm="12" md="6"> </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>提示框</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-alert type="success">
                        I'm a success alert.
                    </v-alert>
                    <v-alert type="info">
                        I'm an info alert.
                    </v-alert>
                    <v-alert type="warning">
                        I'm a warning alert.
                    </v-alert>
                    <v-alert type="error">
                        I'm an error alert.
                    </v-alert>
                    <v-dialog v-model="dialog" width="350">
                        <template v-slot:activator="{ on }">
                            <v-btn color="red lighten-2" dark v-on="on">
                                Dialog alert
                            </v-btn>
                        </template>
                        <v-alert type="success" class="mb-0">
                            Praesent venenatis metus at tortor pulvinar varius.
                            Aenean commodo ligula eget dolor. Praesent ac massa
                            at ligula laoreet iaculis. Vestibulum ullamcorper
                            mauris at ligula.
                        </v-alert>
                    </v-dialog>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-alert
                        border="left"
                        colored-border
                        color="deep-purple accent-4"
                        elevation="2"
                    >
                        I'm a success alert.
                    </v-alert>
                    <v-alert
                        border="top"
                        colored-border
                        type="info"
                        elevation="2"
                    >
                        I'm a success alert.
                    </v-alert>
                    <v-alert
                        border="bottom"
                        colored-border
                        type="warning"
                        elevation="2"
                    >
                        I'm a success alert.
                    </v-alert>
                    <v-alert
                        border="right"
                        colored-border
                        type="error"
                        elevation="2"
                    >
                        I'm a success alert.
                    </v-alert>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>徽章</v-card-title>
            <v-row
                align="center"
                justify="center"
                class="justify-center pl-5 pr-5 pb-5"
            >
                <v-badge bordered color="error" icon="mdi-lock" overlap>
                    <v-btn class="white--text" color="error" depressed>
                        Lock Account
                    </v-btn>
                </v-badge>
                <div class="mx-3"></div>

                <v-badge
                    content="9"
                    value="9"
                    :offset-x="30"
                    :offset-y="20"
                    overlap
                    bordered
                >
                    <v-btn text>
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
                <div class="mx-3"></div>

                <v-badge
                    bordered
                    bottom
                    color="deep-purple accent-4"
                    dot
                    offset-x="10"
                    offset-y="10"
                >
                    <v-avatar size="40">
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                        ></v-img>
                    </v-avatar>
                </v-badge>

                <div class="mx-3"></div>

                <v-badge avatar bordered overlap>
                    <template v-slot:badge>
                        <v-avatar>
                            <v-img
                                src="https://cdn.vuetifyjs.com/images/logos/v.png"
                            ></v-img>
                        </v-avatar>
                    </template>

                    <v-avatar size="40">
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/john.png"
                        ></v-img>
                    </v-avatar>
                </v-badge>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>工具栏</v-card-title>
            <v-row class="pl-5 pr-5 pb-5">
                <v-col
                    v-for="(bar, i) in bars"
                    :key="i"
                    cols="12"
                    sm="12"
                    md="6"
                    class="my-4"
                >
                    <v-card color="grey lighten-4" flat height="200px">
                        <v-toolbar :color="bar.class" :dark="bar.dark">
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>
                            <v-toolbar-title>Title</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>底部导航栏</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-bottom-navigation :value="activeBtn" grow color="teal">
                        <v-btn>
                            <span>Recents</span>
                            <v-icon>mdi-history</v-icon>
                        </v-btn>

                        <v-btn>
                            <span>Favorites</span>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>

                        <v-btn>
                            <span>Nearby</span>
                            <v-icon>mdi-map-marker</v-icon>
                        </v-btn>
                    </v-bottom-navigation>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-bottom-navigation v-model="activeBtn" dark shift>
                        <v-btn>
                            <span>Video</span>
                            <v-icon>mdi-television-play</v-icon>
                        </v-btn>

                        <v-btn>
                            <span>Music</span>
                            <v-icon>mdi-music-note</v-icon>
                        </v-btn>

                        <v-btn>
                            <span>Book</span>
                            <v-icon>mdi-book</v-icon>
                        </v-btn>

                        <v-btn>
                            <span>Image</span>
                            <v-icon>mdi-image</v-icon>
                        </v-btn>
                    </v-bottom-navigation>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>底部菜单栏</v-card-title>
            <div class="text-center pl-5 pr-5 pb-5 ">
                <v-bottom-sheet v-model="sheet" persistent>
                    <template v-slot:activator="{ on }">
                        <v-btn color="green" dark v-on="on">
                            Open Persistent
                        </v-btn>
                    </template>
                    <v-sheet class="text-center" height="200px">
                        <v-btn
                            class="mt-6"
                            flat
                            color="error"
                            @click="sheet = !sheet"
                            >close</v-btn
                        >
                        <div class="py-3">
                            This is a bottom sheet using the persistent prop
                        </div>
                    </v-sheet>
                </v-bottom-sheet>
            </div>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>按钮</v-card-title>
            <v-row align="center">
                <v-col class="text-center" cols="12" sm="4">
                    <div class="my-2">
                        <v-btn small>Normal</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn small color="primary">Primary</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn small color="error">Error</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn small disabled>Disabled</v-btn>
                    </div>
                </v-col>
                <v-col class="text-center" cols="12" sm="4">
                    <div class="my-2">
                        <v-btn>Normal</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn color="primary">Primary</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn color="error">Error</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn disabled>Disabled</v-btn>
                    </div>
                </v-col>
                <v-col class="text-center" cols="12" sm="4">
                    <div class="my-2">
                        <v-btn large>Normal</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn large color="primary">Primary</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn large color="error">Error</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn large disabled>Disabled</v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-btn class="mx-2" fab dark small color="primary">
                    <v-icon dark>mdi-minus</v-icon>
                </v-btn>

                <v-btn class="mx-2" fab dark small color="pink">
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>

                <v-btn class="mx-2" fab dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>

                <v-btn class="mx-2" fab dark color="teal">
                    <v-icon dark>mdi-format-list-bulleted-square</v-icon>
                </v-btn>

                <v-btn class="mx-2" fab dark large color="cyan">
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>

                <v-btn class="mx-2" fab dark large color="purple">
                    <v-icon dark>mdi-android</v-icon>
                </v-btn>
            </v-row>
        </v-card>
        <v-card class="mt-5 pb-5">
            <v-card-title>卡片</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">OVERLINE</div>
                                <v-list-item-title class="headline mb-1"
                                    >Headline 5</v-list-item-title
                                >
                                <v-list-item-subtitle
                                    >Greyhound divisely hello coldly
                                    fonwderfully</v-list-item-subtitle
                                >
                            </v-list-item-content>

                            <v-list-item-avatar
                                tile
                                size="80"
                                color="grey"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn text>Button</v-btn>
                            <v-btn text>Button</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card>
                        <v-container>
                            <v-row justify="space-between">
                                <v-col cols="auto">
                                    <v-img
                                        height="200"
                                        width="200"
                                        src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                                    ></v-img>
                                </v-col>

                                <v-col cols="auto" class="text-center pl-0">
                                    <v-row
                                        class="flex-column ma-0 fill-height"
                                        justify="center"
                                    >
                                        <v-col class="px-0">
                                            <v-btn icon>
                                                <v-icon>mdi-heart</v-icon>
                                            </v-btn>
                                        </v-col>

                                        <v-col class="px-0">
                                            <v-btn icon>
                                                <v-icon>mdi-bookmark</v-icon>
                                            </v-btn>
                                        </v-col>

                                        <v-col class="px-0">
                                            <v-btn icon>
                                                <v-icon
                                                    >mdi-share-variant</v-icon
                                                >
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto">
                        <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                            <v-card-title
                                >Top 10 Australian beaches</v-card-title
                            >
                        </v-img>

                        <v-card-subtitle class="pb-0"
                            >Number 10</v-card-subtitle
                        >

                        <v-card-text class="text--primary">
                            <div>Whitehaven Beach</div>

                            <div>Whitsunday Island, Whitsunday Islands</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="orange" text>
                                Share
                            </v-btn>

                            <v-btn color="orange" text>
                                Explore
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto" color="#26c6da" dark>
                        <v-card-title>
                            <v-icon large left>
                                mdi-twitter
                            </v-icon>
                            <span class="title font-weight-light">Twitter</span>
                        </v-card-title>

                        <v-card-text class="headline font-weight-bold">
                            "Turns out semicolon-less style is easier and safer
                            in TS because most gotcha edge cases are type
                            invalid as well."
                        </v-card-text>

                        <v-card-actions>
                            <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-img
                                        class="elevation-6"
                                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                    ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title
                                        >Evan You</v-list-item-title
                                    >
                                </v-list-item-content>

                                <v-row align="center" justify="end">
                                    <v-icon class="mr-1">mdi-heart</v-icon>
                                    <span class="subheading mr-2">256</span>
                                    <span class="mr-1">·</span>
                                    <v-icon class="mr-1"
                                        >mdi-share-variant</v-icon
                                    >
                                    <span class="subheading">45</span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-card class="mx-auto" max-width="400">
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline"
                            >San Francisco</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>

                <v-card-text>
                    <v-row align="center">
                        <v-col class="display-3" cols="6">
                            23&deg;C
                        </v-col>
                        <v-col cols="6">
                            <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                                alt="Sunny image"
                                width="92"
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-send</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-cloud-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>48%</v-list-item-subtitle>
                </v-list-item>

                <v-slider
                    v-model="time"
                    :max="6"
                    :tick-labels="labels"
                    class="mx-4"
                    ticks
                ></v-slider>

                <v-list class="transparent">
                    <v-list-item v-for="item in forecast" :key="item.day">
                        <v-list-item-title>{{ item.day }}</v-list-item-title>

                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                            {{ item.temp }}
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn text>Full Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>徽章</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">> </v-col>
                <v-col cols="6" sm="12" md="6">> </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
            time: 0,
            forecast: [
                {
                    day: 'Tuesday',
                    icon: 'mdi-white-balance-sunny',
                    temp: '24\xB0/12\xB0'
                },
                {
                    day: 'Wednesday',
                    icon: 'mdi-white-balance-sunny',
                    temp: '22\xB0/14\xB0'
                },
                { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' }
            ],
            dialog: false,
            bars: [
                { class: '' },
                { class: '', dark: true },
                { class: 'primary', dark: true },
                { class: 'elevation-0' }
            ],
            sheet: false,
            activeBtn: 1
        };
    }
};
</script>
<style lang="scss" scoped>
.widget_page {
    .page_title {
        font-size: 25px;
        text-align: center;
        margin-bottom: 48px;
        .min_title {
            font-size: 13px;
        }
    }
}
</style>