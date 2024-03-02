<template>
    <div class="my-calendar">
        <v-card class="mr-4">
            <v-date-picker color="primary" show-adjacent-months></v-date-picker>
            <v-divider class="mx-4"></v-divider>
            <v-list v-model:opened="open">
                <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

                <v-list-group value="Users">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-account-circle"
                            title="Users"
                        ></v-list-item>
                    </template>

                    <v-list-group value="Admin">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" title="Admin"></v-list-item>
                        </template>

                        <v-list-item
                            v-for="([title, icon], i) in admins"
                            :key="i"
                            :title="title"
                            :prepend-icon="icon"
                            :value="title"
                        ></v-list-item>
                    </v-list-group>

                    <v-list-group value="Actions">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" title="Actions"></v-list-item>
                        </template>

                        <v-list-item
                            v-for="([title, icon], i) in cruds"
                            :key="i"
                            :value="title"
                            :title="title"
                            :prepend-icon="icon"
                        ></v-list-item>
                    </v-list-group>
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
                        <span class="text-h4">{{ title }}</span>
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

const today = ref([new Date()]);

const open = ref(['Users']);

const admins = [
    ['Management', 'mdi-account-multiple-outline'],
    ['Settings', 'mdi-cog-outline'],
];
const cruds = [
    ['Create', 'mdi-plus-outline'],
    ['Read', 'mdi-file-outline'],
    ['Update', 'mdi-update'],
    ['Delete', 'mdi-delete'],
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
