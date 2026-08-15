const Todobox = ({ todos = [], onDelete, onEdit, onToggle }) => {
  return (
    <div>
      <h1>Todo Display box</h1>
      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo._id || todo.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={Boolean(todo.isDone)}
                onChange={() => onToggle(todo)}
              />
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {todo.title}
              </span>
              <button type="button" onClick={() => onEdit(todo)}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(todo._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todobox;
