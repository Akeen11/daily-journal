const createEntry = (title, content, date, id) => {
    // Create your own HTML structure for a journal entry
    return `
    <article class="entry border border-dark">
        <header>
            <h2>${title}</h2>
        </header>
        <section>
            ${content}
        </section>
        <footer>
            <time>${date}</time>
        </footer>
        <button id="deleteEntryButton--${id}" class="entry__delete">Delete Entry</button>
    </article>
    `
}

module.exports = createEntry