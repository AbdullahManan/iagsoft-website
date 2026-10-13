import Image from 'next/image';
import styles from './InstagramFeed.module.css';

async function getPosts() {
  const url =
    'https://graph.instagram.com/me/media' +
    '?fields=id,caption,media_type,media_url,thumbnail_url,permalink' +
    '&limit=4' +
    `&access_token=${process.env.INSTAGRAM_TOKEN}`;

  const res = await fetch(url, { next: { revalidate: 10 } });

  if (!res.ok) {
    console.error('Instagram fetch failed:', res.status, await res.text());
    return [];
  }

  const json = await res.json();
  return json.data ?? [];
}

export default async function InstagramFeed() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return <p>Instagram posts could not be loaded (check the terminal for details).</p>;
  }

    return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Instagram</span>
        <h2 className={styles.headline}>Latest from our feed</h2>

        <div className={styles.grid}>
          {posts.map((post) => {
            const imageUrl =
              post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <Image
                  src={imageUrl}
                  alt={post.caption ? post.caption.slice(0, 100) : 'Instagram post'}
                  width={300}
                  height={400}
                  className={styles.image}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}