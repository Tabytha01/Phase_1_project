const OPEN_LIBRARY_BASE = "https://openlibrary.org";

export async function searchBooks(query) {
	if (!query || !query.trim()) return [];
	const url = `${OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(query.trim())}&limit=18`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("Failed to fetch books");
	const data = await res.json();
	return (data.docs || []).map((doc) => {
		const coverId = doc.cover_i;
		const image = coverId
			? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
			: "https://placehold.co/400x300?text=No+Cover";
		return {
			id: doc.key || doc.edition_key?.[0] || `${doc.title}-${doc.first_publish_year || ""}`,
			title: doc.title || "Untitled",
			author: (doc.author_name && doc.author_name[0]) || "Unknown",
			image,
		};
	});
}

export async function getTrendingBooks() {
	// Use a default search as a simple trending proxy
	return await searchBooks("bestsellers");
}


