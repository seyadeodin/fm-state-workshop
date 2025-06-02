# Exercise 9: Data Normalization

## The Problem with Nested Data

The current travel itinerary application stores data in a deeply nested structure where each destination contains an array of todos. This creates several problems:

### Deeply Nested Updates

When updating or deleting a todo item, the reducer must:

1. Find the correct destination by mapping through all destinations
2. Find the correct todo within that destination's todos array
3. Create a new nested structure preserving immutability

```typescript
// Complex nested update - hard to read and error-prone
destinations: state.destinations.map((dest) =>
  dest.id === action.destinationId
    ? {
        ...dest,
        todos: dest.todos.filter((todo) => todo.id !== action.todoId),
      }
    : dest
);
```

### Performance Issues

- **O(n×m) complexity**: Every todo operation requires iterating through destinations AND todos
- **Unnecessary re-renders**: Updating one todo causes the entire destinations array to be recreated
- **Memory overhead**: Deeply nested objects are harder for JavaScript engines to optimize

### Code Complexity

- Reducer logic becomes increasingly complex with more nesting levels
- Difficult to implement features like global todo search or cross-destination operations
- Error-prone when adding new nested relationships

## Benefits of Data Normalization

Normalization flattens the data structure by storing entities in separate collections and using IDs to reference relationships:

### Simplified Updates

```typescript
// Normalized - direct and clear
case 'DELETE_TODO':
  return {
    ...state,
    todos: state.todos.filter(todo => todo.id !== action.todoId)
  }
```

### Better Performance

- **O(1) lookups**: Direct access to entities by ID using objects/Maps
- **Minimal re-renders**: Only affected components re-render
- **Efficient operations**: No need to traverse nested structures

### Code Clarity

- Each entity type has clear, focused update logic
- Easy to implement complex queries and cross-entity operations
- Reducer actions become more predictable and testable

## Exercise Instructions

Transform the current nested data structure into a normalized one:

- **Split destination into a separate component** - Create a `DestinationCard` component to encapsulate destination logic and make the code more modular

- **Normalize the state to have a single array of todos** - Instead of `destinations: Destination[]` where each destination has `todos: TodoItem[]`, create separate collections:

  ```typescript
  interface NormalizedState {
    destinations: { [id: string]: { id: string; name: string } };
    todos: {
      [id: string]: { id: string; text: string; destinationId: string };
    };
  }
  ```

- **Bonus: Implement undo and redo** - Add history tracking to enable undoing and redoing actions. Consider storing previous states or implementing command pattern.

- **Bonus: Use a 3rd party library to manage the state** - Replace useReducer with a state management library like Zustand, Redux Toolkit, or Jotai that provides built-in normalization helpers.

## Expected Outcome

After normalization, the app should:

- Have the same functionality but with cleaner, more performant code
- Enable easier implementation of features like todo search, bulk operations, or todo reordering
- Provide a foundation for more complex state management patterns
