import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants'
import './DragDrop.css';

// 주목 사항
// 1. canDrop, isOver, connectDropTarget 속성에 대한 간소한 접근을 위해 구조분해 할당을 이용
//    따라서, this.props.canDrop 대신 canDrop만 입력해도 된다.
// 2. 배경색은 사용자가 항목을 드래그하고 있는지 여부와 장바구니 위로 드래그하고 있는지 여부에 따라 달라짐
// 3. 기본적으로 텍스트는 'Drag here to order!'가 표시되지만
//     사용자가 항목을 장바구니 위로 드래그하면 'Hummm, snack!'이 표시
// 4. 이전과 달리 div를 반환하는 대신 div를 connectDropTarget에 래핑함
//

// ShoppingCart 드래그 앤드 드롭 사양
// 드롭 대상 사양을 구현하는 일반 객체
//
// - DropTarget 메서드(모두 선택적)
// - drop: 호환되는 항목이 드롭되면 호출
// - hover: 항목으로 컴포넌트를 가리키면 호출
// - canDrop: 드롭 대상이 항목을 수락할 수 있는지 여부를 지정하는데 이용
const ShoppingCartSpec = {
  drop (){
    return {name: 'ShoppingCart'};
  }
};

// 콜렉팅 함수
//
// - connect: DropTargetConnector의 인스턴스
// 드롭 대상 역할을 DOM 노드에 할당 하는 데 이용
//
// - monitor: DropTargetMonitor의 인스턴스
// 리액트 DnD에서 속성으로 상태를 연결하는 데 이용
// 상태르 ㄹ얻는 데 이용할 수 있는 함수에는 canDrop(), isOver(), didDrop()이 있음

let collect = (connect, monitor)=> {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

class ShoppingCart extends Component {
  render() {
    const {canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#FFFFFF';
    if (isActive) {
        backgroundColor = '#F7F7BD';
    } else if (canDrop) {
        backgroundColor = '#F7F7F7';
    }

    const style = {
      backgroundColor: backgroundColor,
    }

    return(
      <div className="shopping-cart" style={style}>
          {isActive ?
            'Hummmm, snack!' : 'Drag here to order!'
          }
      </div>
    )
  }
}

ShoppingCart.propTypes = {
  connectDropTarget: React.PropTypes.func.isRequired,
  isOver: React.PropTypes.bool.isRequired,
  canDrop: React.PropTypes.bool.isRequired,
}

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
