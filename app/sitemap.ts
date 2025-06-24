import { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/repository/post_repository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // 静的なページのルート
  const routes = ['/', '/posts/page/1'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // 動的なブログ記事のルート
  const posts = await getAllPosts()
  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.createdAt).toISOString(),
  }))

  return [...routes, ...postRoutes]
}
