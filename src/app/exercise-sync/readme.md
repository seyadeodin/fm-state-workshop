# Syncing with External Stores

## Core Concepts

### useSyncExternalStore for External Data Sources

- **Rule**: Use `useSyncExternalStore` for subscribing to external stores and data sources
- **Anti-pattern**: Using `useEffect` + `useState` for external data synchronization
- **Best practice**: Use `useSyncExternalStore` for atomic updates and hydration safety
- **Benefits**:
  - Eliminates the useEffect + useState dance for external data
  - Handles hydration mismatches between server and client
  - Optimizes performance with built-in subscription management
  - Provides consistency across server-side rendering and client-side hydration

`useSyncExternalStore` is a React hook that lets you subscribe to external stores (data sources outside React's state management system). It can replace the common `useEffect` + `useState` pattern when syncing with external data sources.

**Before (Anti-pattern):**

```tsx
// ❌ Anti-pattern: useEffect + useState for external data
function FlightDashboard() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Subscribe to external store
    const unsubscribe = flightStore.subscribe((newFlights) => {
      setFlights(newFlights);
    });

    // Set initial data
    setFlights(flightStore.getFlights());

    return unsubscribe;
  }, []);

  return <div>{/* render flights */}</div>;
}
```

**Problems with this approach:**

- **Race conditions**: Initial data and subscription updates can get out of sync
- **Hydration mismatches**: Server and client might show different data
- **Performance**: Extra re-renders during initial setup
- **Complexity**: Manual subscription management and cleanup

**After (Best practice):**

```tsx
// ✅ Best practice: useSyncExternalStore
function FlightDashboard() {
  const flights = useSyncExternalStore(
    flightStore.subscribe, // Subscribe function
    flightStore.getSnapshot, // Get current snapshot
    flightStore.getSnapshot // Get server snapshot (optional)
  );

  return <div>{/* render flights */}</div>;
}
```

**Benefits:**

- **Atomic updates**: Guarantees consistency between subscription and snapshot
- **Hydration safety**: Handles server/client differences gracefully
- **Automatic cleanup**: No manual subscription management needed
- **Performance optimized**: Minimal re-renders and efficient updates

## When to Use useSyncExternalStore

**Perfect for:**

- **Third-party libraries**: Redux, Zustand, or any external state management
- **Custom hooks**: When building reusable hooks that sync with external data
- **Browser APIs**: Window size, network status, geolocation, etc.
- **Real-time data**: WebSocket connections, server-sent events
- **Global stores**: Any data source that exists outside React's component tree

**Not needed for:**

- Regular React state (`useState`, `useReducer`)
- Context values
- Props or derived data

## Handling Hydration Issues

One of the most powerful features is handling server/client hydration differences:

```tsx
const isOnline = useSyncExternalStore(
  subscribe,
  () => navigator.onLine, // Client snapshot
  () => true // Server snapshot (assume online)
);
```

This prevents hydration mismatches where the server renders one thing and the client shows another.

---

## Exercise: Sync with External Flight Store

**Goal**: Replace `useEffect` + `useState` with `useSyncExternalStore` for external data

You have a flight dashboard that currently uses the manual `useEffect` + `useState` pattern to sync with an external flight store. This approach has timing issues and doesn't handle hydration properly.

### Your Task:

1. **Refactor from useEffect + useState** to `useSyncExternalStore` in `page.tsx`
2. **Connect to the FlightStore** using the proper subscription pattern
3. **Handle real-time updates** as the flight data changes every 5 seconds
4. **Bonus**: Derive additional metrics like average delay and total delayed flights

### Setup:

The `FlightStore` is already set up with:

- `subscribe(callback)` - Subscribe to changes
- `getSnapshot()` - Get current flight data
- Automatic updates every 5 seconds with realistic flight status changes

### Key Learning Points:

- How `useSyncExternalStore` eliminates common async state bugs
- Why it's superior to `useEffect` + `useState` for external data
- How to build reusable custom hooks with external stores
- Understanding the three parameters: subscribe, getSnapshot, and getServerSnapshot

### Success Criteria:

- No more manual `useEffect` + `useState` patterns for external data
- Flight data updates automatically when store changes
- No hydration mismatches between server and client
- Performance is optimized with minimal re-renders
- Code is cleaner and more maintainable
