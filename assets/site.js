(function () {
  const yearTarget = document.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const escapeHtml = (value = '') =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const postsGrid = document.querySelector('[data-posts-grid]');
  if (!postsGrid) return;

  fetch('/assets/posts.json')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load posts');
      return response.json();
    })
    .then((posts) => {
      if (!Array.isArray(posts) || posts.length === 0) {
        return;
      }

      const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      const fragment = document.createDocumentFragment();

      sortedPosts.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'post-card';

        const topics = Array.isArray(post.topics) ? post.topics : [];
        const topicsMarkup = topics
          .map((topic) => `<li>${escapeHtml(topic)}</li>`)
          .join('');

        const url = escapeHtml(post.url);
        const title = escapeHtml(post.title);

        article.innerHTML = `
          <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.displayDate ?? post.date)}</time>
          ${post.readTime ? `<p class="reading-time">${escapeHtml(post.readTime)}</p>` : ''}
          <h3><a href="${url}">${title}</a></h3>
          <p lang="en">${escapeHtml(post.excerpt_en)}</p>
          <p class="bangla" lang="bn">${escapeHtml(post.excerpt_bn)}</p>
          ${topicsMarkup ? `<ul class="topic-list" aria-label="Topics">${topicsMarkup}</ul>` : ''}
          <a class="read-more" href="${url}" aria-label="Continue reading ${title}">
            <span>Continue reading</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        `;

        fragment.appendChild(article);
      });

      postsGrid.replaceChildren(fragment);
    })
    .catch(() => {
      const status = document.createElement('p');
      status.className = 'bangla';
      status.setAttribute('role', 'status');
      status.textContent = 'পোস্ট তালিকা লোড করা যাচ্ছে না। অনুগ্রহ করে পরে চেষ্টা করুন।';
      postsGrid.appendChild(status);
    });
})();
