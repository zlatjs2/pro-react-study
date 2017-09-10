import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<KanbanBoardContainer />, document.getElementById('root'));
registerServiceWorker();
