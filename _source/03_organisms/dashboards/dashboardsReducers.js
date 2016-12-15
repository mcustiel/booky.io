import { CHANGE_DASHBOARD, UPDATE_OFFSET, MOVE_DASHBOARD } from './dashboardsActions';

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
            const dragItem = state.items[action.dragIndex],
                newItems = state.items;

            newItems.splice(action.dragIndex, 1); // removing what you are dragging
            newItems.splice(action.hoverIndex, 0, dragItem); // inserting it into hoverIndex

            return Object.assign({}, state, {
                'items': newItems
            });

        default:
            return state;
    }
};

export default dashboards;
