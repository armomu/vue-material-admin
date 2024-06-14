import { ref, onMounted } from 'vue';

export const useRuler = () => {
    const leftRulerEle = ref<HTMLCanvasElement>();
    const topRulerEle = ref<HTMLCanvasElement>();

    onMounted(() => {
        const canvas = topRulerEle.value as HTMLCanvasElement;

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const startX = 50; // 尺子起始点的x坐标
        const startY = canvas.height / 2; // 尺子起始点的y坐标
        const length = 600; // 尺子的长度

        // 绘制尺子线条
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + length, startY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制刻度线和刻度值
        const tickLength = 10; // 刻度线的长度
        const tickSpacing = 10; // 刻度线之间的间距
        const tickValueSpacing = 50; // 刻度值之间的间距
        const tickValueStart = 0; // 刻度值的起始值

        for (let i = 0; i <= length; i += tickSpacing) {
            ctx.beginPath();
            ctx.moveTo(startX + i, startY);
            ctx.lineTo(startX + i, startY - tickLength);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();

            if (i % tickValueSpacing === 0) {
                const tickValue = tickValueStart + i / tickValueSpacing;
                ctx.fillStyle = 'black';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(tickValue.toString(), startX + i, startY + 20);
            }
        }
    });

    return {
        leftRulerEle,
        topRulerEle,
    };
};
