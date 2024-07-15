import { CSSProperties } from 'preact/compat';
import { twMerge } from 'tailwind-merge';

export interface Tile {}

interface Props {
  class?: string;
  style?: CSSProperties;
  tile: Tile;
}

export function Root(props: Props) {
  return (
    <div
      class={twMerge('border-neutral-700', 'border', 'm-[-0.5px]', props.class)}
      style={props.style}
    ></div>
  );
}
