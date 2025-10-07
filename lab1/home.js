import { getTrendingBooks, searchBooks } from "../lab3/fetchBooks.js";
import { addFavorite, listFavorites } from "../lab2/favorites.js";

function getGrid() {
	return document.querySelector("#books-grid");
}

function getSearchElements() {
	return {
		input: document.querySelector("#search-input"),
		button: document.querySelector("#search-button"),
		feedback: document.querySelector("#feedback"),
	};
}

function showFeedback(message) {
	const { feedback } = getSearchElements();
	if (feedback) {
		feedback.textContent = message;
		feedback.classList.remove("hidden");
	}
}

function clearFeedback() {
	const { feedback } = getSearchElements();
	if (feedback) {
		feedback.textContent = "";
		feedback.classList.add("hidden");
	}
}

function renderBooks(books) {
	const grid = getGrid();
	if (!grid) return;
	grid.innerHTML = "";
	if (!books || books.length === 0) {
		grid.innerHTML = `<div class="col-span-full text-center text-gray-600">No results found.</div>`;
		return;
	}
	const favoriteIds = new Set(listFavorites().map((b) => b.id));
	for (const book of books) {
		const card = document.createElement("div");
		card.className = "relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:translate-y-1 transition";
		const isFav = favoriteIds.has(book.id);
		card.innerHTML = `
		  <img src="${book.image}" alt="${book.title}" class="w-full h-64 object-cover" />
		  <div class="p-4">
		    <h3 class="font-semibold text-slate-900">${book.title}</h3>
		    ${book.author ? `<p class=\"text-sm text-gray-600\">${book.author}</p>` : ""}
		  </div>
		  <button data-id="${book.id}" data-title="${book.title}" data-author="${book.author || ""}" data-image="${book.image || ""}" class="absolute top-3 right-3 ${isFav ? "bg-pink-500 text-white" : "bg-white text-pink-500"} bg-opacity-80 hover:bg-pink-500 hover:text-white rounded-full p-2 shadow-md transition" title="${isFav ? "In Favorites" : "Add to Favorites"}">❤️</button>
		`;
		grid.appendChild(card);
	}
}

async function loadTrending() {
	const { button } = getSearchElements();
	if (button) button.disabled = true;
	showFeedback("Loading trending books...");
	try {
		const books = await getTrendingBooks();
		renderBooks(books);
	} catch (e) {
		showFeedback("Failed to load books. Please try again.");
		return;
	} finally {
		clearFeedback();
		if (button) button.disabled = false;
	}
}

async function handleSearch() {
	const { input, button } = getSearchElements();
	if (!input) return;
	const q = input.value;
	if (!q.trim()) {
		showFeedback("Please enter a search term.");
		return;
	}
	if (button) button.disabled = true;
	showFeedback("Searching...");
	try {
		const books = await searchBooks(q);
		renderBooks(books);
	} catch (e) {
		showFeedback("Search failed. Please try again.");
		return;
	} finally {
		clearFeedback();
		if (button) button.disabled = false;
	}
}

function wireEvents() {
	const { input, button } = getSearchElements();
	const grid = getGrid();
	if (button) button.addEventListener("click", handleSearch);
	if (input) input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") handleSearch();
	});
	if (grid) {
		grid.addEventListener("click", (e) => {
			const target = e.target;
			if (target instanceof Element && target.matches("button[data-id]")) {
				const book = {
					id: target.getAttribute("data-id"),
					title: target.getAttribute("data-title") || "",
					author: target.getAttribute("data-author") || "",
					image: target.getAttribute("data-image") || "",
				};
				addFavorite(book);
				target.classList.add("bg-pink-500", "text-white");
				target.classList.remove("bg-white", "text-pink-500");
				target.setAttribute("title", "In Favorites");
			}
		});
	}
}

window.addEventListener("DOMContentLoaded", () => {
	wireEvents();
	loadTrending();
});


