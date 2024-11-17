import './assets/css/style.css'; 
// Carica la cronologia delle ricerche al caricamento della pagina
import { loadSearchHistory, searchBooks } from './assets/js/app';

document.addEventListener("DOMContentLoaded", () => {
    loadSearchHistory(); // Carica la cronologia delle ricerche al caricamento della pagina
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchBooks); // Aggiunta dell'event listener al bottone di ricerca
});