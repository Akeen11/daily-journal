const createEntry = (title, content, date, id) => {
    // Create your own HTML structure for a journal entry
    return `
    <article class="entry">
        <header>
            <h2>${title}</h2>
        </header>
        <section>
            ${content}
        </section>
        <footer>
            <time>${date}</time>
        </footer>
        <button id="deleteEntryButton--${id}">Delete Entry</button>
    </article>
    `
}

module.exports = createEntry