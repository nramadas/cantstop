interface Props {
  class?: string;
  children: string | number;
}

export function ColumnLabel(props: Props) {
  return (
    <div class="aspect-square flex items-center justify-center text-neutral-400">
      {props.children}
    </div>
  );
}
