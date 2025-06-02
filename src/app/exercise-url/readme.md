# URL Query State Management

## Core Concepts

### URL State for Shareable Application State

- **Rule**: Store shareable and persistent state in URL query parameters
- **Anti-pattern**: Using `useState` for state that should be bookmarkable or shareable
- **Best practice**: Use query parameters for filters, search terms, pagination, and form data
- **Benefits**:
  - Shareable URLs that preserve application state
  - Browser back/forward navigation works naturally
  - Bookmarkable state for better UX
  - Eliminates "lost state" on page refresh
  - SEO benefits for search and filter states
  - Deep linking to specific application states

**Examples of state that belongs in URL**:

- Search filters and sorting options
- Pagination state
- Form input values
- Active tabs or views
- Selected items or categories
- Modal open/closed state

**When to use query params**: When the state affects what the user sees and should be shareable or persistent

### Type-Safe Query State with nuqs

- **Rule**: Use specialized libraries for type-safe URL state management
- **Anti-pattern**: Manual URL parsing and string manipulation
- **Best practice**: Use nuqs for automatic URL synchronization with type safety
- **Benefits**:
  - Automatic URL synchronization
  - Type-safe parsing and serialization
  - SSR-compatible
  - Optimistic updates
  - Built-in validation
  - Custom parsers for complex types

**Core API**:

```tsx
const [value, setValue] = useQueryState('paramName', options);
```

**Parser options**:

- `parse`: Function to convert string to your type
- `serialize`: Function to convert your type to string
- `defaultValue`: Default when param is missing
- `shallow`: Control Next.js router behavior

**Before (Anti-pattern):**

```tsx
function SearchForm() {
  const [query, setQuery] = useState(''); // ❌ Lost on refresh
  const [category, setCategory] = useState('all'); // ❌ Not shareable
  const [sortBy, setSortBy] = useState('date'); // ❌ No deep linking

  return (
    <form>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="books">Books</option>
      </select>
    </form>
  );
}
```

**After (Best practice):**

```tsx
function SearchForm() {
  // ✅ State persists in URL and is shareable
  const [query, setQuery] = useQueryState('q');
  const [category, setCategory] = useQueryState('category', {
    defaultValue: 'all',
  });
  const [sortBy, setSortBy] = useQueryState('sort', {
    parse: (value) => (value === 'price' ? 'price' : 'date'),
    serialize: (value) => value,
    defaultValue: 'date',
  });

  return (
    <form>
      <input value={query || ''} onChange={(e) => setQuery(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="books">Books</option>
      </select>
    </form>
  );
}
```

## Advanced Patterns

### Boolean Parameters

```tsx
const [isDirectOnly, setIsDirectOnly] = useQueryState('directOnly', {
  parse: (value) => value === 'true',
  serialize: (value) => value.toString(),
});
```

### Numeric Parameters

```tsx
const [page, setPage] = useQueryState('page', {
  parse: (value) => parseInt(value) || 1,
  serialize: (value) => value.toString(),
  defaultValue: 1,
});
```

### Complex Object Parameters

```tsx
const [filters, setFilters] = useQueryState('filters', {
  parse: (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return { price: 'all', rating: 0 };
    }
  },
  serialize: (value) => JSON.stringify(value),
  defaultValue: { price: 'all', rating: 0 },
});
```

## Common Pitfalls

### Forgetting Default Values

```tsx
// ❌ Can cause hydration mismatches
const [sort, setSort] = useQueryState('sort');

// ✅ Always provide defaults for SSR
const [sort, setSort] = useQueryState('sort', {
  defaultValue: 'date',
});
```

### Invalid Parse Functions

```tsx
// ❌ Can throw errors
const [count, setCount] = useQueryState('count', {
  parse: (value) => parseInt(value), // NaN for invalid input
});

// ✅ Handle edge cases
const [count, setCount] = useQueryState('count', {
  parse: (value) => parseInt(value) || 0,
  serialize: (value) => value.toString(),
  defaultValue: 0,
});
```

---

## Exercise: Convert Form State to URL Query Parameters

**Goal**: Transform local component state to persistent URL state

You have a flight booking application that currently uses `useState` for form data. The problem is that users lose their search criteria when they refresh the page or want to share a specific search with someone.

### Current Issues:

- Form data is lost on page refresh
- Users can't bookmark specific searches
- No shareable URLs for search results
- Back button doesn't preserve form state

### Your Task:

Convert the booking form to use `useQueryState` from the `nuqs` library so that:

1. **Form fields persist in URL**: All form inputs (destination, dates, passengers, etc.) should be stored as query parameters
2. **Shareable searches**: Users can copy the URL and share their search criteria
3. **Bookmark-friendly**: Specific searches can be bookmarked and restored
4. **Navigation-aware**: Browser back/forward buttons work naturally with form state

### Implementation Steps:

1. **Replace useState with useQueryState** for all form fields:

   - `destination` (string)
   - `departure` (date string)
   - `arrival` (date string)
   - `passengers` (number)
   - `isOneWay` (boolean)

2. **Add proper parsers** for each field type:

   - String fields can use default behavior
   - Number fields need parse/serialize functions
   - Boolean fields need proper conversion
   - Date fields need validation

3. **Test the implementation**:
   - Fill out the form and copy the URL
   - Refresh the page - form should retain values
   - Share the URL with someone else
   - Use browser back/forward buttons

### Success Criteria:

- All form state persists in URL query parameters
- URLs are shareable and bookmarkable
- Browser navigation works correctly
- No hydration mismatches in SSR
- Type safety is maintained throughout
