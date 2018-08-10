const FormManager = Object.create(null, {
    clearForm: {
        value: () => {
            document.querySelector("#entryTitle").value = ""
            document.querySelector("#entryContent").value = ""
        }
    },
    renderEntryForm: {
        value: () => {
            return `
            <div class="border">
                <fieldset>
                    <label for="entryTitle">Title:</label>
                    <input required type="text" id="entryTitle">
                </fieldset>
                <fieldset>
                    <label for="entryContent">Deep Thoughts:</label>
                    <textarea id="entryContent"></textarea>
                </fieldset>
                <button id="saveEntryButton" class="bg-success text-white">Save Journal Entry</button>
            </div>
            `
        }
    }

})


module.exports = FormManager