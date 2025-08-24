document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('task'))
    if (storedTasks) {
        storedTasks.forEach((t) =>task.push(t))
        updateTasksList();
        updateStarts();
    }
});
// To Do List App with Filters
// This code allows users to add, edit, delete, and mark tasks as complete.
let task = [];
const savetask = () => {
    localStorage.setItem('task', JSON.stringify(task));
};
const addtask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();
    if (text) {
        task.push({ text: text, completed: false })
        taskinput.value = "";
        updateTasksList();
        updateStarts();
        savetask();
    }

};
const toggleTaskcomplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTasksList();
    updateStarts();
    savetask();

};
const deleteTask = (index) => {
    task.splice(index, 1);
    updateTasksList();
    updateStarts();
    savetask();

};
const editTask = (index) => {
    const taskinput = document.getElementById('taskinput');
    taskinput.value = task[index].text;
    task.splice(index, 1);
    updateTasksList();
    updateStarts();
    savetask();

};
const updateStarts = () => {
    const completetask = task.filter((t) => t.completed).length;
    const totalTasks = task.length;
    const progress = (completetask / totalTasks) * 100;
    const progressbar = document.getElementById("progress");
    progressbar.style.width = `${progress}%`;
    progressbar.innerText = `${Math.round(progress)}%`;
    document.getElementById("numbars").innerText = ` ${completetask} / ${totalTasks}`
};
const updateTasksList = () => {
    const tasklist = document.getElementById('task-list');
    tasklist.innerHTML = "";
    task.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
              <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
               <p class="p1">${task.text}</p>
            </div>
            <div class="icons">
               <img src="edit.png" onClick="editTask(${index})">
               <img src="trash.png"onClick="deleteTask(${index})">
            </div>
         </div>
        `;
        listItem.addEventListener('change', () => toggleTaskcomplete(index));
        tasklist.append(listItem);

    });
};
document.getElementById('newtask').addEventListener('click', function (e) {
    e.preventDefault();
    addtask();


});
// To Do List logic (keep your existing code above)
// -----------------------------------------------


// Contact Form Validation
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact");
    const nameInput = document.querySelector(".namediv .contact_input");
    const emailInput = document.querySelector(".emaildiv .contact_input");
    const messageInput = document.querySelector(".massagediv .contact_input");
    const submitBtn = document.querySelector(".submit");

    submitBtn.addEventListener("click", function (e) {
        e.preventDefault(); // stop form from submitting before validation

        let valid = true;
        let errorMessage = "";

        // Name validation
        if (nameInput.value.trim() === "") {
            valid = false;
            errorMessage += "⚠ Please enter your name.\n";
        }

        // Email validation (simple regex)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            valid = false;
            errorMessage += "⚠ Please enter your email.\n";
        } else if (!emailPattern.test(emailInput.value.trim())) {
            valid = false;
            errorMessage += "⚠ Please enter a valid email.\n";
        }

        // Message validation
        if (messageInput.value.trim() === "") {
            valid = false;
            errorMessage += "⚠ Please enter your message.\n";
        } else if (messageInput.value.trim().length < 10) {
            valid = false;
            errorMessage += "⚠ Message should be at least 10 characters.\n";
        }

        if (valid) {
            alert("✅ Form submitted successfully!");
            form.reset(); // clear fields
        } else {
            alert(errorMessage);
        }
    });
});
