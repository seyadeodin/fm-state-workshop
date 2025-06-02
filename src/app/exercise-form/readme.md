# Form Handling with FormData and Server Actions

## Overview

This exercise demonstrates how to simplify form handling by using FormData and server actions instead of managing multiple `useState` hooks. This approach is particularly powerful in frameworks like Next.js and aligns with modern web standards.

## The Problem with Multiple useState

Traditional React form handling often looks like this:

```jsx
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});

// Multiple handlers
const handleFirstNameChange = (e) => setFirstName(e.target.value);
const handleLastNameChange = (e) => setLastName(e.target.value);
// ... more handlers
```

This becomes unwieldy with larger forms and requires careful state synchronization.

## FormData: A Web Standard Approach

FormData is a built-in web API that automatically captures form values:

```jsx
function handleSubmit(formData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  // All form data captured automatically
}
```

### Benefits of FormData:

- **Automatic data collection** - No manual state management
- **Web standard** - Works everywhere, not just React
- **File upload support** - Handles files naturally
- **Progressive enhancement** - Works without JavaScript
- **Less boilerplate** - No individual change handlers needed

## Server Actions in Next.js

Server actions allow you to define server-side functions that can be called directly from client components:

```jsx
// actions.ts
'use server';

export async function submitForm(formData: FormData) {
  // This runs on the server
  const name = formData.get('name');
  // Validate, save to database, etc.
}

// Component
<form action={submitForm}>
  <input name="name" />
  <button type="submit">Submit</button>
</form>;
```

### Benefits of Server Actions:

- **Type safety** - Full TypeScript support
- **No API routes needed** - Direct function calls
- **Automatic serialization** - FormData handled seamlessly
- **Progressive enhancement** - Works without JavaScript
- **Built-in loading states** - Framework handles pending states

## useActionState Hook

`useActionState` provides a React-friendly way to work with server actions:

```jsx
const [state, submitAction, isPending] = useActionState(
  serverAction,
  initialState
);

return (
  <form action={submitAction}>
    {/* isPending gives you loading state */}
    {/* state contains response/errors */}
  </form>
);
```

### useActionState Features:

- **Pending state** - Know when action is running
- **State management** - Handle success/error states
- **Automatic revalidation** - UI updates on completion
- **Error boundaries** - Graceful error handling

## Zod: Type-Safe Validation

Zod is a TypeScript-first schema validation library that pairs perfectly with FormData and server actions:

```jsx
// schema.ts
import { z } from 'zod';

export const travelFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  age: z.coerce.number().min(18, 'Must be 18 or older'),
});

// actions.ts
('use server');

export async function submitForm(formData: FormData) {
  const rawData = Object.fromEntries(formData);

  // Validate with Zod
  const result = travelFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      status: 'error',
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Now we have type-safe, validated data
  const validData = result.data;
  // Save to database...
}
```

### Benefits of Zod with FormData:

- **Type safety** - Automatic TypeScript types from schemas
- **Runtime validation** - Catches invalid data at runtime
- **Detailed error messages** - Field-specific validation errors
- **Coercion** - Automatically converts strings to numbers/dates
- **Reusable schemas** - Share validation logic between client/server
- **IntelliSense** - Full autocomplete for validated data

### Zod Integration Pattern:

```jsx
// Define schema once
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Use in server action
export async function createUser(formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // result.data is now typed and validated
  await saveUser(result.data);
}

// Use with useActionState
const [state, submitAction] = useActionState(createUser, initialState);
```

This creates a robust validation pipeline that ensures data integrity from form submission to database storage.

## When to Use FormData vs useState

### Use FormData when:

- ✅ Building traditional forms with submit buttons
- ✅ Working with server actions/mutations
- ✅ Need progressive enhancement
- ✅ Forms have many fields
- ✅ File uploads are involved
- ✅ Working with Next.js app router

### Use useState when:

- ✅ Building real-time/interactive UIs
- ✅ Need immediate validation on every keystroke
- ✅ Complex client-side logic between fields
- ✅ Building search/filter interfaces
- ✅ Need granular control over individual field updates
- ✅ Working with controlled components that need precise state

## The Exercise

Your task is to convert a form that uses multiple `useState` and `useEffect` calls to use FormData with server actions and `useActionState`.

**Current approach** (what you'd typically see):

- Individual state for each form field
- Manual change handlers
- Manual form submission with fetch
- Manual loading and error state management

**Target approach** (the solution in `page.tsx`):

- FormData captures all form values automatically
- Server action handles submission
- `useActionState` manages loading and error states
- Cleaner, more maintainable code

## Key Takeaways

1. **FormData is not a replacement for all state** - It's specifically great for forms
2. **Server actions simplify data mutations** - No need for separate API routes
3. **Progressive enhancement matters** - Forms work without JavaScript
4. **Choose the right tool** - useState for interactive UIs, FormData for traditional forms
5. **You don't have to convert everything** - Mix and match approaches as needed

This pattern is becoming increasingly popular in modern React applications, especially with frameworks like Next.js, Remix, and others that support server actions.
