# Combining and Optimizing State

## Core Concepts

### Combining Related State

- **Rule**: Group related state variables into single objects for better organization
- **Anti-pattern**: Having many individual `useState` calls for related data
- **Best practice**: Combine related state into objects and use single state updates
- **Benefits**:
  - Fewer state variables to manage
  - Atomic updates ensure consistency
  - Easier to understand relationships between data
  - Less boilerplate code for state management

### Eliminating Derived State

- **Rule**: If you can calculate it, don't store it
- **Anti-pattern**: Using `useState` + `useEffect` to sync derived data
- **Best practice**: Calculate derived values directly in render or with `useMemo`
- **Benefits**:
  - Eliminates synchronization bugs
  - Reduces state complexity
  - Automatically stays in sync with source data
  - Better performance with fewer re-renders

### Removing Redundant State

- **Rule**: Single source of truth for each piece of data
- **Anti-pattern**: Storing the same data in multiple places (like full objects when only ID is needed)
- **Best practice**: Store minimal state and derive everything else
- **Benefits**:
  - Prevents synchronization bugs when data gets out of sync
  - Simpler update logic
  - Reduced memory usage
  - Easier debugging and maintenance

**Before (Anti-patterns):**

```tsx
// ❌ Multiple individual states for related data
const [destination, setDestination] = useState('');
const [departure, setDeparture] = useState('');
const [arrival, setArrival] = useState('');
const [passengers, setPassengers] = useState(1);

// ❌ Redundant state - storing full object and ID
const [flights, setFlights] = useState([]);
const [selectedFlight, setSelectedFlight] = useState(null);
const [selectedFlightId, setSelectedFlightId] = useState(null);

// ❌ Derived state stored separately
const [totalCost, setTotalCost] = useState(0);
useEffect(() => {
  setTotalCost(selectedFlight?.price || 0);
}, [selectedFlight]);
```

**After (Best practices):**

```tsx
// ✅ Combined related state
const [searchForm, setSearchForm] = useState({
  destination: '',
  departure: '',
  arrival: '',
  passengers: 1,
});

// ✅ Single source of truth - only store ID
const [flights, setFlights] = useState([]);
const [selectedFlightId, setSelectedFlightId] = useState(null);

// ✅ Derived state calculated directly
const selectedFlight = flights.find((f) => f.id === selectedFlightId);
const totalCost = selectedFlight?.price || 0;
```

### Type States for Better Modeling

- **Rule**: Use discriminated unions to model different application states
- **Anti-pattern**: Using boolean flags that can create impossible states
- **Best practice**: Define explicit states with their associated data
- **Benefits**:
  - Impossible states become impossible
  - Type safety ensures correct data access
  - Clearer component logic
  - Better error handling

```tsx
// ❌ Boolean flags can create impossible states
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

// ✅ Type states prevent impossible combinations
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: FlightData };
```

---

## Exercise: Refactor Flight Booking State

**Goal**: Optimize state management by combining, eliminating, and organizing state

You have a flight booking component with several state management anti-patterns. Your task is to refactor it to follow best practices for cleaner, more maintainable code.

### Current Issues to Fix:

1. **Individual state variables** for related form data
2. **Redundant state** storing both full objects and IDs
3. **Derived state** unnecessarily stored in separate variables
4. **Boolean flags** that can create impossible states

### Your Task:

1. **Combine related states** into single objects:

   - Group form fields (destination, departure, arrival, passengers) into one state object
   - Combine loading, error, and data states using discriminated unions

2. **Remove redundant state**:

   - Store only flight IDs, not full flight objects
   - Derive selected flight from flights array and selected ID

3. **Get rid of derived state**:

   - Calculate totals, formatted dates, and other derived values directly in render
   - Remove unnecessary `useEffect` hooks for synchronization

4. **Bonus: Use FormData and Zod**:

   - Replace controlled inputs with FormData for form handling
   - Add Zod schema for validation

5. **Bonus: Implement type states**:
   - Replace boolean flags with discriminated unions
   - Ensure impossible states are impossible

### Success Criteria:

- Related state variables are combined into logical objects
- No redundant state - single source of truth for all data
- Derived values calculated in render, not stored in state
- Type-safe state transitions with discriminated unions
- Cleaner, more maintainable code with fewer state variables
- Same functionality but better organized and more performant
