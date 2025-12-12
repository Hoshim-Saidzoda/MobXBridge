import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todos-sycn";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  Card,
  CardContent,
  Stack
} from "@mui/material";

const TodoList = observer(() => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (editId) {
      todoStore.editTodo(editId, text);
      setEditId(null);
    } else {
      todoStore.addTodo(text);
    }
    setText("");
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setText(todo.title);
  };

  return (
    <Box sx={{ maxWidth: { xs: "100%", sm: 600, md: 1200 }, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Sync Todo
      </Typography>

       <Card sx={{ p: 2, mb: 4 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label={editId ? "Edit todo" : "Add new todo"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Save" : "Add"}
          </Button>
          {editId && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setEditId(null);
                setText("");
              }}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Card>

       <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        flexWrap="wrap"
      >
        {todoStore.todos.map((todo) => (
          <Card
            key={todo.id}
            sx={{
              width: { xs: "100%", sm: 250 },
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              mb: 2
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox
                checked={todo.status}
                onChange={() => todoStore.toggleStatus(todo.id)}
              />
              <Typography variant="subtitle1">
                {todo.status ? "Active" : "Inactive"}
              </Typography>
            </Stack>

            {todo.Image && (
              <img
                src={todo.Image}
                alt="todo"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 12
                }}
              />
            )}

            <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
              {todo.title}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Button variant="outlined" onClick={() => startEdit(todo)}>
                EDIT
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => todoStore.deleteTodo(todo.id)}
              >
                DELETE
              </Button>
             </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
});

export default TodoList;
