const input = document.querySelector("input");
const list = document.getElementById("list");
let editMode = null;

async function getTaskfromGroq() {
  if (input.value == "") {
    alert("Please enter your query");
  } else {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are task creator who generates array of string for task based on user query\nExample - User asks - I want to learn javascript\nresult - { 'tasks': ['Learn basic of variable', 'control flows', 'so on']} in json\n",
            },
            {
              role: "user",
              content: input.value,
            },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 1,
          max_completion_tokens: 1024,
          top_p: 1,
          stream: false,
          response_format: {
            type: "json_object",
          },
          stop: null,
        }),
      }
    );

    const body = await response.json();
    const tasks = JSON.parse(body.choices[0].message.content).tasks;
    tasks.forEach((task) => {
      const newLi = document.createElement("li"); // <li></li>
      newLi.id = "task";
      newLi.innerHTML = `${task}
      <button onclick='deleteTask(event)' style='margin-left: auto; background: red;'>Delete</button>
       <button onclick='editTask(event)' style='background: orange'>Edit</button>`;
      list.appendChild(newLi);
    });

    input.value = "";
  }
}

// ' <button onclick="deleteTask(event)">Del</button>'

function clearAll(){
    list.innerHTML = "";
}

function addTask() {
  if (input.value === "") {
      alert("Please Enter Task");
      return;
  }

  if (editMode) {
      editMode.firstChild.nodeValue = input.value; 
      editMode = null;
      document.getElementById('add-task').innerText = "Add Task"; 
  } else {
      const newLi = document.createElement('li');
      newLi.id = "task";
      newLi.innerHTML = `${input.value} 
          <button onclick='deleteTask(event)' style='margin-left: auto; background: red;'>Delete</button>
          <button onclick='editTask(event)' style='background: orange'>Edit</button>`;

      list.appendChild(newLi);
  }

  input.value = "";  
}

function deleteTask(event) {
  if (confirm("Are you sure you want to delete this task?")) {
      event.target.parentElement.remove();
  }
}

function editTask(event) {
  let li = event.target.parentElement;
  input.value = li.firstChild.nodeValue.trim();
  document.getElementById('add-task').innerText = "Update Task";
  editMode = li;
}