# Exercise 3: State Management with Context and Finite State Machines

In this exercise, you'll refactor a flight booking application to use React Context for state management and implement a finite state machine pattern. This will help you understand how to manage complex state in a more predictable and maintainable way.

## Learning Objectives

1. **React Context**

   - Learn how to share state between components without prop drilling
   - Create and use a custom context hook
   - Understand when to use Context vs local state

2. **Finite State Machines**

   - Replace boolean flags with explicit states
   - Make state transitions more predictable
   - Ensure each state has exactly the data it needs
   - Prevent impossible states

3. **Type Safety**
   - Use TypeScript discriminated unions for state
   - Ensure type-safe state transitions
   - Leverage TypeScript for better developer experience

## Exercise Steps

1. Create a `BookingContext` and `BookingProvider` to share state between components
2. Define a proper state type using discriminated unions:
   ```typescript
   type State =
     | { status: 'idle'; formData: FormData }
     | { status: 'searching'; formData: FormData }
     | { status: 'error'; formData: FormData; error: string }
     | { status: 'results'; formData: FormData; flightOptions: FlightOption[] };
   ```
3. Implement a reducer with clear state transitions
4. Create a custom hook `useBooking` for easy context access
5. Refactor components to use the shared state
6. Add proper state guards in components

## Benefits of This Approach

1. **Predictable State**

   - Each state is explicit and well-defined
   - Impossible states are prevented by TypeScript
   - State transitions are clear and type-safe

2. **Better Developer Experience**

   - TypeScript provides better autocomplete and error checking
   - State shape is clearly documented
   - Easier to understand what data is available in each state

3. **Improved Maintainability**

   - No more boolean flags that could get out of sync
   - Clearer component rendering logic
   - Better error handling
   - Each state has exactly the data it needs

4. **Better User Experience**
   - Loading states are handled consistently
   - Error states are properly managed
   - UI updates are more predictable

## Tips

- Use TypeScript's discriminated unions to ensure type safety
- Keep state transitions simple and predictable
- Use state guards in components to prevent rendering in invalid states
- Consider what data each state needs and include only that data
- Use the custom hook to access context instead of using `useContext` directly
