import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
//import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  //blogs: blogReducer,
  notification: notificationReducer,
  //user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

console.log(store.getState())

export default store