<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { BarChart, LineChart, ScatterChart } from 'echarts/charts'
import {
  GraphicComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import type { EChartsCoreOption, EChartsType } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

echarts.use([
  BarChart,
  LineChart,
  ScatterChart,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
])

const props = withDefaults(
  defineProps<{
    option: EChartsCoreOption
    height?: string
    loading?: boolean
  }>(),
  {
    height: '360px',
    loading: false,
  },
)

const chartEl = ref<HTMLDivElement>()
const isDark = useDark()
let chart: EChartsType | undefined
let resizeObserver: ResizeObserver | undefined

const render = () => {
  if (!chart) return
  chart.setOption(props.option, true)
}

const initChart = async () => {
  await nextTick()
  if (!chartEl.value) return
  chart = echarts.init(chartEl.value, isDark.value ? 'dark' : undefined)
  render()
  resizeObserver = new ResizeObserver(() => chart?.resize())
  resizeObserver.observe(chartEl.value)
}

watch(
  () => props.option,
  () => render(),
  { deep: true },
)

watch(isDark, async () => {
  chart?.dispose()
  chart = undefined
  resizeObserver?.disconnect()
  await initChart()
})

onMounted(initChart)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>

<template>
  <div v-loading="{loading ?: false}" class="chart-panel" :style="{ height }">
    <div ref="chartEl" class="chart-canvas" />
  </div>
</template>

<style scoped>
.chart-panel {
  width: 100%;
  min-height: 260px;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}
</style>
