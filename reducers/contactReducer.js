import {types} from '../actions/contactActions';

const initialState = {
  contacts: [
    { id: 1, name: 'Sagiv Of', pic: 'https://randomuser.me/api/portraits/men/4.jpg', online: true},
    { id: 2, name: 'Dudu Shushan', pic: 'https://randomuser.me/api/portraits/men/1.jpg', online: false},
    { id: 3, name: 'Ron Yaron', pic: 'https://randomuser.me/api/portraits/men/2.jpg', online: true},
    { id: 4, name: 'Adur Zori', pic: 'https://randomuser.me/api/portraits/men/3.jpg', online: false},
    { id: 5, name: 'Nikol Kidman', pic: 'https://randomuser.me/api/portraits/men/5.jpg', online: true},
    { id: 6, name: 'Mark johnson', pic: 'https://randomuser.me/api/portraits/men/6.jpg', online: false},

    { id: 11, name: 'Reshet Keshet', pic: 'https://randomuser.me/api/portraits/men/4.jpg', online: false},
    { id: 21, name: 'Dr. Yehoshafat Rozentwigure Koren', pic: 'https://randomuser.me/api/portraits/men/1.jpg', online: true},
    { id: 31, name: 'Mihse Manoa', pic: 'https://randomuser.me/api/portraits/men/2.jpg', online: true},
    { id: 41, name: 'Ilay Rusi', pic: 'https://randomuser.me/api/portraits/men/3.jpg', online: false},
    { id: 51, name: 'Janet Goldshtain', pic: 'https://randomuser.me/api/portraits/men/5.jpg', online: false},
    { id: 61, name: 'Yaron London', pic: 'https://randomuser.me/api/portraits/men/6.jpg', online: true},
  ],
  refreshing: false,
};

export default function feedReducer(state = initialState, action = {}) {
    console.log(action);
  switch (action.type) {
    case types.REFRESHING:
      return {
        ... state,
        refreshing: true
      };
    case types.ON_DATA:
      return {
        ...state,
        refreshing: false,
        contacts: action.payload,
      };
    case types.ADD_CONTACT:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case types.CONTACT_CALL_PRESS:
      console.log('todo: CONTACT_CALL_PRESS', action.payload);
      return state;
    default:
      return state;
  }
}
