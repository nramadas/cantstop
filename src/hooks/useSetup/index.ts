import { useCallback, useState } from 'react';

export enum Stage {
  Choose,
  Join,
  Name,
  Play,
}

interface State {
  stage: Stage;
  name?: string;
  gameId?: string;
}

export default function useSetup() {
  const [state, setState] = useState<State>({
    stage: Stage.Name,
  });

  const addName = useCallback((name: string) => {
    setState(state => ({
      ...state,
      name,
      stage: Stage.Choose,
    }));
  }, []);

  const choose = useCallback((join: boolean) => {
    setState(state =>
      join
        ? {
            ...state,
            stage: Stage.Join,
          }
        : {
            ...state,
            gameId: 'asdf',
            stage: Stage.Play,
          },
    );
  }, []);

  const join = useCallback((gameId: string) => {
    setState(state => ({
      ...state,
      gameId,
      stage: Stage.Play,
    }));
  }, []);

  return [state, addName, choose, join] as [
    State,
    typeof addName,
    typeof choose,
    typeof join,
  ];
}
