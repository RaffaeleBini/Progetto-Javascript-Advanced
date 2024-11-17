// Seleziona gli elementi dal DOM
const searchButton = document.getElementById("searchButton");
const resultsList = document.getElementById("results");
const categoryInput = document.getElementById("categoryInput");
const loader = document.getElementById("loader");
const searchHistoryList = document.getElementById("searchHistory");
const bookDetailsDiv = document.getElementById("bookDetails");
const bookDescriptionParagraph = document.getElementById("bookDescription");


// Funzione per mostrare e nascondere il loader
function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

// Funzione per validare l'input dell'utente
function validateInput() {
    const category = categoryInput.value.trim();
    if (category === "") {
        alert("Per favore, inserisci una categoria valida.");
        return false;
    }
    return true;
}

// Funzione per salvare la cronologia delle ricerche
function saveToHistory(category) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.includes(category)) {
        history.push(category);
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

// Funzione per visualizzare la cronologia delle ricerche
function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistoryList.innerHTML = "";

    history.forEach(category => {
        const listItem = document.createElement("li");
        listItem.textContent = category;
        listItem.classList.add("list-group-item");
        listItem.addEventListener("click", () => {
            categoryInput.value = category;
            searchBooks();
        });
        searchHistoryList.appendChild(listItem);
    });
}

// Funzione per effettuare la ricerca dei libri
async function searchBooks() {
    if (!validateInput()) return;

    const category = categoryInput.value.trim();
    saveToHistory(category);

    const apiUrl = `https://openlibrary.org/subjects/${category}.json`;
    showLoader();

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        resultsList.innerHTML = "";  // Svuota i risultati precedenti
        hideLoader();

        if (data.works.length === 0) {
            alert("Nessun libro trovato per questa categoria.");
            return;
        }

        // Aggiungi i titoli e autori dei libri alla lista dei risultati
        data.works.forEach(book => {
            const listItem = document.createElement("li");
            listItem.textContent = `${book.title} - Autori: ${book.authors.map(a => a.name).join(", ")}`;
            listItem.classList.add("list-group-item");
            listItem.addEventListener("click", () => showBookDetails(book.key));
            resultsList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Errore nella chiamata API", error);
    } finally {
        hideLoader();
    }
}

// Funzione per mostrare i dettagli di un libro
async function showBookDetails(bookKey) {
    const apiUrl = `https://openlibrary.org${bookKey}.json`;
    showLoader();

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        hideLoader();

        // Visualizza i dettagli del libro nel div #bookDetails
        bookDetailsDiv.style.display = "block";
        
        if (data.description) {
            const description = typeof data.description === 'string' ? data.description : data.description.value;
            bookDescriptionParagraph.textContent = description;
        } else {
            bookDescriptionParagraph.textContent = "Descrizione non disponibile.";
        }

    } catch (error) {
        console.error("Errore nel recupero della descrizione del libro", error);
    } finally {
        hideLoader();
    }
}

// Carica la cronologia delle ricerche al caricamento della pagina
// document.addEventListener("DOMContentLoaded", loadSearchHistory);

// Aggiungi un event listener al bottone di ricerca
// searchButton.addEventListener("click", searchBooks);

// Esporta le funzioni che vuoi rendere disponibili all'esterno
export {
    showLoader,
    hideLoader,
    validateInput,
    saveToHistory,
    loadSearchHistory,
    searchBooks,
    showBookDetails
};