<script setup lang="ts">
import * as d3 from 'd3'

interface Record {
  name?: string
  length?: number
  branchset?: Array<Record>
  link?: string
}

export interface Props {
  data?: Record
  domains?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => { return {} },
  domains: () => ['Bacteria', 'Archea', 'Eukaryotes']
})

const width = 420
const outerRadius = width / 2
const innerRadius = outerRadius - 170
const vBox = `-${outerRadius}, -${outerRadius}, ${width}, ${width}`

const cluster = d3
  .cluster()
  .size([360, innerRadius])
  .separation((_: any, __: any) => 1)

const color = d3
  .scaleOrdinal()
  .domain(props.domains)
  .range(d3.schemeAccent)

const legend = (svg: any) => {
  const g = svg
    .selectAll('g')
    .data(color.domain())
    .join('g')
    .attr(
      'transform',
      (_: any, i: number) => `translate(${-outerRadius},${-outerRadius + i * 20})`
    )

  g.append('rect').attr('width', 18).attr('height', 18).attr('fill', color)

  g.append('text')
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .text((d) => d)
}

var debug = ref("")

onMounted(() => {

  const root = d3
    .hierarchy(props.data, (d: { branchset: any; }) => d.branchset)
    .sum((d: { branchset: any; }) => (d.branchset ? 0 : 1))
    .sort(
      (a: { value: number; data: string | any[]; }, b: { value: number; data: string | any[]; }) =>
        a.value - b.value || d3.ascending(a.data.length, b.data.length)
    )

  cluster(root)
  setRadius(root, (root.data.length = 0), innerRadius / maxLength(root))
  setColor(root)

  const svg = d3.select('#dendrogram')

  svg.append('g').call(legend)

  const linkExtension = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .attr('stroke-opacity', 0.25)
    .selectAll('path')
    .data(root.links().filter((d: { target: { children: any; }; }) => !d.target.children))
    .join('path')
    .each(function (d: { target: { linkExtensionNode: any; }; }) {
      d.target.linkExtensionNode = this
    })
    .attr('d', linkExtensionConstant)

  const link = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .selectAll('path')
    .data(root.links())
    .join('path')
    .each(function (d: { target: { linkNode: any; }; }) {
      d.target.linkNode = this
    })
    .attr('d', linkConstant)
    .attr('stroke', (d: { target: { color: any; }; }) => d.target.color)

  svg
    .append('g')
    .selectAll('text')
    .data(root.leaves())
    .join('text')
    .attr('dy', '.31em')
    .attr(
      'transform',
      (d: { x: number; }) =>
        `rotate(${d.x - 90}) translate(${innerRadius + 4},0)${d.x < 180 ? '' : ' rotate(180)'
        }`
    )
    .attr('text-anchor', (d: { x: number; }) => (d.x < 180 ? 'start' : 'end'))
    .text((d: { data: { name: string; }; }) => d.data.name.replace(/_/g, ' '))
    .attr('href', (d: { data: { link: string; }; }) => d.data.link)
    .on('mouseover', mouseovered(true))
    .on('mouseout', mouseovered(false))
    .filter((d,i,n) => n[i].attributes['href'])
    .on('click', (d, i) => {
      debug.value = d.currentTarget.getAttribute('href')
      //navigateTo({ path: '/blog' })
    })


  function update(checked: boolean) {
    const t = d3.transition().duration(750)
    linkExtension
      .transition(t)
      .attr('d', checked ? linkExtensionVariable : linkExtensionConstant)
    link.transition(t).attr('d', checked ? linkVariable : linkConstant)
  }

  function mouseovered(active: boolean) {
    return function (_: any, d: { linkExtensionNode: any; linkNode: any; parent: any; }) {
      d3.select(this).classed('label--active', active)
      d3.select(d.linkExtensionNode)
        .classed('link-extension--active', active)
        .raise()
      do d3.select(d.linkNode).classed('link--active', active).raise()
      while ((d = d.parent))
    }
  }

  update(true)

})

function setColor(d: { data: { name: any; }; color: any; parent: { color: any; }; children: any[]; }) {
  const name = d.data.name
  d.color = color.domain().includes(name)
    ? color(name)
    : d.parent
      ? d.parent.color
      : null

  if (d.children) d.children.forEach(setColor)
}

function maxLength(d: { data: string | any[]; children: any; }) {
  return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0)
}

function setRadius(d: { radius: number; data: string | any[]; children: any[]; }, y0: number, k: number) {
  d.radius = (y0 += d.data.length) * k
  if (d.children) d.children.forEach((d: any) => setRadius(d, y0, k))
}

function linkVariable(d: { source: { x: number; radius: number; }; target: { x: number; radius: number; }; }) {
  return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius)
}

function linkConstant(d: { source: { x: number; y: number; }; target: { x: number; y: number; }; }) {
  return linkStep(d.source.x, d.source.y, d.target.x, d.target.y)
}

function linkExtensionVariable(d: { target: { x: number; radius: number; }; }) {
  return linkStep(d.target.x, d.target.radius, d.target.x, innerRadius)
}

function linkExtensionConstant(d: { target: { x: number; y: number; }; }) {
  return linkStep(d.target.x, d.target.y, d.target.x, innerRadius)
}

function linkStep(startAngle: number, startRadius: number, endAngle: number, endRadius: number) {
  const c0 = Math.cos((startAngle = ((startAngle - 90) / 180) * Math.PI))
  const s0 = Math.sin(startAngle)
  const c1 = Math.cos((endAngle = ((endAngle - 90) / 180) * Math.PI))
  const s1 = Math.sin(endAngle)
  return (
    'M' +
    startRadius * c0 +
    ',' +
    startRadius * s0 +
    (endAngle === startAngle
      ? ''
      : 'A' +
      startRadius +
      ',' +
      startRadius +
      ' 0 0 ' +
      (endAngle > startAngle ? 1 : 0) +
      ' ' +
      startRadius * c1 +
      ',' +
      startRadius * s1) +
    'L' +
    endRadius * c1 +
    ',' +
    endRadius * s1
  )
}

// https://github.com/jasondavies/newick.js
function parseNewick(a: string) {
  const e = []
  var r: Record = {}
  const s = a.split(/\s*(;|\(|\)|,|:)\s*/)

  for (let t = 0; t < s.length; t++) {
    const n = s[t]
    switch (n) {
      case '(': {
        const c = { link: 'http' }
        r.branchset = [c]
        e.push(r)
        r = c
        break
      }
      case ',': {
        const c = { link: 'http' }
        e[e.length - 1].branchset?.push(c)
        r = c
        break
      }
      case ')':
        r = e.pop() ?? {}
        break
      case ':':
        break
      default: {
        const h = s[t - 1]
        h === ')' || h === '(' || h === ','
          ? (r.name = n)
          : h === ':' && (r.length = parseFloat(n))
      }
    }
  }
  return r
}

</script>

<style scoped>
#dendrogram circle {
  fill: #fff;
  stroke: #9c0;
  stroke-width: 3px;
}

#dendrogram .node text {
  font: 12px sans-serif;
}

#dendrogram .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>

<template>
  <div>
    <svg id="dendrogram" class="container-border" font-family="sans-serif" font-size="10" :viewBox="vBox">
      <component is="style">
        .link--active {
        stroke: #000 !important;
        stroke-width: 1.5px;
        }

        .link-extension--active {
        stroke-opacity: .6;
        }

        .label--active {
        font-weight: bold;
        }
      </component>
    </svg>
    <div>{{ debug }}</div>
  </div>
</template>