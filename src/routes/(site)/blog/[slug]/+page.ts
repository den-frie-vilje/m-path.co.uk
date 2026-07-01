import { error } from '@sveltejs/kit';
import { posts, getPost } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

// Enumerate every post slug so the prerender crawler emits each article page.
export const entries: EntryGenerator = () => posts.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
  const post = getPost(params.slug);
  if (!post) throw error(404, 'Article not found');
  return { post };
};
