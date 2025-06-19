// 手动导入的

export {};
declare module 'vue' {
    export interface GlobalComponents {
        VBtn: (typeof import('vuetify/components/VBtn'))['VBtn'];
        VTable: (typeof import('vuetify/components/VTable'))['VTable'];
        VSnackbar: (typeof import('vuetify/components/VSnackbar'))['VSnackbar'];
        VApp: (typeof import('vuetify/components/VApp'))['VApp'];
        VCard: (typeof import('vuetify/components/VCard'))['VCard'];
        VCard: (typeof import('vuetify/components/VCard'))['VCardActions'];
        VCardItem: (typeof import('vuetify/components/VCard'))['VCardItem'];
        VCardSubtitle: (typeof import('vuetify/components/VCard'))['VCardSubtitle'];
        VCardText: (typeof import('vuetify/components/VCard'))['VCardText'];
        VCardTitle: (typeof import('vuetify/components/VCard'))['VCardTitle'];
        VTextField: (typeof import('vuetify/components/VTextField'))['VTextField'];
        VDivider: (typeof import('vuetify/components/VDivider'))['VDivider'];
        VDialog: (typeof import('vuetify/components/VDialog'))['VDialog'];
        VForm: (typeof import('vuetify/components/VForm'))['VForm'];
        VFileInput: (typeof import('vuetify/components/VFileInput'))['VFileInput'];
        VSlider: (typeof import('vuetify/components/VSlider'))['VSlider'];
        VTextarea: (typeof import('vuetify/components/VTextarea'))['VTextarea'];
        VToolbar: (typeof import('vuetify/components/VToolbar'))['VToolbar'];
        VSpacer: (typeof import('vuetify/components/VGrid'))['VSpacer'];
        VContainer: (typeof import('vuetify/components/VGrid'))['VContainer'];
        VRow: (typeof import('vuetify/components/VGrid'))['VRow'];
        VCol: (typeof import('vuetify/components/VGrid'))['VCol'];
    }
}
