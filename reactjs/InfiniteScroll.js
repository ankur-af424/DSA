import React, { useState, useEffect, useRef, useCallback } from 'react';

function useInfiniteScroll(fetchPage) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const { data, hasMore: more } = await fetchPage(page);
        if (cancelled) return;
        setItems((prev) => [...prev, ...data]);
        setHasMore(more);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchPage, page]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setPage((p) => p + 1);
      }
    }, { rootMargin: '200px' });

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [hasMore, loading, items.length]);

  return { items, hasMore, loading, sentinelRef };
}

const fetchPosts = async (page) => {
  const limit = 10;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  const data = await response.json();

  return {
    data,
    hasMore: data.length === limit,
  };
};

function App() {
  const { items, loading, hasMore, sentinelRef } = useInfiniteScroll(fetchPosts);

  return (
    <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '12px' }}>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '16px' }}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}

      {hasMore && <div ref={sentinelRef} style={{ height: '1px' }} />}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items.</p>}
    </div>
  );
}

export default App;