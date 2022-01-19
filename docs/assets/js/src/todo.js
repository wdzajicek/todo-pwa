function todo() {
  const note = document.getElementById('notifications');
  const clear = document.getElementById('clearNotifications');
  // create an instance of a db object for us to store the IDB data in
  let db;
  // create a blank instance of the object that is used to transfer data into the IDB. This is mainly for reference
  let newItem = [
        { taskTitle: "", details: "", hours: 0, minutes: 0, day: 0, month: "", year: 0, notified: "no" }
      ];
  // all the variables we need for the app
  const taskList = document.getElementById('task-list');

  const taskForm = document.getElementById('Form');
  const title = document.getElementById('title');
  const details = document.getElementById('details');

  const day = document.getElementById('daySelect');
  const month = document.getElementById('monthSelect');
  const year = document.getElementById('yearSelect');


  note.innerHTML += '<li>App initialised.</li>';
  // In the following line, you should include the prefixes of implementations you want to test.
  // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // // DON'T use "var indexedDB = ..." if you're not in a function.
  // // Moreover, you may need references to some window.IDB* objects:
  // window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  // window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  // Open our database
  const DBOpenRequest = window.indexedDB.open("toDoList", 4);

  DBOpenRequest.onerror = function(event) {
    note.innerHTML += '<li>Error loading database.</li>';
  }

  DBOpenRequest.onsuccess = function(event) {
    note.innerHTML += '<li>Database initialized.</li>';

    // store the result of opening the database in the db variable. This is used a lot below
    db = DBOpenRequest.result;

    // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
    displayData();
  }

  // This event handles the event whereby a new version of the database needs to be created
  // Either one has not been created before, or a new version number has been submitted via the
  // window.indexedDB.open line above
  //it is only implemented in recent browsers
  DBOpenRequest.onupgradeneeded = function(event) {
    let db = event.target.result;

    db.onerror = function(event) {
      note.innerHTML += '<li>Error loading database.</li>';
    };

    // Create an objectStore for this database
    let objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

    // define what data items the objectStore will contain
    objectStore.createIndex("details", "details", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("year", "year", { unique: false });


    note.innerHTML += '<li>Object store created.</li>';
  }

  function deleteItem(event) {
    // retrieve the name of the task we want to delete
    let dataTask = event.target.dataset.task;

    // open a database transaction and delete the task, finding it by the name we retrieved above
    let transaction = db.transaction(["toDoList"], "readwrite");
    let request = transaction.objectStore("toDoList").delete(dataTask);

    // report that the data item has been deleted
    transaction.oncomplete = function() {
      // delete the parent of the button, which is the list item, so it no longer is displayed
      event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
      note.innerHTML += '<li>Task \"' + dataTask + '\" deleted.</li>';
    };
  }

  function displayData() {
    // first clear the content of the task list so that you don't get a huge long list of duplicate stuff each time
    //the display is updated.
    taskList.innerHTML = "";

    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    let objectStore = db.transaction('toDoList').objectStore('toDoList');

    objectStore.openCursor().onsuccess = function (event) {
      let cursor = event.target.result;
      // if there is still another cursor to go, keep runing this code
      if(cursor) {
        const v = cursor.value;
        let [title, details, month, day, year] = [v.taskTitle, v.details, v.month, v.day, v.year];

        // build the to-do list entry and put it into the list item via innerHTML.
        let html = `
        <div class="card mb-3">
          <div class="card-header">
            <h3 class="h3">${title}</h3>
          </div>
          <div class="card-body">
            <h4 class="h4">${ day + '/' + month + '/' + year }</h4>
            <p class="p">${details}</p>
          </div>
          <div class="card-footer">
            <button data-task="${title}" type="button" class="btn delete btn-outline-danger">Delete</button>
          </div>
        </div>`;

        // if(cursor.value.notified == "yes") {
        //   listItem.style.textDecoration = "line-through";
        //   listItem.style.color = "rgba(255,0,0,0.5)";
        // }

        // put the item item inside the task list
        taskList.insertAdjacentHTML('afterbegin', html);
        
        const delBtn = document.querySelector(`[data-task="${title}"]`);

        delBtn.addEventListener('click', deleteItem);

        // continue on to the next item in the cursor
        cursor.continue();

      // if there are no more cursor items to iterate through, say so, and exit the function
      } else {
        note.innerHTML += '<li>Entries all displayed.</li>';
      }
    }
  }

  function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();

    // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
    let newItem = [
      { taskTitle: title.value, details: details.value, day: day.value, month: month.value, year: year.value, notified: "no" }
    ];

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(["toDoList"], "readwrite");

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function() {
      note.innerHTML += '<li>Transaction completed: database modification finished.</li>';

      // update the display of data to show the newly added item, by running displayData() again.
      displayData();
    };

    transaction.onerror = function() {
      note.innerHTML += '<li>Transaction not opened due to error: ' + transaction.error + '</li>';
    };

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore("toDoList");
    console.log(objectStore.indexNames);
    console.log(objectStore.keyPath);
    console.log(objectStore.name);
    console.log(objectStore.transaction);
    console.log(objectStore.autoIncrement);

    // Make a request to add our newItem object to the object store
    let objectStoreRequest = objectStore.add(newItem[0]);

    objectStoreRequest.onsuccess = function (event) {

      // report the success of our request
      // (to detect whether it has been succesfully
      // added to the database, you'd look at transaction.oncomplete)
      note.innerHTML += '<li>Request successful.</li>';

      const d = new Date();

      // clear the form, ready for adding the next entry
      title.value = '';
      details.value = '';
      day.value = d.getDate();
      month.value = d.getMonth() + 1;
      year.value = 2022;
    };
  }

  // give the form submit button an event listener so that when the form is submitted the addData() function is run
  taskForm.addEventListener('submit', addData, false);
  clear.addEventListener('click', (e) => note.innerHTML = '');
}

export default todo;