// 데이터를 속성을 통해 받고
// 상태를 필터링해
// List 컴포넌트 세 개 (ToDo, In-Progress, Done)를 만드는 역할

import React, { Component } from 'react';
import List from './List';

class KanbanBoard extends Component {
  render() {
    return(
      <div className="app">
        <List id='todo' title='To Do' cards={this.props.cards.filter((card) => card.status === 'todo')} />
        <List id='in-progress' title='In Progress' cards={this.props.cards.filter((card) => card.status === 'in-progress')} />
        <List id='done' title='Done' cards={this.props.cards.filter((card) => card.status === 'done')} />
      </div>
    )
  }
}

export default KanbanBoard;
