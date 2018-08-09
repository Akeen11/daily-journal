const FormManager = require("./JournalForm")
const APIObject = require("./DataManager")
const listEntries = require("./EntryList")
// const createEntry = require("./Entry")

// Render the journal entry form
document.querySelector("#journalForm").innerHTML = FormManager.renderEntryForm()

// Add an event listener for the save button
document.querySelector("#saveEntryButton").addEventListener("click", () => {
    // Get form field values
    // Create object from them
    // Add timestamp
    const newEntry = {
        title: document.querySelector("#entryTitle").value,
        content: document.querySelector("#entryContent").value,
        date: Date(Date.now())
    }

    // POST to API
    APIObject.saveJournalEntry(newEntry).then(() => {
        // Clear the form fields
        FormManager.clearForm()

        document.querySelector("#entryList").innerHTML = ""
        listEntries()


        // document.querySelector("#entryList").addEventListener("click", (event) => {
        //     const entryId = event.target.id.split("--")[1]
        //     APIObject.deleteJournalEntry(entryId).then(() => {
        //         remove()
        //     })
        // })
    })

    // Put HTML representation on the DOM
})

listEntries()

document.querySelector("#entryList").addEventListener("click", (event) => {
    const entryId = event.target.id.split("--")[1]
    APIObject.deleteJournalEntry(entryId).then(() => {
        document.querySelector("#entryList").innerHTML = ""
        listEntries()
    })
})

