<template>
    <div class="ma-4" style="text-align: center">
        <div class="text-h4">Material Design Component Framework</div>
        <div class="mt-2">
            Please checkout the full
            <a href="https://next.vuetifyjs.com/en/" target="_black">documentation</a>
        </div>
    </div>
    <v-card title="Alerts" class="my-4">
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
    <v-card title="Badges" class="my-4">
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
    <v-card title="Buttons">
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
    <v-card title="Alerts" class="my-4">
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
</script>
<style scoped lang="scss"></style>
