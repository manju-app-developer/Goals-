

document.addEventListener("DOMContentLoaded", () => {
    // Load saved tasks, goals, and books
    loadTasks();
    loadBooks();
    loadGoals();

    // Task Management
    const taskInput = document.getElementById("task-input");
    const deadlineInput = document.getElementById("deadline-input");
    const categorySelect = document.getElementById("category");
    const taskList = document.getElementById("tasks");
    const addTaskButton = document.getElementById("add-task");

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const deadline = deadlineInput.value;
        const category = categorySelect.value;

        if (taskText === "") return;

        const taskObj = { text: taskText, deadline, category };
        saveTask(taskObj);
        addTaskToUI(taskObj);

        taskInput.value = "";
        deadlineInput.value = "";

        // Update XP and Streak
        xp += 10;
        updateXP();
        streak++;
        updateStreak();
    });

    function saveTask(taskObj) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToUI(task));
    }

    function addTaskToUI(taskObj) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${taskObj.text}</strong> (${taskObj.category}) <br> ⏳ Deadline: ${taskObj.deadline} 
                        <button class="remove-task">❌</button>`;

        taskList.appendChild(li);

        li.querySelector(".remove-task").addEventListener("click", () => {
            removeTask(taskObj.text);
            li.remove();
        });
    }

    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Books Section
    const bookInput = document.getElementById("book-input");
    const bookList = document.getElementById("books");
    const addBookButton = document.getElementById("add-book");

    addBookButton.addEventListener("click", () => {
        const bookText = bookInput.value.trim();
        if (bookText === "") return;

        saveBook(bookText);
        addBookToUI(bookText);

        bookInput.value = "";
    });

    function saveBook(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    function loadBooks() {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(book => addBookToUI(book));
    }

    function addBookToUI(book) {
        const li = document.createElement("li");
        li.innerHTML = `${book} <button class="remove-book">❌</button>`;
        bookList.appendChild(li);

        li.querySelector(".remove-book").addEventListener("click", () => {
            removeBook(book);
            li.remove();
        });
    }

    function removeBook(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.filter(b => b !== book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Goals Section
    const goalInput = document.getElementById("goal-input");
    const goalList = document.getElementById("goals");
    const addGoalButton = document.getElementById("add-goal");

    addGoalButton.addEventListener("click", () => {
        const goalText = goalInput.value.trim();
        if (goalText === "") return;

        saveGoal(goalText);
        addGoalToUI(goalText);

        goalInput.value = "";
    });

    function saveGoal(goal) {
        let goals = JSON.parse(localStorage.getItem("goals")) || [];
        goals.push(goal);
        localStorage.setItem("goals", JSON.stringify(goals));
    }

    function loadGoals() {
        let goals = JSON.parse(localStorage.getItem("goals")) || [];
        goals.forEach(goal => addGoalToUI(goal));
    }

    function addGoalToUI(goal) {
        const li = document.createElement("li");
        li.innerHTML = `${goal} <button class="remove-goal">❌</button>`;
        goalList.appendChild(li);

        li.querySelector(".remove-goal").addEventListener("click", () => {
            removeGoal(goal);
            li.remove();
        });
    }

    function removeGoal(goal) {
        let goals = JSON.parse(localStorage.getItem("goals")) || [];
        goals = goals.filter(g => g !== goal);
        localStorage.setItem("goals", JSON.stringify(goals));
    }

    // XP System
    let xp = parseInt(localStorage.getItem("xp")) || 0;
    const xpDisplay = document.getElementById("xp-points");

    function updateXP() {
        xpDisplay.textContent = `XP: ${xp}`;
        localStorage.setItem("xp", xp);
    }

    updateXP();

    // Focus Mode
    let focusMode = localStorage.getItem("focusMode") === "true";
    const focusButton = document.getElementById("start-focus");
    const focusStatus = document.getElementById("focus-status");

    function updateFocusMode() {
        focusStatus.textContent = focusMode ? "Focus Mode: ON" : "Focus Mode: OFF";
        document.body.style.background = focusMode ? "#222" : "white";
        localStorage.setItem("focusMode", focusMode);
    }

    focusButton.addEventListener("click", () => {
        focusMode = !focusMode;
        updateFocusMode();
    });

    updateFocusMode();

    // Time Tracking
    let startTime;
    const startTracking = document.getElementById("start-tracking");
    const stopTracking = document.getElementById("stop-tracking");
    const trackedTime = document.getElementById("tracked-time");

    startTracking.addEventListener("click", () => {
        startTime = new Date();
        trackedTime.textContent = "Tracking...";
    });

    stopTracking.addEventListener("click", () => {
        if (startTime) {
            let endTime = new Date();
            let timeSpent = Math.round((endTime - startTime) / 60000);
            trackedTime.textContent = `Total Time: ${Math.floor(timeSpent / 60)}h ${timeSpent % 60}m`;
        }
    });

    // Daily Streak System
    let streak = parseInt(localStorage.getItem("streak")) || 0;
    const streakText = document.getElementById("streak-text");

    function updateStreak() {
        streakText.textContent = `Current Streak: ${streak} Days`;
        localStorage.setItem("streak", streak);
    }

    updateStreak();
});
