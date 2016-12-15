import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import Icon from '../../01_atoms/icon/Icon.jsx';

/**
 * React component
 * 
 * @class Dashboard
 * @classdesc 02_molecules/dashboard/Dashboard
 *
 * @requires 01_atoms/icon/Icon
 *
 * @prop {boolean}  editMode         Edit mode enabled/disabled
 * @prop {boolean}  isActive         Active dashboard
 * @prop {function} onDashboardClick Dashboard click callback
 * @prop {number}   id
 * @prop {string}   name
 */
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.onDashboardClick = this.onDashboardClick.bind(this);
    }

    onDashboardClick() {
        this.props.onDashboardClick(this.props.id);
    }

    render() {
        const PROPS = this.props;
        const { isDragging, connectDragSource, connectDropTarget, connectDragPreview } = PROPS;
        const ACTIVE_CLASS = PROPS.isActive ? ' m-dashboard--active' : '';
        const EDIT_MODE_CLASS = PROPS.editMode ? ' m-dashboard--edit-mode' : '';
        const CLASS = 'm-dashboard' + ACTIVE_CLASS + EDIT_MODE_CLASS;
        const OPACITY = isDragging ? 0 : 1;

        // console.log(PROPS);

        return connectDragPreview(connectDropTarget(
            <li style={ {OPACITY} } className={ CLASS }>
                <span className="m-dashboard__title" title={ PROPS.name } onClick={ this.onDashboardClick }>{ PROPS.name }</span>
                <Icon icon="edit" className="m-dashboard__icon m-dashboard__icon--edit-mode a-icon--light" title="Edit dashboard" />
                <Icon icon="delete" className="m-dashboard__icon m-dashboard__icon--edit-mode a-icon--light" title="Delete dashboard" />
                { connectDragSource(<div>
                    <Icon icon="drag" className="m-dashboard__icon m-dashboard__icon--edit-mode m-dashboard__icon--drag a-icon--light" title="Drag dashboard" />
                </div>) }
            </li>
        ));
    }
}

Dashboard.propTypes = {
    'id': PropTypes.number.isRequired,
    'name': PropTypes.string.isRequired,
    'onDashboardClick': PropTypes.func.isRequired,
    'isActive': PropTypes.bool.isRequired,
    'editMode': PropTypes.bool.isRequired,
    'connectDragSource': PropTypes.func.isRequired,
    'connectDropTarget': PropTypes.func.isRequired,
    'connectDragPreview': PropTypes.func.isRequired,
    'index': PropTypes.number.isRequired,
    'isDragging': PropTypes.bool.isRequired,
    'moveDashboard': PropTypes.func.isRequired
};

const cardSource = {
    beginDrag(props) {
        return {
            'id': props.id,
            'index': props.index
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveDashboard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

function collect1(connect) {
    return {
        'connectDropTarget': connect.dropTarget()
    };
}

function collect2(connect, monitor) {
    return {
        'connectDragSource': connect.dragSource(),
        'connectDragPreview': connect.dragPreview(),
        'isDragging': monitor.isDragging()
    };
}

export default flow(
    DragSource('dashboard', cardSource, collect2),
    DropTarget('dashboard', cardTarget, collect1)
)(Dashboard);
