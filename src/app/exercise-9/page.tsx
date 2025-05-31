'use client';

import { useReducer, useRef } from 'react';

// Types
interface TodoItem {
  id: string;
  text: string;
}

interface Destination {
  id: string;
  name: string;
  todos: TodoItem[];
}

interface ItineraryState {
  destinations: Destination[];
}

// Action types
type Action =
  | { type: 'ADD_DESTINATION' }
  | { type: 'UPDATE_DESTINATION'; destinationId: string; name: string }
  | { type: 'DELETE_DESTINATION'; destinationId: string }
  | { type: 'ADD_TODO'; destinationId: string; text: string }
  | { type: 'DELETE_TODO'; destinationId: string; todoId: string };

// Reducer function
function itineraryReducer(
  state: ItineraryState,
  action: Action
): ItineraryState {
  switch (action.type) {
    case 'ADD_DESTINATION':
      return {
        ...state,
        destinations: [
          ...state.destinations,
          { id: crypto.randomUUID(), name: '', todos: [] },
        ],
      };
    case 'UPDATE_DESTINATION':
      return {
        ...state,
        destinations: state.destinations.map((dest) =>
          dest.id === action.destinationId
            ? { ...dest, name: action.name }
            : dest
        ),
      };
    case 'DELETE_DESTINATION':
      return {
        ...state,
        destinations: state.destinations.filter(
          (dest) => dest.id !== action.destinationId
        ),
      };
    case 'ADD_TODO':
      return {
        ...state,
        destinations: state.destinations.map((dest) =>
          dest.id === action.destinationId
            ? {
                ...dest,
                todos: [
                  ...dest.todos,
                  { id: crypto.randomUUID(), text: action.text },
                ],
              }
            : dest
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        destinations: state.destinations.map((dest) =>
          dest.id === action.destinationId
            ? {
                ...dest,
                todos: dest.todos.filter((todo) => todo.id !== action.todoId),
              }
            : dest
        ),
      };
    default:
      return state;
  }
}

export default function ItineraryPage() {
  const [state, dispatch] = useReducer(itineraryReducer, {
    destinations: [],
  });
  const lastInputRef = useRef<HTMLInputElement>(null);

  const handleAddDestination = () => {
    dispatch({ type: 'ADD_DESTINATION' });
    // Focus the new input after render
    setTimeout(() => {
      lastInputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Travel Itinerary</h1>
        <button
          onClick={handleAddDestination}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Destination
        </button>
        <div className="mt-4 space-y-6">
          {state.destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={destination.name}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_DESTINATION',
                      destinationId: destination.id,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter destination name"
                  className="border rounded px-3 py-2 flex-1"
                  ref={
                    index === state.destinations.length - 1
                      ? lastInputRef
                      : null
                  }
                />
                <button
                  onClick={() =>
                    dispatch({
                      type: 'DELETE_DESTINATION',
                      destinationId: destination.id,
                    })
                  }
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Delete
                </button>
              </div>
              <div className="pl-4 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem(
                      'todo'
                    ) as HTMLInputElement;
                    if (input.value.trim()) {
                      dispatch({
                        type: 'ADD_TODO',
                        destinationId: destination.id,
                        text: input.value.trim(),
                      });
                      input.value = '';
                    }
                  }}
                  className="flex gap-2 mb-2"
                >
                  <input
                    type="text"
                    name="todo"
                    placeholder="Add a todo item"
                    className="border rounded px-3 py-1 flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    Add
                  </button>
                </form>
                <ul className="space-y-2">
                  {destination.todos.map((todo) => (
                    <li key={todo.id} className="flex items-center gap-2">
                      <span className="flex-1">{todo.text}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'DELETE_TODO',
                            destinationId: destination.id,
                            todoId: todo.id,
                          })
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button disabled className="bg-gray-300 text-white px-4 py-2 rounded">
          Undo
        </button>
        <button disabled className="bg-gray-300 text-white px-4 py-2 rounded">
          Redo
        </button>
      </div>
    </div>
  );
}
