const STORAGE_KEY = 'deck_id';

export function getDeckId() {
	return localStorage.getItem(STORAGE_KEY);
}

export function setDeckId(id) {
	localStorage.setItem(STORAGE_KEY, id);
}
