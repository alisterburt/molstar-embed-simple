import {useEffect, useRef} from 'react'
import {EmbeddableMolStar} from './EmbeddableMolStar'
import './App.css'

function App() {
  return <>
    <EmbeddableMolStarView/>
  </>
}

const embeddableMolStar = new EmbeddableMolStar();
embeddableMolStar.init();

function EmbeddableMolStarView() {
  const parent = useRef<any>();

  useEffect(() => {
    async function mount() {
      await embeddableMolStar.initialized;
      embeddableMolStar.mount(parent.current);
    }

    mount();
    return () => {
      embeddableMolStar.unmount();
    };
  }, []);

  return (
    <div ref={parent} style={{position: 'absolute', inset: 0, bottom: 0}}/>
  )
}

export default App
