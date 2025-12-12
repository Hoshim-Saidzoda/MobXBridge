import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todo-async";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  TextField,
  Grid,
  Stack
} from "@mui/material";

const TodoList = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    todoStore.getTodos();
  }, []);

  const handleAddImages = (todoId, files) => {
    todoStore.addImage(todoId, files);
  };

  return (
<Box
  sx={{
    maxWidth: 1200,
    mx: "auto",
    mt: 5,
    px: { xs: 3, sm: 3 },
    display: "flex",
    flexWrap: "wrap",
    gap: 3,  
    justifyContent: { xs: "center", md: "flex-start" }, // по центру на мобильных
  }}
>       <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 4, maxWidth: 300, fontWeight: "bold", fontSize: 16 }}
        onClick={todoStore.openAddModal}
      >
        Add
      </Button>

      <Grid container spacing={4}>
        {todoStore.data?.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
               <Typography variant="h6" gutterBottom>
                {todo.name}
              </Typography>

               <Typography variant="body2" sx={{ mb: 1 }}>
                {todo.description}
              </Typography>

               {todo.images?.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 1 }}>
                  {todo.images.map(
                    (img) =>
                      img.imagePath && (
                        <Grid item xs={6} key={img.id}>
                          <CardMedia
                            component="img"
                            image={img.imagePath}
                            sx={{
                              width: "138%",
                              height: { xs: 100, sm: 250 },
                              objectFit: "cover",
                              borderRadius: 1,
                              transition: "transform 0.3s",
                              "&:hover": { transform: "scale(1.05)" },
                            }}
                            onError={(e) =>
                              (e.target.src = "https://via.placeholder.com/120")
                            }
                          />
                        </Grid>
                      )
                  )}
                </Grid>
              )}

               <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Button
                  variant="outlined"
                  color={todo.isCompleted ? "success" : "warning"}
                  fullWidth
                  onClick={() => todoStore.toggleComplete(todo)}
                >
                  {todo.isCompleted ? "Active" : "Inactive"}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => todoStore.openEditModal(todo)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => todoStore.deleteTodo(todo.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  fullWidth
                  onClick={() => navigate(`/todo/${todo.id}`)}
                >
                  Info
                </Button>
              </Stack>

               <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 1 }}
              >
                Add Photo
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => handleAddImages(todo.id, e.target.files)}
                />
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

       <Modal open={todoStore.isModalOpen} onClose={todoStore.closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {todoStore.modalMode === "add" ? "Add Todo" : "Edit Todo"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            value={todoStore.name}
            onChange={(e) => todoStore.setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={todoStore.desc}
            onChange={(e) => todoStore.setDesc(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Photo
            <input
              type="file"
              multiple
              hidden
              onChange={todoStore.handleFilesChange}
            />
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={todoStore.saveTodo}
            sx={{ mb: 1 }}
          >
            Save
          </Button>
          <Button variant="outlined" fullWidth onClick={todoStore.closeModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
});

export default TodoList;
