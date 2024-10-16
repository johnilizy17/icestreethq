enum packageItemActionKind {
    UPDATE_CURRENT_ID,
    INCREMENT_INDEX,
    DECREMENT_INDEX
}

interface packageItemReducerAction {
    type: packageItemActionKind,
    payload?: {
        currentId: idType
    }
}


export function packageItemsReducer(state: packageData, action: packageItemReducerAction): packageData {
    let newIndex
    switch (action.type) {
        case packageItemActionKind.UPDATE_CURRENT_ID:
            let _updated_id = action.payload?.currentId ?? 1
            let _index = state.data.findIndex((packageItem) => packageItem.id === _updated_id)

            return {
                data: state.data,
                currentId: _updated_id,
                currentIndex: _index
            }

        case packageItemActionKind.INCREMENT_INDEX:
            newIndex = state.currentIndex + 1 >= state.data.length ? state.data.length - 1 : state.currentIndex + 1
            return {
                data: state.data,
                currentId: state.data[newIndex].id ?? 1,
                currentIndex: newIndex
            }
        case packageItemActionKind.DECREMENT_INDEX:
            newIndex = state.currentIndex <= 0 ? 0 : state.currentIndex - 1

            return {
                data: state.data,
                currentId: state.data[newIndex].id ?? 1,
                currentIndex: newIndex
            }


        default:
            return state
    }
}