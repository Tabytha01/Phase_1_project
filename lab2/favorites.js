// Favorites module: manage favorites in localStorage and render on the Favorites page

const FAVORITES_STORAGE_KEY = "bookExplorer.favorites";

function getFavorites() {
	const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
	try {
		return raw ? JSON.parse(raw) : [];
	} catch (_) {
		return [];
	}
}

function saveFavorites(favorites) {
	localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorite(book) {
	const favorites = getFavorites();
	const exists = favorites.some((b) => b.id === book.id);
	if (!exists) {
		favorites.push(book);
		saveFavorites(favorites);
	}
	return favorites;
}

export function removeFavorite(bookId) {
	const favorites = getFavorites().filter((b) => b.id !== bookId);
	saveFavorites(favorites);
	return favorites;
}

export function listFavorites() {
	return getFavorites();
}

// If this script is loaded on the Favorites page, render favorites
function renderFavoritesPage() {
	const container = document.querySelector("#favorites-grid");
	if (!container) return; // not on favorites page

	function render() {
		const favorites = listFavorites();
		container.innerHTML = "";
		if (favorites.length === 0) {
			container.innerHTML = `
			  <div class="col-span-full text-center text-gray-600">No favorites yet. Add some from Home!</div>
			`;
			return;
		}
		for (const book of favorites) {
			const card = document.createElement("div");
			card.className = "relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:translate-y-1 transition";
			card.innerHTML = `
			  <img src="${book.image || "https://placehold.co/400x300?text=No+Cover"}" alt="${book.title}" class="w-full h-64 object-cover" />
			  <div class="p-4">
			    <h3 class="font-semibold text-slate-900">${book.title}</h3>
			    ${book.author ? `<p class="text-sm text-gray-600">${book.author}</p>` : ""}
			  </div>
			  <button data-id="${book.id}" class="absolute top-3 right-3 bg-white bg-opacity-80 hover:bg-pink-500 hover:text-white text-pink-500 rounded-full p-2 shadow-md transition" title="Remove from Favorites">❤️</button>
			`;
			container.appendChild(card);
		}
	}

	container.addEventListener("click", (e) => {
		const target = e.target;
		if (target instanceof Element && target.matches("button[data-id]")) {
			const id = target.getAttribute("data-id");
			if (id) {
				removeFavorite(id);
				render();
			}
		}
	});

	render();
}

// Auto-init when loaded directly in a browser
if (typeof window !== "undefined") {
	window.addEventListener("DOMContentLoaded", renderFavoritesPage);
}

