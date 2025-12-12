import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todo-async";
import { Box, Typography, Button, Grid, CardMedia, Stack } from "@mui/material";

const TodoInfo = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    todoStore.getTodoById(id);
  }, [id]);

  const todo = todoStore.currentTodo;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, px: { xs: 2, sm: 3 } }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          {todo?.name || "Untitled"}
        </Typography>

        <Typography variant="body1">{todo?.description || ""}</Typography>

        {todo?.images?.length > 0 ? (
          <Grid container spacing={2}>
            {todo.images.map(
              (img) =>
                img.imagePath && (
                  <Grid item xs={12} sm={6} md={4} key={img.id}>
                    <CardMedia
                      component="img"
                      image={img.imagePath}
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        objectFit: "cover",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/150?text=Error")
                      }
                    />
                  </Grid>
                )
            )}
          </Grid>
        ) : (
          <Typography>No images</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
});

export default TodoInfo;
