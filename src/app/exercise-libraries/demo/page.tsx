"use client";
import { createAtom, createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";

export const store = createStore({
  context: {
    count: 0,
  },
  on: {
    increment: (context, e: { by: number }) => ({
      //type inference *_*
      ...context,
      count: context.count + e.by,
    }),
  },
});

// useEffecty
store.subscribe((context) => {
  console.log(context);
});

store.send({ type: "increment", by: 1 });
store.trigger.increment({ by: 2 });

const showCountAtom = createAtom(false);

export default function Page() {
  //only trigger re-renders when value changes
  const countGreaterThan10 = useSelector(store, ({ context }) =>
    context.count < 10 ? 0 : context.count
  );
  const showCountValue = useSelector(showCountAtom, (value) => value);

  showCountAtom.subscribe((atom) => console.log(atom));
  //showcountAtom.get() is for non-ui use

  return (
    <div>
      <button onClick={() => showCountAtom.set(!showCountAtom.get())}>
        Mostrar contador
      </button>
      {showCountValue && (
        <div>
          {countGreaterThan10}
          <button onClick={() => store.trigger.increment({ by: 2 })}>
            Increment
          </button>
        </div>
      )}
    </div>
  );
}
