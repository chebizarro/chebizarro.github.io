<script setup lang="ts">
const route = useRoute()


const { data } = await useAsyncData(`content-/blog`, async () => {
  const _posts = await queryContent('blog').only('title').find()
  return _posts;
});

const items = unref(data)?.map((item) => {
        return item.title + ':0.80'
      })
      .join(',')

const posts = unref(data)?.map((item) => {
        return { name: item.title, length: 0.30 }
      })

const newick = {
  length: 0.30,
  branchset: [
    { name: 'Blog', length: 0.30, link: '/blog', branchset: posts },
    { name: 'Social', length: 0.30, branchset: [
      { name: 'Github', length: 0.40, link: 'https://github.com/chebizarro'},
      { name: 'LinkedIn', length: 0.40, link: 'https://www.linkedin.com/in/chris-daley-b7830616/'},
    ]},
    { name: 'Pages', length: 0.30, link: '/pages', branchset: [
      { name: 'About', length: 0.30, link: '/pages/about', branchset: [
        { name: 'CV', length: 0.30, link: '/pages/cv' },      
      ] },
      { name: 'Articles', length: 0.30, link: '/pages/articles' }, 
    ]},
   ]
}

const output =
      `((${items})Blog:0.30,(((CV:0.30, Bits:0.40)About Me:0.30,Articles:0.30)Pages:0.30,(Twitter:0.40,Github:0.40, LinkedIn:0.40)Social:0.30):0.30);`
const domains = ['Blog', 'Social', 'Pages']

</script>

<template>
  <div>
    <Dendrogram :data="newick" :domains="domains"></Dendrogram>
  </div>
</template>

