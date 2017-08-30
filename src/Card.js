// 사용자 상호작용이 주로 수행되는 컴포넌트
// 제목, 설명, 체크리스트가 포함

// 토글되는 카드
// 컴포넌트가 초기 상태를 갖게 하려면 클래스 생성자에서 상태를 설정해야 함
// showDetails라는 새로운 키를 컴포넌트의 상태로 정의하는 생성자 함수를 추가해본다.
// render 메서드의 jsx를 수정해 showDetails 상태 속성이 true 일 때만 카드 세부 사항을 렌더링 함
// cardDetails라는 로컬 변수를 선언하고,
// showDetails 상태가 true 일때만 cardDetails에 실제 데이터를 할당함

import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {

    let cardDetails;

    if(this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          {this.props.description}
          <CheckList cardId={this.props.Id} tasks={this.props.tasks} />
        </div>
      )
    }

    let sidecolor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color,
    }

    return(
      <div className="card">
        <div style={sidecolor}/>
        <div
          className={this.state.showDetails ? 'card__title card__title--is-open' : 'card__title'}
          onClick={this.toggleDetails.bind(this)}>
          {this.props.title}</div>
        <div className="card__details">
          {this.props.description}
          {cardDetails}
        </div>
      </div>
    )
  }
}

export default Card;
