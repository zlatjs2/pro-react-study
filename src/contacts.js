import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import update from 'react-addons-update';

import registerServiceWorker from './registerServiceWorker';

class ContactsAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
    };
  }

  // 초기 렌더링을 수행한 직후 한 번 호출
  // 이 시점에서는 컴포넌트에 대한 DOM 표현이 생성되며
  // 이를 데이터 가져오기 등의 작업에 이용할 수 있다.
  componentDidMount() {
    fetch('./contacts.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ contacts: responseData });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render(){

    let originalTicket = {
      compaly: 'Dalta',
      number: '009009',
      arribal: {
        time: '10200-92:00',
        day: '20190809'
      },
      ticket: 'kjlkjalk'
    }

    // let newOriginalTicket = update(originalTicket, {
    //   codeshare: {
    //     0: {$set: {compaly: '1111'}}
    //   }
    // });

    console.log(originalTicket);

    return (
      <ContactsApp contacts={this.state.contacts} />
    );
  }
}

// 1. ContactsApp: 주 컴포넌트이며, SearchBar와 ContactList를 렌더링
//    SearchBar: 사용자가 연락처를 필터링할 수 있게 입력 필드를 표시
//    ContactList: 데이터를 대상으로 반복해 여러 ContactItem을 생성
//      ContactItem: 연락처 데이터를 표시
// 2. filterText 상태와 handleUserInput 콜백을 속성을 통해 전달한다.
class ContactsApp extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
    }
  }

  handleUserInput(searchTerm) {
    this.setState({ filterText: searchTerm });
  }

  render() {
    return(
      <div>
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput.bind(this)} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText} />
      </div>
    )
  }
}
ContactsApp.propTypes = {
  contacts: React.PropTypes.arrayOf(React.PropTypes.object),
}


// 부모에서 속성을 통해 filterText(문자열)와
// onUserInput(콜백 함수)을 받는 순수 컴포넌트
class SearchBar extends Component {
  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {
    return(
      <div>
        <input
          type="search"
          placehoder="search.."
          value={this.props.filterText}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}
SearchBar.propTypes = {
  filterText: React.PropTypes.string.isRequired,
  onUserInput: React.PropTypes.func.isRequired,
}

class ContactList extends Component {
  render() {

    let filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    )

    return(
      <ul>
        {filteredContacts.map(
          (contact) => <ContactItem key={contact.email}
                                    name={contact.name}
                                    email={contact.email} />
        )}
      </ul>
    )
  }
}

// 속성을 통해 contacts와 filterText를 받는
// 순수 컴포넌트이며, 연락처를 필터링한 후 이를
// 표시하는 역할을 한다.
// 순수 컴포넌트라고 하는 이유는,
// 동일한 contacts와 filterText 속성을 전달하면
// 동일한 내용을 표시하기 때문
ContactList.propTypes = {
  contacts: React.PropTypes.arrayOf(React.PropTypes.object),
}

class ContactItem extends Component {
  render() {
    return(
      <li>{this.props.name} - {this.props.email}</li>
    )
  }
}
ContactItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
}

ReactDOM.render(<ContactsAppContainer />, document.getElementById('root'));
registerServiceWorker();
