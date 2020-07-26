import React, {useState} from 'react';

import { GitTracker } from './components';

const App = () => {
  const [isShown, setIsShown] = useState(false);
  const [showIndex, setShowIndex] = useState(-99);

  return (
    <div className="app">
      <GitTracker isShown={isShown} setIsShown={setIsShown} showIndex={showIndex} setShowIndex={setShowIndex} />
    </div>
  );
}

export default App;