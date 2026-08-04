import { getCollection } from 'astro:content';

async function test() {
  const allPosts = await getCollection('blog');
  console.log(allPosts.map(p => p.id));
}
test();
