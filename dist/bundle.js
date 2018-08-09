(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
const createEntry = require("./Entry")
const APIObject = require("./DataManager")



function listEntries(){
    APIObject.getJournalEntry()
    .then(results => {
        results.forEach(entries => {
        let entryComponent = createEntry(entries.title, entries.content, entries.date, entries.id);
        writeEntriesToDOM(entryComponent);

    })
    });
}
// let data = APIObject.getJournalEntry()
// console.log(data)
function writeEntriesToDOM(entries){
    document.querySelector("#entryList").innerHTML += entries
}

module.exports = listEntries
},{"./DataManager":1,"./Entry":2}],4:[function(require,module,exports){
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
                <fieldset>
                    <label for="entryTitle">Title:</label>
                    <input required type="text" id="entryTitle">
                </fieldset>
                <fieldset>
                    <label for="entryContent">Deep Thoughts:</label>
                    <textarea id="entryContent"></textarea>
                </fieldset>
                <button id="saveEntryButton">Save Journal Entry</button>
            `
        }
    }

})


module.exports = FormManager
},{}],5:[function(require,module,exports){
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


},{"./DataManager":1,"./EntryList":3,"./JournalForm":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGFNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9FbnRyeS5qcyIsIi4uL3NjcmlwdHMvRW50cnlMaXN0LmpzIiwiLi4vc2NyaXB0cy9Kb3VybmFsRm9ybS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQVBJT2JqZWN0ID0ge31cclxuXHJcbkFQSU9iamVjdC5zYXZlSm91cm5hbEVudHJ5ID0gKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeSlcclxuICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG59XHJcblxyXG5BUElPYmplY3QuZ2V0Sm91cm5hbEVudHJ5ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXM/X29yZGVyPWRlc2MmX3NvcnQ9aWRcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG59XHJcblxyXG5BUElPYmplY3QuZGVsZXRlSm91cm5hbEVudHJ5ID0gKGVudHJ5SWQpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvJHtlbnRyeUlkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxufVxyXG5cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBUElPYmplY3QiLCJjb25zdCBjcmVhdGVFbnRyeSA9ICh0aXRsZSwgY29udGVudCwgZGF0ZSwgaWQpID0+IHtcclxuICAgIC8vIENyZWF0ZSB5b3VyIG93biBIVE1MIHN0cnVjdHVyZSBmb3IgYSBqb3VybmFsIGVudHJ5XHJcbiAgICByZXR1cm4gYFxyXG4gICAgPGFydGljbGUgY2xhc3M9XCJlbnRyeVwiPlxyXG4gICAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgICAgIDxoMj4ke3RpdGxlfTwvaDI+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgICR7Y29udGVudH1cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPGZvb3Rlcj5cclxuICAgICAgICAgICAgPHRpbWU+JHtkYXRlfTwvdGltZT5cclxuICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlRW50cnlCdXR0b24tLSR7aWR9XCI+RGVsZXRlIEVudHJ5PC9idXR0b24+XHJcbiAgICA8L2FydGljbGU+XHJcbiAgICBgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRW50cnkiLCJjb25zdCBjcmVhdGVFbnRyeSA9IHJlcXVpcmUoXCIuL0VudHJ5XCIpXHJcbmNvbnN0IEFQSU9iamVjdCA9IHJlcXVpcmUoXCIuL0RhdGFNYW5hZ2VyXCIpXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGxpc3RFbnRyaWVzKCl7XHJcbiAgICBBUElPYmplY3QuZ2V0Sm91cm5hbEVudHJ5KClcclxuICAgIC50aGVuKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgIHJlc3VsdHMuZm9yRWFjaChlbnRyaWVzID0+IHtcclxuICAgICAgICBsZXQgZW50cnlDb21wb25lbnQgPSBjcmVhdGVFbnRyeShlbnRyaWVzLnRpdGxlLCBlbnRyaWVzLmNvbnRlbnQsIGVudHJpZXMuZGF0ZSwgZW50cmllcy5pZCk7XHJcbiAgICAgICAgd3JpdGVFbnRyaWVzVG9ET00oZW50cnlDb21wb25lbnQpO1xyXG5cclxuICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG4vLyBsZXQgZGF0YSA9IEFQSU9iamVjdC5nZXRKb3VybmFsRW50cnkoKVxyXG4vLyBjb25zb2xlLmxvZyhkYXRhKVxyXG5mdW5jdGlvbiB3cml0ZUVudHJpZXNUb0RPTShlbnRyaWVzKXtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlMaXN0XCIpLmlubmVySFRNTCArPSBlbnRyaWVzXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbGlzdEVudHJpZXMiLCJjb25zdCBGb3JtTWFuYWdlciA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG4gICAgY2xlYXJGb3JtOiB7XHJcbiAgICAgICAgdmFsdWU6ICgpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVRpdGxlXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5Q29udGVudFwiKS52YWx1ZSA9IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyRW50cnlGb3JtOiB7XHJcbiAgICAgICAgdmFsdWU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW50cnlUaXRsZVwiPlRpdGxlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbnRyeVRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbnRyeUNvbnRlbnRcIj5EZWVwIFRob3VnaHRzOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiZW50cnlDb250ZW50XCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZUVudHJ5QnV0dG9uXCI+U2F2ZSBKb3VybmFsIEVudHJ5PC9idXR0b24+XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybU1hbmFnZXIiLCJjb25zdCBGb3JtTWFuYWdlciA9IHJlcXVpcmUoXCIuL0pvdXJuYWxGb3JtXCIpXHJcbmNvbnN0IEFQSU9iamVjdCA9IHJlcXVpcmUoXCIuL0RhdGFNYW5hZ2VyXCIpXHJcbmNvbnN0IGxpc3RFbnRyaWVzID0gcmVxdWlyZShcIi4vRW50cnlMaXN0XCIpXHJcbi8vIGNvbnN0IGNyZWF0ZUVudHJ5ID0gcmVxdWlyZShcIi4vRW50cnlcIilcclxuXHJcbi8vIFJlbmRlciB0aGUgam91cm5hbCBlbnRyeSBmb3JtXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1cIikuaW5uZXJIVE1MID0gRm9ybU1hbmFnZXIucmVuZGVyRW50cnlGb3JtKClcclxuXHJcbi8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNhdmUgYnV0dG9uXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZUVudHJ5QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAvLyBHZXQgZm9ybSBmaWVsZCB2YWx1ZXNcclxuICAgIC8vIENyZWF0ZSBvYmplY3QgZnJvbSB0aGVtXHJcbiAgICAvLyBBZGQgdGltZXN0YW1wXHJcbiAgICBjb25zdCBuZXdFbnRyeSA9IHtcclxuICAgICAgICB0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVRpdGxlXCIpLnZhbHVlLFxyXG4gICAgICAgIGNvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb250ZW50XCIpLnZhbHVlLFxyXG4gICAgICAgIGRhdGU6IERhdGUoRGF0ZS5ub3coKSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQT1NUIHRvIEFQSVxyXG4gICAgQVBJT2JqZWN0LnNhdmVKb3VybmFsRW50cnkobmV3RW50cnkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vIENsZWFyIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgICAgIEZvcm1NYW5hZ2VyLmNsZWFyRm9ybSgpXHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlMaXN0XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBsaXN0RW50cmllcygpXHJcblxyXG5cclxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5TGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGVudHJ5SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXVxyXG4gICAgICAgIC8vICAgICBBUElPYmplY3QuZGVsZXRlSm91cm5hbEVudHJ5KGVudHJ5SWQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgcmVtb3ZlKClcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBQdXQgSFRNTCByZXByZXNlbnRhdGlvbiBvbiB0aGUgRE9NXHJcbn0pXHJcblxyXG5saXN0RW50cmllcygpXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5TGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbnRyeUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgIEFQSU9iamVjdC5kZWxldGVKb3VybmFsRW50cnkoZW50cnlJZCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUxpc3RcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGxpc3RFbnRyaWVzKClcclxuICAgIH0pXHJcbn0pXHJcblxyXG4iXX0=
