// 목록의 이름을 표시하고
// 그 안에 들어 있는 모든 Card 컴포넌트를 렌더링
// List 컴포넌트는 속성을 통해 cards 배열을 받은 다음
// 제목이나 설명과 같은 개별 정보를 다시 속성을 통해 Card 컴포넌트로 전달

import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
  render() {

    let cards = this.props.cards.map((card) => {
      return <Card key={card.id} taskCallbacks={this.props.taskCallbacks} {...card} />
    });

    return(
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    )
  }
}

List.propTypes = {
  title: React.PropTypes.string.isRequired,
  cards : React.PropTypes.arrayOf(React.PropTypes.object),
  taskCallbacks: React.PropTypes.object,
};
export default List;
