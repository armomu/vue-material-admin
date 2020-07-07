<template>
    <div>
        状态{{ status }}
        <slot name="view" :on="on"></slot>
    </div>
</template>
<script>
export default {
    inheritAttrs: false, 
    name: 'test-view',
    props: {
        val: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            status: !!this.value
        };
    },
    computed:{
        on(){
            return Object.assign(
                {},
                {
                    click: () => {
                        this.status = !this.status;
                        this.$emit('input', this.status);
                    }
                }
            );
        }
    },
    watch: {
        value: function(val) {
            console.log(val);
        }
    },
    mounted() {
        console.log(this.on);
    }
};
</script>
<style lang="scss" scoped>
</style>