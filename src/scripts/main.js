const FormManager = require("./JournalForm")
const APIObject = require("./DataManager")
const listEntries = require("./EntryList")
const $ = require("jquery")
// const createEntry = require("./Entry")

// Render the journal entry form
$("#journalForm").html(FormManager.renderEntryForm())

// Add an event listener for the save button
$("#saveEntryButton").on("click", () => {
    // Get form field values
    // Create object from them
    // Add timestamp
    const newEntry = {
        title: $("#entryTitle").val(),
        content: $("#entryContent").val(),
        date: Date(Date.now())
    }

    // POST to API
    APIObject.saveJournalEntry(newEntry).then(() => {
        // Clear the form fields
        FormManager.clearForm()

        $("#entryList").html("")
        listEntries()


        // $("#entryList").addEventListener("click", (event) => {
        //     const entryId = event.target.id.split("--")[1]
        //     APIObject.deleteJournalEntry(entryId).then(() => {
        //         remove()
        //     })
        // })
    })

    // Put HTML representation on the DOM
})

listEntries()

$("#entryList").on("click", evt => {
    if (evt.target.classList.contains("entry__delete")) {
        const id = parseInt(evt.target.id.split("--")[1])
        APIObject.deleteJournalEntry(id)
            .then(() => {
                $("#entryList").html("")
            })
            .then(() => {
                listEntries()
            }
            )
    }
})

