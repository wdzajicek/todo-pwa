function todo() {
  function addNote(message) {
    if (note.childElementCount > 7) {
      note.innerHTML = '';
    }
    note.innerHTML += `<li>${message}</li>`;
  }
  const note = document.getElementById('notifications');
  const clear = document.getElementById('clearNotifications');
  let db;
  let newItem = [
        { taskTitle: "", details: "", hours: 0, minutes: 0, day: 0, month: "", year: 0, notified: "no" }
      ];
  const taskList = document.getElementById('task-list');

  const taskForm = document.getElementById('Form');
  const title = document.getElementById('title');
  const details = document.getElementById('details');

  const day = document.getElementById('daySelect');
  const month = document.getElementById('monthSelect');
  const year = document.getElementById('yearSelect');


  addNote('App initialized.');

  // Open database
  const DBOpenRequest = window.indexedDB.open("toDoList", 4);

  DBOpenRequest.onerror = function(event) {
    addNote('Error loading database.');
  }

  DBOpenRequest.onsuccess = function(event) {
    addNote('Database initialized.');
    db = DBOpenRequest.result;
    displayData();
  }

  DBOpenRequest.onupgradeneeded = function(event) {
    let db = event.target.result;

    db.onerror = function(event) {
      addNote('Error loading database.');
    };

    let objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

    objectStore.createIndex("details", "details", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("year", "year", { unique: false });

    addNote('Object store created.');
  }

  function deleteItem(event) {
    let dataTask = event.target.dataset.task;
    let transaction = db.transaction(["toDoList"], "readwrite");
    let request = transaction.objectStore("toDoList").delete(dataTask);

    transaction.oncomplete = function() {
      event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
      addNote(`Task "${dataTask}" deleted.`);
    };
  }

  function displayData() {
    taskList.innerHTML = "";

    let objectStore = db.transaction('toDoList').objectStore('toDoList');

    objectStore.openCursor().onsuccess = function (event) {
      let cursor = event.target.result;

      if(cursor) {
        const v = cursor.value;
        let [title, details, month, day, year] = [v.taskTitle, v.details, v.month, v.day, v.year];

        title = title.replace(/[^a-zA-Z0-9-_ ]/g, '');

        // Template string defines HTML for each event (includes BS 5 code)
        let html = `
        <div class="card mb-3">
          <div class="card-header">
            <h3 class="h3">${title}</h3>
          </div>
          <div class="card-body">
            <h4 class="h4">${ month + '/' + day + '/' + year }</h4>
            <p class="p">${details}</p>
          </div>
          <div class="card-footer">
            <button data-task="${title}" type="button" class="btn delete btn-outline-danger">Delete</button>
          </div>
        </div>`;

        taskList.insertAdjacentHTML('afterbegin', html);
        
        const delBtn = document.querySelector(`[data-task="${title}"]`);

        delBtn.addEventListener('click', deleteItem);
        cursor.continue();
      } else {
        addNote('Entries all displayed.');
      }
    }
  }

  function addData(e) {
    e.preventDefault(); // Needed to prevent normal form submission

    let newItem = [
      { taskTitle: title.value, details: details.value, day: day.value, month: month.value, year: year.value, notified: "no" }
    ];
    let transaction = db.transaction(["toDoList"], "readwrite");

    transaction.oncomplete = function() {
      addNote('Transaction completed: database modification finished.');

      displayData();
    };

    transaction.onerror = function () {
      addNote(`Transaction not opened due to error: ${transaction.error}`);
    };

    let objectStore = transaction.objectStore("toDoList");
    // console.log(objectStore.indexNames);
    // console.log(objectStore.keyPath);
    // console.log(objectStore.name);
    // console.log(objectStore.transaction);
    // console.log(objectStore.autoIncrement);

    let objectStoreRequest = objectStore.add(newItem[0]);

    objectStoreRequest.onsuccess = function (event) {
      const d = new Date();

      addNote('Request successful.');

      title.value = '';
      details.value = '';
      day.value = d.getDate(); // Reset form to current day
      month.value = d.getMonth() + 1; // Reset form to current month
      year.value = d.getFullYear(); // You get the idea...
    };
  }

  taskForm.addEventListener('submit', addData, false);
  // A button to clear the app status
  clear.addEventListener('click', (e) => note.innerHTML = '');
}

export default todo;