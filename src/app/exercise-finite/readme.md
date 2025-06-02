# Declarative States

## Six Principles

### Events are the source of truth

- Events capture intent and history, while state is just a snapshot derived from events.
- Command query separation is a good idea (commands)

### Pure functions for app logic

- Pure functions are the easiest thing to test. All app logic should be represented in pure functions.
- Pure functions give you determinism, testability, and composition.
- Command query separation is a good idea (queries are pure functions)

### Framework-agnostic architecture

- Write code as if you're going to change frameworks, or even languages. Even if you don't, this socket/port type of architecture keeps your code well-organized.
- The "ports and adapters" approach creates maintainable systems that can evolve independently of framework choices.

### Normalize state

- Deep nesting creates complex dependencies and update patterns. Normalized data is easier to manage and update.
- Normalize state to avoid redundancy and ensure consistency.
- Normalize state to make it easier to update and query.

### State machines for modeling

- Explicit state machines make impossible states impossible and transitions clear.

### Declarative side effects

- This separates what should happen from how/when it happens - crucial for maintainable code.

## Exercise
