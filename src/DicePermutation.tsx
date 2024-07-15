// import { twMerge } from 'tailwind-merge';

import { twMerge } from 'tailwind-merge';

import { Game } from './game';

interface Props {
  class?: string;
  disabled?: boolean;
  permutation: [number, number];
  disallowedRolls: Game['disallowedRolls'];
  onSelect?(selected: [number] | [number, number]): void;
}

export function Root(props: Props) {
  const bothDisallowed =
    !!props.disabled ||
    (props.disallowedRolls[props.permutation[0]] === true &&
      props.disallowedRolls[props.permutation[1]] === true);

  const bothAllowed =
    !props.disallowedRolls[props.permutation[0]] &&
    !props.disallowedRolls[props.permutation[1]];

  if (bothDisallowed) {
    return (
      <BothDisallowed class={props.class} permutation={props.permutation} />
    );
  } else if (bothAllowed) {
    return (
      <BothAllowed
        class={props.class}
        permutation={props.permutation}
        onSelect={() => props.onSelect?.(props.permutation)}
      />
    );
  } else {
    return (
      <OneAllowed
        allowed={[
          !props.disallowedRolls[props.permutation[0]],
          !props.disallowedRolls[props.permutation[1]],
        ]}
        class={props.class}
        permutation={props.permutation}
        onSelect={props.onSelect}
      />
    );
  }
}

interface BothProps {
  class?: string;
  permutation: [number, number];
  onSelect?(): void;
}

export function BothDisallowed(props: BothProps) {
  return (
    <div
      class={twMerge(
        'aspect-[4/1]',
        'bg-neutral-900',
        'cursor-not-allowed',
        'grid-cols-2',
        'grid',
        'text-neutral-600',
        'w-full',
        props.class,
      )}
    >
      <div class="grid place-items-center">{props.permutation[0]}</div>
      <div class="grid place-items-center">{props.permutation[1]}</div>
    </div>
  );
}

interface BothProps {
  class?: string;
  permutation: [number, number];
}

export function BothAllowed(props: BothProps) {
  return (
    <button
      class={twMerge(
        'aspect-[4/1]',
        'bg-neutral-300',
        'grid-cols-2',
        'grid',
        'outline-none',
        'text-neutral-950',
        'transition-colors',
        'w-full',
        'active:bg-neutral-400',
        'focus:bg-neutral-200',
        'hover:bg-neutral-200',
        props.class,
      )}
      onClick={props.onSelect}
    >
      <div class="grid place-items-center">{props.permutation[0]}</div>
      <div class="grid place-items-center">{props.permutation[1]}</div>
    </button>
  );
}

interface OneProps {
  class?: string;
  permutation: [number, number];
  allowed: [boolean, boolean];
  onSelect?(selected: [number]): void;
}

export function OneAllowed(props: OneProps) {
  return (
    <div
      class={twMerge(
        'aspect-[4/1]',
        'gap-x-[1px]',
        'grid-cols-2',
        'grid',
        'w-full',
        props.class,
      )}
    >
      {props.allowed[0] ? (
        <AllowedItemSingle
          onSelect={() => props.onSelect?.([props.permutation[0]])}
        >
          {props.permutation[0]}
        </AllowedItemSingle>
      ) : (
        <DisAllowedSingle>{props.permutation[0]}</DisAllowedSingle>
      )}
      {props.allowed[1] ? (
        <AllowedItemSingle
          onSelect={() => props.onSelect?.([props.permutation[1]])}
        >
          {props.permutation[1]}
        </AllowedItemSingle>
      ) : (
        <DisAllowedSingle>{props.permutation[1]}</DisAllowedSingle>
      )}
    </div>
  );
}

interface SingleProps {
  class?: string;
  children: string | number;
  onSelect?(): void;
}

export function AllowedItemSingle(props: SingleProps) {
  return (
    <button
      class={twMerge(
        'grid',
        'place-items-center',
        'bg-neutral-300',
        'outline-none',
        'text-neutral-950',
        'transition-colors',
        'active:bg-neutral-400',
        'focus:bg-neutral-200',
        'hover:bg-neutral-200',
        props.class,
      )}
      onClick={props.onSelect}
    >
      {props.children}
    </button>
  );
}

export function DisAllowedSingle(props: SingleProps) {
  return (
    <div
      class={twMerge(
        'grid',
        'bg-neutral-900',
        'cursor-not-allowed',
        'place-items-center',
        'text-neutral-600',
        props.class,
      )}
    >
      {props.children}
    </div>
  );
}
