<template>
    <div class="widget_page ma-5">
        <div class="page_title">
            Material Design Component Framework
            <div class="min_title">
                Please checkout the full
                <a
                    href="https://vuetifyjs.com/en/"
                    target="_black"
                >documentation</a>
            </div>
        </div>
        <!-- <v-card class="mt-5">
            <v-card-title>提示框</v-card-title>
            <v-card-text>
                <test-view v-model="status">
                    <template v-slot:view="{on}">
                        <v-btn color="red lighten-2" dark v-on="on">test</v-btn>
                        <v-btn color="red lighten-2" dark @click="test2(on)">test2</v-btn>
                    </template>
                </test-view>
            </v-card-text>
        </v-card>-->
        <v-card class="mt-5">
            <v-card-title>Alert</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-alert type="success">I'm a success alert.</v-alert>
                    <v-alert type="info">I'm an info alert.</v-alert>
                    <v-alert type="warning">I'm a warning alert.</v-alert>
                    <v-alert type="error">I'm an error alert.</v-alert>
                    <v-dialog v-model="alertDialog" width="350">
                        <template v-slot:activator="{ on }">
                            <v-btn color="red lighten-2" dark @click="test(on)">Dialog test</v-btn>
                            <v-btn color="red lighten-2" dark v-on="on">Dialog alert</v-btn>
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
                    >I'm a success alert.</v-alert>
                    <v-alert
                        border="top"
                        colored-border
                        type="info"
                        elevation="2"
                    >I'm a success alert.</v-alert>
                    <v-alert
                        border="bottom"
                        colored-border
                        type="warning"
                        elevation="2"
                    >I'm a success alert.</v-alert>
                    <v-alert
                        border="right"
                        colored-border
                        type="error"
                        elevation="2"
                    >I'm a success alert.</v-alert>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>Badge</v-card-title>
            <v-row align="center" justify="center" class="justify-center pl-5 pr-5 pb-5">
                <v-badge bordered color="error" icon="mdi-lock" overlap>
                    <v-btn class="white--text" color="error" depressed>Lock Account</v-btn>
                </v-badge>
                <div class="mx-3"></div>

                <v-badge content="9" value="9" :offset-x="30" :offset-y="20" overlap bordered>
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
                        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                    </v-avatar>
                </v-badge>

                <div class="mx-3"></div>

                <v-badge avatar bordered overlap>
                    <template v-slot:badge>
                        <v-avatar>
                            <v-img src="https://cdn.vuetifyjs.com/images/logos/v.png"></v-img>
                        </v-avatar>
                    </template>

                    <v-avatar size="40">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-avatar>
                </v-badge>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>Toolbar</v-card-title>
            <v-row class="pl-5 pr-5 pb-5">
                <v-col v-for="(bar, i) in bars" :key="i" cols="12" sm="12" md="6" class="my-4">
                    <v-card color="grey lighten-4" height="200px">
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
            <v-card-title>Bottom Navigation</v-card-title>
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
            <v-card-title>Bottom Sheet</v-card-title>
            <div class="text-center pl-5 pr-5 pb-5">
                <v-bottom-sheet v-model="sheet" persistent>
                    <template v-slot:activator="{ on }">
                        <v-btn color="green" dark v-on="on">Open Persistent</v-btn>
                    </template>
                    <v-sheet class="text-center" height="200px">
                        <v-btn class="mt-6" flat color="error" @click="sheet = !sheet">close</v-btn>
                        <div class="py-3">This is a bottom sheet using the persistent prop</div>
                    </v-sheet>
                </v-bottom-sheet>
            </div>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>Button</v-card-title>
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
            <v-card-title>Card</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">OVERLINE</div>
                                <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                                <v-list-item-subtitle>
                                    Greyhound divisely hello coldly
                                    fonwderfully
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn text>Button</v-btn>
                            <v-btn text>Button</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card>
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title class="headline">San Francisco</v-list-item-title>
                                <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-text>
                            <v-row align="center">
                                <v-col class="display-3" cols="6">23&deg;C</v-col>
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

                        <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>

                        <v-list class="transparent">
                            <v-list-item v-for="item in forecast" :key="item.day">
                                <v-list-item-title>{{ item.day }}</v-list-item-title>

                                <v-list-item-icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-subtitle class="text-right">{{ item.temp }}</v-list-item-subtitle>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn text>Full Report</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto">
                        <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                            <v-card-title>Top 10 Australian beaches</v-card-title>
                        </v-img>

                        <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>Whitehaven Beach</div>

                            <div>Whitsunday Island, Whitsunday Islands</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="orange" text>Share</v-btn>

                            <v-btn color="orange" text>Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto" color="#26c6da" dark>
                        <v-card-title>
                            <v-icon large left>mdi-twitter</v-icon>
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
                                    <v-list-item-title>Evan You</v-list-item-title>
                                </v-list-item-content>

                                <v-row align="center" justify="end">
                                    <v-icon class="mr-1">mdi-heart</v-icon>
                                    <span class="subheading mr-2">256</span>
                                    <span class="mr-1">·</span>
                                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                                    <span class="subheading">45</span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>Dialog</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline">Use Google's location service?</v-card-title>
                            <v-card-text>
                                Let Google help apps determine location. This
                                means sending anonymous location data to Google,
                                even when no apps are running.
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                                <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-dialog v-model="dialog1" width="500">
                        <template v-slot:activator="{ on }">
                            <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
                        </template>

                        <v-card>
                            <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                            >Privacy Policy</v-card-title>

                            <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="dialog1 = false">I accept</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>List</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="3" sm="12" md="3">
                    <v-card>
                        <v-list shaped>
                            <v-subheader>REPORTS</v-subheader>
                            <v-list-item-group v-model="item" color="primary">
                                <v-list-item v-for="(item, i) in items" :key="i">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card>
                        <v-list flat>
                            <v-subheader>REPORTS</v-subheader>
                            <v-list-item-group v-model="item" color="primary">
                                <v-list-item v-for="(item, i) in items" :key="i">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card tile>
                        <v-list rounded>
                            <v-subheader>REPORTS</v-subheader>
                            <v-list-item-group v-model="item" color="primary">
                                <v-list-item v-for="(item, i) in items" :key="i">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3">
                    <v-card class="mx-auto">
                        <v-list>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-home</v-icon>
                                </v-list-item-icon>

                                <v-list-item-title>Home</v-list-item-title>
                            </v-list-item>

                            <v-list-group prepend-icon="mdi-account-cog-outline" value="true">
                                <template v-slot:activator>
                                    <v-list-item-title>Users</v-list-item-title>
                                </template>
                                <v-list-group no-action sub-group value="true">
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>Admin</v-list-item-title>
                                        </v-list-item-content>
                                    </template>

                                    <v-list-item v-for="(admin, i) in admins" :key="i" link>
                                        <v-list-item-title v-text="admin[0]"></v-list-item-title>
                                    </v-list-item>
                                </v-list-group>
                                <v-list-group sub-group no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>Actions</v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    <v-list-item
                                        v-for="(crud, i) in cruds"
                                        :key="i"
                                        @click="() => {}"
                                    >
                                        <v-list-item-title v-text="crud[0]"></v-list-item-title>
                                    </v-list-item>
                                </v-list-group>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-card>
                        <v-toolbar color="cyan" dark>
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>

                            <v-toolbar-title>Inbox</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-list three-line>
                            <template v-for="(item, index) in items2">
                                <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                                    v-text="item.header"
                                ></v-subheader>

                                <v-divider
                                    v-else-if="item.divider"
                                    :key="index"
                                    :inset="item.inset"
                                ></v-divider>

                                <v-list-item v-else :key="item.title" @click="() => {}">
                                    <v-list-item-avatar>
                                        <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.title"></v-list-item-title>
                                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-card>
                        <v-toolbar color="pink" dark>
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>

                            <v-toolbar-title>Inbox</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-list two-line>
                            <v-list-item-group
                                v-model="selected"
                                multiple
                                active-class="pink--text"
                            >
                                <template v-for="(item, index) in items3">
                                    <v-list-item :key="item.title">
                                        <template v-slot:default="{ active }">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.title"></v-list-item-title>
                                                <v-list-item-subtitle
                                                    class="text--primary"
                                                    v-text="item.headline"
                                                ></v-list-item-subtitle>
                                                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                                                <v-icon
                                                    v-if="!active"
                                                    color="grey lighten-1"
                                                >mdi-star</v-icon>

                                                <v-icon v-else color="yellow">mdi-star</v-icon>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>

                                    <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
                                </template>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>Menu && Navigation Drawer</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">Dropdown</v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                @click="i => i"
                            >
                                <v-list-item-title>
                                    {{
                                    item.text
                                    }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-card class="overflow-hidden" height="400">
                        <v-system-bar color="deep-purple darken-3"></v-system-bar>

                        <v-app-bar color="deep-purple accent-4" dark prominent>
                            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                            <v-toolbar-title>My files</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-filter</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-app-bar>

                        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
                            <v-list nav dense>
                                <v-list-item-group
                                    v-model="group"
                                    active-class="deep-purple--text text--accent-4"
                                >
                                    <v-list-item>
                                        <v-list-item-title>Foo</v-list-item-title>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-title>Bar</v-list-item-title>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-title>Fizz</v-list-item-title>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-title>Buzz</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-navigation-drawer>

                        <v-card-text>
                            The navigation drawer will appear from the bottom on
                            smaller size screens.
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>Tabs</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <v-card>
                        <v-toolbar color="cyan" dark flat>
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>

                            <v-toolbar-title>Your Dashboard</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>

                            <template v-slot:extension>
                                <v-tabs v-model="tab" align-with-title>
                                    <v-tabs-slider color="yellow"></v-tabs-slider>

                                    <v-tab v-for="item in items" :key="item.text">{{ item.text }}</v-tab>
                                </v-tabs>
                            </template>
                        </v-toolbar>

                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="item in items" :key="item.text">
                                <v-card flat>
                                    <v-card-text v-text="text"></v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-card>
                        <v-tabs v-model="tab2" background-color="primary" dark>
                            <v-tab v-for="item in items4" :key="item.tab">{{ item.tab }}</v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="item in items4" :key="item.tab">
                                <v-card flat>
                                    <v-card-text>
                                        {{
                                        item.content
                                        }}
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <!-- <v-card class="mt-5">
            <v-card-title>徽章</v-card-title>
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">></v-col>
                <v-col cols="6" sm="12" md="6">></v-col>
            </v-row>
        </v-card>-->
    </div>
</template>
<script>
// import TestView from '@/views/components/solt.vue';
export default {
    // components: {TestView},
    data() {
        return {
            status: false,
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
            alertDialog: false,
            dialog: false,
            dialog1: false,
            bars: [
                { class: '' },
                { class: '', dark: true },
                { class: 'primary', dark: true },
                { class: 'elevation-0' }
            ],
            sheet: false,
            activeBtn: 1,
            item: 1,
            items: [
                { text: 'Real-Time', icon: 'mdi-clock' },
                { text: 'Audience', icon: 'mdi-account' },
                { text: 'Conversions', icon: 'mdi-flag' }
            ],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings']
            ],
            cruds: [
                ['Create', 'add'],
                ['Read', 'insert_drive_file'],
                ['Update', 'update'],
                ['Delete', 'delete']
            ],
            items2: [
                { header: 'Today' },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle:
                        '<span class=\'text--primary\'>Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title:
                        'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle:
                        '<span class=\'text--primary\'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.'
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle:
                        '<span class=\'text--primary\'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle:
                        '<span class=\'text--primary\'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle:
                        '<span class=\'text--primary\'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
                }
            ],
            selected: [2],
            items3: [
                {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    title: 'Ali Connors',
                    subtitle:
                        'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
                },
                {
                    action: '2 hr',
                    headline: 'Summer BBQ',
                    title: 'me, Scrott, Jennifer',
                    subtitle:
                        'Wish I could come, but I\'m out of town this weekend.'
                },
                {
                    action: '6 hr',
                    headline: 'Oui oui',
                    title: 'Sandra Adams',
                    subtitle:
                        'Do you have Paris recommendations? Have you ever been?'
                },
                {
                    action: '12 hr',
                    headline: 'Birthday gift',
                    title: 'Trevor Hansen',
                    subtitle:
                        'Have any ideas about what we should get Heidi for her birthday?'
                },
                {
                    action: '18hr',
                    headline: 'Recipe to try',
                    title: 'Britta Holt',
                    subtitle:
                        'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
                }
            ],
            drawer: false,
            group: null,
            tab: null,
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            tab2: null,
            items4: [
                { tab: 'One', content: 'Tab 1 Content' },
                { tab: 'Two', content: 'Tab 2 Content' },
                { tab: 'Three', content: 'Tab 3 Content' },
                { tab: 'Four', content: 'Tab 4 Content' },
                { tab: 'Five', content: 'Tab 5 Content' },
                { tab: 'Six', content: 'Tab 6 Content' },
                { tab: 'Seven', content: 'Tab 7 Content' },
                { tab: 'Eight', content: 'Tab 8 Content' },
                { tab: 'Nine', content: 'Tab 9 Content' },
                { tab: 'Ten', content: 'Tab 10 Content' }
            ]
        };
    },
    watch: {
        group() {
            this.drawer = false;
        }
    },
    methods: {
        test(on) {
            console.log(on);
        },
        test2(on) {
            console.log(on);
        },
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