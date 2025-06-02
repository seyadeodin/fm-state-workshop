# Exercise 10: Taming Cascading Effects

## The Problem with Cascading useEffects

When building complex user interfaces, it's common to have multiple pieces of state that depend on each other. A naive approach might be to use multiple `useEffect` hooks that trigger in sequence, creating a "cascade" of effects. However, this pattern leads to several serious problems:

### 1. **Difficult to Follow Logic Flow**

```tsx
// Effect 1: Trigger search when inputs change
useEffect(() => {
  if (destination && startDate && endDate) {
    setIsSearchingFlights(true);
  }
}, [destination, startDate, endDate]);

// Effect 2: Perform flight search
useEffect(() => {
  if (!isSearchingFlights) return;
  // ... search logic
}, [isSearchingFlights]);

// Effect 3: Trigger hotel search when flight selected
useEffect(() => {
  if (selectedFlight) {
    setIsSearchingHotels(true);
  }
}, [selectedFlight]);

// Effect 4: Perform hotel search
useEffect(() => {
  if (!isSearchingHotels) return;
  // ... search logic
}, [isSearchingHotels]);
```

The logic flow jumps between different effects, making it hard to understand the complete user journey.

### 2. **Race Conditions and Timing Issues**

- Effects might run in unexpected orders
- State updates are asynchronous, leading to stale closures
- Multiple effects might trigger simultaneously, causing conflicts

### 3. **Debugging Nightmares**

- Hard to trace which effect caused a particular state change
- React DevTools shows effects firing in seemingly random order
- Difficult to reproduce bugs consistently

### 4. **Unnecessary Re-renders**

- Each state change triggers component re-renders
- Multiple effects can cause cascading re-renders
- Performance suffers as the component updates multiple times

## The Solution: Event-Driven State Management

Instead of thinking about _when_ data changes (reactive), think about _why_ data changes (events). This shift in mindset leads to more predictable and maintainable code.

### Understanding the "Why" Behind Data Changes

Ask yourself: **What user action or business event caused this state change?**

- User fills in form → `userUpdatedSearchParams` event
- Flight search completes → `flightSelected` event
- Hotel search completes → `hotelSelected` event
- API call fails → `searchFailed` event

### Refactoring to useReducer + Single useEffect

```tsx
type Action =
  | { type: 'SET_INPUT'; inputs: Partial<SearchInputs> }
  | { type: 'flightUpdated'; flight: Flight }
  | { type: 'hotelUpdated'; hotel: Hotel }
  | { type: 'SET_ERROR'; error: string };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_INPUT':
      const inputs = { ...state.inputs, ...action.inputs };
      return {
        ...state,
        inputs,
        status: allInputsValid(inputs) ? 'searchingFlights' : state.status,
      };
    case 'flightUpdated':
      return {
        ...state,
        status: 'searchingHotels',
        selectedFlight: action.flight,
      };
    // ... other cases
  }
}

// Single effect handles all async operations based on status
useEffect(() => {
  if (state.status === 'searchingFlights') {
    searchFlights().then((flight) =>
      dispatch({ type: 'flightUpdated', flight })
    );
  }
  if (state.status === 'searchingHotels') {
    searchHotels().then((hotel) => dispatch({ type: 'hotelUpdated', hotel }));
  }
}, [state]);
```

### Benefits of This Approach

1. **Single Source of Truth**: All state lives in the reducer
2. **Predictable State Transitions**: Each action explicitly defines what changes
3. **Easier Testing**: Actions are pure functions, easy to unit test
4. **Better Debugging**: Clear action history in React DevTools
5. **No Race Conditions**: State changes are synchronous within the reducer

## The Exercise

In `page.tsx`, you'll find a trip booking component that demonstrates the cascading effects anti-pattern. The component:

1. Uses 4 separate `useEffect` hooks that trigger in sequence
2. Manages multiple boolean flags (`isSearchingFlights`, `isSearchingHotels`)
3. Has complex interdependencies between state variables
4. Is difficult to follow and debug

### Your Task

Study the current implementation and identify:

- How many separate effects are chained together
- What state changes trigger each effect
- How the logic flow jumps between different effects
- Where race conditions might occur

Then examine the solution in `solution/page.tsx` to see how the same functionality is implemented with:

- A single `useReducer` managing all state
- One `useEffect` handling async operations
- Clear action types representing business events
- Predictable state flow

### Key Learning Points

1. **Effects should be minimal**: Use effects only for synchronizing with external systems
2. **State updates should be explicit**: Use actions that clearly describe what happened
3. **Business logic belongs in reducers**: Keep effects simple and focused
4. **Think in events, not reactions**: Model user interactions and business events

Run the exercise and compare the behavior - both versions work identically, but the refactored version is much more maintainable and debuggable.
