# Finite State Machines & Declarative State Management

## Core Principles

### Events are the source of truth

- **Rule**: Capture user intent and business logic through events, not direct state mutations
- **Anti-pattern**: Directly setting state values without expressing the underlying reason
- **Best practice**: Events capture intent and history, while state is just a snapshot derived from events
- **Benefits**:
  - Clear audit trail of what happened and why
  - Easier debugging and troubleshooting
  - Better separation between "what" and "how"
  - Enables time-travel debugging and replay functionality

### Pure functions for app logic

- **Rule**: All business logic should be represented in pure functions
- **Anti-pattern**: Mixing side effects with state updates
- **Best practice**: Separate pure state transitions from side effects
- **Benefits**:
  - Deterministic behavior - same input always produces same output
  - Easy to test in isolation
  - Composable and reusable logic
  - Better performance through memoization

### Framework-agnostic architecture

- **Rule**: Write code as if you're going to change frameworks or languages
- **Anti-pattern**: Tightly coupling business logic to React-specific patterns
- **Best practice**: Use the "ports and adapters" approach to separate concerns
- **Benefits**:
  - Maintainable systems that evolve independently of framework choices
  - Easier migration between frameworks
  - Better testability of core logic
  - More organized and modular codebase

### Normalize state

- **Rule**: Flatten data structures and use IDs for relationships
- **Anti-pattern**: Deep nesting creates complex dependencies and update patterns
- **Best practice**: Store entities in separate collections with ID references
- **Benefits**:
  - Easier to manage and update data
  - Avoid redundancy and ensure consistency
  - Better performance with O(1) lookups
  - Simpler update logic

### State machines for modeling

- **Rule**: Make impossible states impossible through explicit state modeling
- **Anti-pattern**: Using multiple boolean flags that can create invalid combinations
- **Best practice**: Use state machines to define valid states and transitions
- **Benefits**:
  - Prevents impossible states at compile time
  - Makes state transitions clear and predictable
  - Better error handling and edge case management
  - Self-documenting state logic

### Declarative side effects

- **Rule**: Separate what should happen from how/when it happens
- **Anti-pattern**: Mixing imperative side effects with state management
- **Best practice**: Declare side effects based on state, let the framework handle execution
- **Benefits**:
  - Crucial for maintainable code
  - Easier testing and debugging
  - Better separation of concerns
  - More predictable behavior

---

## Exercise: Apply Declarative State Principles

**Goal**: Refactor an existing component to use declarative state management principles

You'll take a component that uses imperative state management and apply the six principles above to make it more maintainable, testable, and predictable.

### Your Task:

1. **Identify anti-patterns** in the existing code
2. **Extract business logic** into pure functions
3. **Replace boolean flags** with explicit state machines
4. **Normalize complex data** structures
5. **Implement event-driven** state updates
6. **Separate side effects** from state logic

### Success Criteria:

- State transitions are explicit and type-safe
- Business logic is extracted into testable pure functions
- Side effects are declared based on state
- Code is more readable and maintainable
- Impossible states are prevented by design
