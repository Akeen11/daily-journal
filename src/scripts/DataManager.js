const APIObject = {}

APIObject.saveJournalEntry = (entry) => {
    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
        .then(response => response.json())
}

APIObject.getJournalEntry = () => {
    return fetch("http://localhost:8088/entries?_order=desc&_sort=id")
        .then(response => response.json());
}

APIObject.deleteJournalEntry = (entryId) => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "DELETE",
    })
        .then(response => response.json())
}




module.exports = APIObject