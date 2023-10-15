import { Route, Routes } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <div>
      <Routes>
        {router.map(route => {
          const Page = route.component;
          return <Route key={route.path} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
