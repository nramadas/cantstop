import { twMerge } from 'tailwind-merge';

interface Props {
  class?: string;
  children: string;
}

export function Root(props: Props) {
  return (
    <div
      class={twMerge(
        'bg-neutral-900',
        'font-bold',
        'px-2',
        'py-1',
        'text-left',
        'text-neutral-300',
        'text-[8px]',
        'uppercase',
        'w-full',
        props.class,
      )}
    >
      {props.children}
    </div>
  );
}
