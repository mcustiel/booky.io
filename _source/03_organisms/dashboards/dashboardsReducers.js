import { CHANGE_DASHBOARD, UPDATE_OFFSET, MOVE_DASHBOARD } from './dashboardsActions';

function createNewItemsArray(state, action) {
    const stateCopy = JSON.parse(JSON.stringify(state));
    const dragItem = stateCopy.items[action.dragIndex];
    const newItems = stateCopy.items;

    newItems.splice(action.dragIndex, 1); // Removing the dragged item
    newItems.splice(action.hoverIndex, 0, dragItem); // Inserting the dragged item

    return newItems;
}

const dashboards = (state = {}, action) => {

    switch (action.type) {
        case CHANGE_DASHBOARD:
            return Object.assign({}, state, {
                'active': action.id
            });

        case UPDATE_OFFSET:
            return Object.assign({}, state, {
                'offset': action.offset
            });

        case MOVE_DASHBOARD:
            return Object.assign({}, state, {
                'items': createNewItemsArray(state, action)
            });

        default:
            return state;
    }
};

export default dashboards;
