import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
    test('return new state with action NEW_BLOG' () => {
        const state = []
        const action = {
            type: 'NEW_BLOG',
            data: {
                title: 'app in redux store',
                author: 'Redux',
                id: 1
            }
        }

        deepFreeze(state)
        const newState = blogReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})