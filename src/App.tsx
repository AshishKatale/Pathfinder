import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Actions, ActionTypes } from './grid/walls';
import { Dispatch } from 'redux';
import useGridDimensions from './hooks/useGridDimensions';
import Navbar from './components/Navbar';

function App() {

  const dispatch = useDispatch<Dispatch<Actions>>();
  const [gridWidth, gridHeight] = useGridDimensions();
  dispatch({ type: ActionTypes.RESIZE_GRID, payload: { size: gridWidth * gridHeight } });

  useEffect(() => {
    let id: NodeJS.Timeout;
    let reload = () => window.location.reload();
    if (window.navigator.maxTouchPoints > 0) {
      window.addEventListener("orientationchange", () => {
        clearTimeout(id);
        id = setTimeout(reload, 100);
      });
      return () => window.removeEventListener("orientationchange", reload);
    } else {
      window.addEventListener("resize", () => {
        clearTimeout(id);
        id = setTimeout(reload, 100);
      });
      return () => window.removeEventListener("resize", reload);
    }
  }, [dispatch]);

  return (
    <div className="container">
      <Navbar />
    </div>
  );
}

export default App;