import { makeAutoObservable, runInAction } from "mobx";

const API = "https://to-dos-api.softclub.tj";

class TodoStore {
  data = [];
  error = null;
  isModalOpen = false;
  modalMode = null;
  currentTodo = null;
  name = "";
  desc = "";
  files = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTodos = async () => {
    try {
      const res = await fetch(`${API}/api/to-dos`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();
      console.log('API response:', result);

     runInAction(() => {
  this.data = result.data.map(todo => ({
    ...todo,
    images: todo.images?.map(img => ({
      ...img,
      imagePath: `${API}/images/${img.imageName}`  
    }))
  }));
  this.error = null;
});

    } catch (err) {
      console.error('Error in getTodos:', err.message);
      runInAction(() => {
        this.error = err.message;
      });
    }
  };

  openAddModal = () => {
    this.currentTodo = null;
    this.name = "";
    this.desc = "";
    this.files = [];
    this.modalMode = "add";
    this.isModalOpen = true;
  };

  openEditModal = (todo) => {
    this.currentTodo = todo;
    this.name = todo.name;
    this.desc = todo.description;
    this.files = [];
    this.modalMode = "edit";
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.isModalOpen = false;
    this.currentTodo = null;
    this.name = "";
    this.desc = "";
    this.files = [];
    this.modalMode = null;
  };

  setName = (name) => (this.name = name);
  setDesc = (desc) => (this.desc = desc);
  handleFilesChange = (e) => (this.files = e.target.files);

  saveTodo = async () => {
    if (this.modalMode === "add") {
      const formData = new FormData();
      formData.append("Name", this.name);
      formData.append("Description", this.desc);
      for (let i = 0; i < this.files.length; i++) {
        formData.append("Images", this.files[i]);
      }
      await fetch(`${API}/api/to-dos`, { method: "POST", body: formData });
    } else if (this.modalMode === "edit") {
      const payload = {
        id: this.currentTodo.id,
        Name: this.name,
        Description: this.desc
      };
      await fetch(`${API}/api/to-dos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    this.closeModal();
    this.getTodos();
  };

  deleteTodo = async (id) => {
    await fetch(`${API}/api/to-dos/?id=${id}`, { method: "DELETE" });
    this.getTodos();
  };

  toggleComplete = async (todo) => {
    const updated = { ...todo, isCompleted: !todo.isCompleted };
    await fetch(`${API}/completed?id=${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    this.getTodos();
  };

  

  addImage = async (todoId, filesList) => {
    const formData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      formData.append("Images", filesList[i]);
    }
    await fetch(`${API}/api/to-dos/${todoId}/images`, {
      method: "POST",
      body: formData
    });
    this.getTodos();
  };

  
  deleteImage = async (imageId) => {
    await fetch(`${API}/api/to-dos/images/${imageId}`, { method: "DELETE" });
    this.getTodos();
  };




  
  getTodoById = async (id) => {
    try {
      const res = await fetch(`${API}/api/to-dos/${id}`);
      const result = await res.json();
      runInAction(() => {
       this.currentTodo = {
  ...result.data,
  images: result.data.images?.map(img => ({
    ...img,
    imagePath: `${API}/images/${img.imageName}`
  }))
};

      });
    } catch (e) {
      console.log("Error getTodoById:", e);
    }
  };
 
}

export const todoStore = new TodoStore();
