<template>
    <div class="ma-4" style="text-align: center">
        <div class="text-h4">Material Design Component Framework</div>
        <div class="mt-2">
            Please checkout the full
            <a href="https://next.vuetifyjs.com/en/" target="_black">documentation</a>
        </div>
    </div>
    <v-card title="Application" class="elevation-0 my-4">
        <v-layout>
            <v-navigation-drawer permanent></v-navigation-drawer>
            <v-app-bar>
                <v-spacer></v-spacer>
                <v-btn
                    :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                    @click="onTheme"
                    >Toggle Theme</v-btn
                >
            </v-app-bar>
            <v-main>
                <v-container>Content area</v-container>
            </v-main>
        </v-layout>
    </v-card>
    <v-card title="Alerts" class="elevation-0 my-4">
        <v-row align="center" no-gutters class="pa-4">
            <v-col cols="12" sm="6" class="pr-0 pr-sm-2">
                <v-alert type="success">I'm a success alert.</v-alert>

                <br />
                <v-alert type="info">I'm an info alert.</v-alert>

                <br />
                <v-alert type="warning">I'm a warning alert.</v-alert>

                <br />
                <v-alert type="error">I'm an error alert.</v-alert>
            </v-col>
            <v-col cols="12" sm="6" class="pl-0 pl-sm-2">
                <v-alert density="compact" type="info">
                    I'm a compact alert with a <strong>type</strong> of info
                </v-alert>

                <br />

                <v-alert density="comfortable" type="success" variant="tonal">
                    I'm a comfortable alert with the <strong>text</strong> prop and a
                    <strong>type</strong> of success
                </v-alert>

                <br />

                <v-alert border="start" density="default" type="warning">
                    I'm a default alert with the <strong>border</strong> prop and a
                    <strong>type</strong> of warning
                </v-alert>

                <br />

                <!-- Density is "default" by default -->
                <v-alert prominent type="error" variant="outlined">
                    I'm a default alert with the <strong>prominent</strong> prop and a
                    <strong>type</strong> of error
                </v-alert>
            </v-col>
        </v-row>
    </v-card>
    <v-card title="Badges" class="elevation-0 my-4">
        <v-toolbar color="blue-grey-darken-3">
            <v-spacer></v-spacer>

            <v-btn class="text-none" stacked>
                <v-badge dot color="success">
                    <v-icon>mdi-home-outline</v-icon>
                </v-badge>
            </v-btn>

            <v-btn class="text-none" stacked>
                <v-icon>mdi-account-multiple-outline</v-icon>
            </v-btn>

            <v-btn class="text-none" stacked>
                <v-badge content="9+" color="error">
                    <v-icon>mdi-store-outline</v-icon>
                </v-badge>
            </v-btn>

            <v-btn class="text-none" stacked>
                <v-badge content="2" color="error">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
            </v-btn>

            <v-btn class="text-none" stacked>
                <v-icon>mdi-menu</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
        </v-toolbar>
    </v-card>
    <v-card title="Buttons" class="elevation-0">
        <div class="pa-4">
            <v-row>
                <v-col cols="6" sm="3">
                    <v-btn icon="mdi-heart" color="primary"></v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon="mdi-star" color="secondary"></v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon="mdi-cached" color="info"></v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon="mdi-thumb-up" color="success"></v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon color="primary">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon color="secondary">
                        <v-icon>mdi-star</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon color="info">
                        <v-icon>mdi-cached</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn icon color="success">
                        <v-icon>mdi-thumb-up</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn color="primary"> Normal </v-btn>
                </v-col>
                <v-col cols="6" sm="3"
                    ><v-btn rounded="lg" color="primary"> Rounded </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn :rounded="0" color="primary"> Tile Button </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn rounded="pill" color="primary"> Pill Button </v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn>elevates</v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn variant="flat">flat</v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn variant="tonal">tonal</v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn variant="outlined">outlined</v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn variant="text">text</v-btn>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-btn variant="plain">plain</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-card>

    <v-card title="Cards" class="elevation-0 my-4">
        <v-row align="center" no-gutters class="pa-4">
            <v-col cols="12" sm="4" class="pr-0 pr-sm-2">
                <v-card class="mx-auto" variant="outlined">
                    <v-card-item>
                        <div>
                            <div class="text-overline mb-1">OVERLINE</div>
                            <div class="text-h6 mb-1">Headline</div>
                            <div class="text-caption">
                                Greyhound divisely hello coldly fonwderfully
                            </div>
                        </div>
                    </v-card-item>

                    <v-card-actions>
                        <v-btn variant="outlined"> Button </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="pl-0 pl-sm-2">
                <v-card class="mx-auto">
                    <v-card-text>
                        <div>Word of the Day</div>
                        <p class="text-h4 text--primary">el·ee·mos·y·nar·y</p>
                        <p>adjective</p>
                        <div class="text--primary">
                            relating to or dependent on charity; charitable.<br />
                            "an eleemosynary educational institution."
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn variant="text" color="teal-accent-4" @click="cards.reveal = true">
                            Learn More
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <v-card
                            v-if="cards.reveal"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%"
                        >
                            <v-card-text class="pb-0">
                                <p class="text-h4 text--primary">Origin</p>
                                <p>
                                    late 16th century (as a noun denoting a place where alms were
                                    distributed): from medieval Latin eleemosynarius, from late
                                    Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
                                </p>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                                <v-btn
                                    variant="text"
                                    color="teal-accent-4"
                                    @click="cards.reveal = false"
                                >
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="pr-0 pr-sm-2">
                <v-card
                    class="mx-auto"
                    color="#26c6da"
                    theme="dark"
                    max-width="400"
                    prepend-icon="mdi-twitter"
                    title="Twitter"
                >
                    <template v-slot:prepend>
                        <v-icon size="x-large"></v-icon>
                    </template>

                    <v-card-text class="text-h5 py-2">
                        "Turns out semicolon-less style is easier and safer in TS because most
                        gotcha edge cases are type invalid as well."
                    </v-card-text>

                    <v-card-actions>
                        <v-list-item class="w-100">
                            <template v-slot:prepend>
                                <v-avatar
                                    color="grey-darken-3"
                                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                ></v-avatar>
                            </template>

                            <v-list-item-title>Evan You</v-list-item-title>

                            <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>

                            <template v-slot:append>
                                <div class="justify-self-end">
                                    <v-icon class="mr-1" icon="mdi-heart"></v-icon>
                                    <span class="subheading mr-2">256</span>
                                    <span class="mr-1">·</span>
                                    <v-icon class="mr-1" icon="mdi-share-variant"></v-icon>
                                    <span class="subheading">45</span>
                                </div>
                            </template>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
    <v-card title="Alerts" class="elevation-0 my-4">
        <v-row align="center" no-gutters class="pa-4">
            <v-col cols="6" class="pr-2"> </v-col>
            <v-col cols="6" class="pl-2"> </v-col>
        </v-row>
    </v-card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
const cards = reactive({
    reveal: false,
});

const theme = ref('light');

function onTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
<style scoped lang="scss"></style>
