<template>
    <div v-if="store.visible" class="loading_full">
        <div class="loading_content">
            <div class="la-ball-climbing-dot" id="_loading_">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="flex">
                <div class="pct_wrap">
                    <div
                        class="pct"
                        :style="{
                            width: `${store.pct}%`,
                        }"
                    ></div>
                </div>
                <div class="v">{{ store.pct }}%</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLoading } from './loading';
const store = useLoading();
</script>
<style lang="scss">
.loading_full {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    z-index: 2;
    .flex {
        width: 200%;
        margin-left: -50%;
        margin-top: 30px;
        display: flex;
        align-items: center;
        .v {
            width: 36px;
            margin-left: 4px;
        }
        .pct {
            width: 0;
            background: #7f85f9;
            height: 14px;
            transition: all 0.3s;
        }
    }
    .pct_wrap {
        height: 16px;
        border: 2px solid #7f85f9;
        border-radius: 8px;
        flex: 1;
        overflow: hidden;
    }
}
.la-ball-climbing-dot {
    position: relative;
    width: 84px;
    height: 64px;
    transition: 0.3s;
}
.la-ball-climbing-dot.hide {
    display: none;
}
.la-ball-climbing-dot > div {
    position: relative;
    box-sizing: border-box;
}

.la-ball-climbing-dot > div {
    display: inline-block;
    float: none;
    background-color: #7f85f9;
    border: 0 solid #7f85f9;
}

.la-ball-climbing-dot > div:nth-child(1) {
    position: absolute;
    bottom: 32%;
    left: 8%;
    width: 44px;
    height: 44px;
    border-radius: 100%;
    transform-origin: center bottom;
    animation: jumpA 0.6s ease-in-out infinite;
}

.la-ball-climbing-dot > div:not(:nth-child(1)) {
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 4px;
    border-radius: 0;
    transform: translate(60%, 0);
    animation: steps 1.8s linear infinite;
}

.la-ball-climbing-dot > div:not(:nth-child(1)):nth-child(2) {
    animation-delay: 0ms;
}

.la-ball-climbing-dot > div:not(:nth-child(1)):nth-child(3) {
    animation-delay: -600ms;
}

.la-ball-climbing-dot > div:not(:nth-child(1)):nth-child(4) {
    animation-delay: -1200ms;
}

@keyframes steps {
    0% {
        top: 0;
        right: 0;
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        top: 100%;
        right: 100%;
        opacity: 0;
    }
}

@keyframes jumpA {
    0% {
        transform: scale(1, 0.7);
    }
    20% {
        transform: scale(0.7, 1.2);
    }
    40% {
        transform: scale(1, 1);
    }
    50% {
        bottom: 125%;
    }
    46% {
        transform: scale(1, 1);
    }
    80% {
        transform: scale(0.7, 1.2);
    }
    90% {
        transform: scale(0.7, 1.2);
    }
    100% {
        transform: scale(1, 0.7);
    }
}
</style>
