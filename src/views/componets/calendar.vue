<template>
    <div class="my-calendar">
        <v-card class="mr-4">
            <v-date-picker color="primary" show-adjacent-months></v-date-picker>
            <v-divider class="mx-4"></v-divider>
            <v-list v-model:opened="open" class="mx-4 my-2" density="comfortable">
                <v-list-group value="myCalendars">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="My Calendars"></v-list-item>
                    </template>

                    <v-list-item
                        v-for="([title, color, activator], i) in myCalendars"
                        :key="i"
                        :title="title + ''"
                        :value="title"
                        style="padding-inline-start: 16px !important"
                    >
                        <template v-slot:prepend>
                            <v-list-item-action start>
                                <v-checkbox-btn
                                    :color="color + ''"
                                    :model-value="activator"
                                ></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                </v-list-group>
                <v-list-group value="others">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="Colors"></v-list-item>
                    </template>

                    <v-list-item
                        v-for="([title, color, activator], i) in others"
                        :key="i"
                        :title="title + ''"
                        :value="title"
                        style="padding-inline-start: 16px !important"
                    >
                        <template v-slot:prepend>
                            <v-list-item-action start>
                                <v-checkbox-btn
                                    :color="color + ''"
                                    :model-value="activator"
                                ></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-card>
        <v-card style="flex: 1" class="pa-4">
            <VCalendar
                ref="calendar"
                v-model="today"
                :events="events"
                color="primary"
                :view-mode="type"
            >
                <template #header="{ title }">
                    <v-sheet :height="77" class="d-flex jsb">
                        <v-btn variant="tonal" class="mr-4">today</v-btn>
                        <span class="text-h4">{{ title }}</span>
                        <v-btn icon="mdi-chevron-left" variant="text" class="ml-4"></v-btn>
                        <v-btn icon="mdi-chevron-right" variant="text"></v-btn>
                        <v-spacer></v-spacer>
                        <v-sheet :width="120" class="d-flex jsb">
                            <v-select
                                v-model="type"
                                :items="types"
                                density="compact"
                                dense
                                variant="outlined"
                                hide-details
                            ></v-select>
                        </v-sheet>
                        <v-btn-toggle
                            variant="outlined"
                            color="primary"
                            divided
                            density="comfortable"
                            class="ml-4"
                            model-value="0"
                        >
                            <v-btn value="0" icon="mdi-calendar-month" class="px-7"></v-btn>
                            <v-btn
                                value="1"
                                icon="mdi-checkbox-marked-circle-outline"
                                class="px-7"
                            ></v-btn>
                        </v-btn-toggle>
                    </v-sheet>
                </template>
            </VCalendar>
        </v-card>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { VCalendar } from 'vuetify/labs/VCalendar';

const calendar = ref();
const events = [
    {
        title: 'Weekly Meeting',
        start: new Date('2024-02-16 09:00'),
        end: new Date('2024-02-16 10:00'),
    },
    {
        title: `Thomas' Birthday`,
        start: new Date('2024-02-10'),
        end: new Date('2024-02-10'),
        allDay: true,
    },
    {
        title: 'Mash Potatoes',
        start: new Date('2024-02-28 12:30'),
        end: new Date('2024-02-28 15:30'),
    },
];
const type = ref<'month' | 'week' | 'day'>('month');
const types = ['month', 'week', 'day'];

const today = ref([new Date('2024-02-16')]);

const open = ref(['myCalendars', 'others']);

const myCalendars = [
    ['咩咩咩啊', 'pink', true],
    ['Birthday', 'teal', true],
    ['Tasks', 'cyan', true],
];
const others = [
    ['red', 'red', true],
    ['green', 'green', true],
    ['blue', 'blue', true],
    ['yellow', 'yellow', true],
    ['purple', 'purple', true],
    ['orange', 'orange', true],
    ['grey', 'grey', true],
];

onMounted(() => {
    // console.log(calendar.value.onNext());
});
</script>
<style lang="scss">
.my-calendar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: start;
}
</style>
