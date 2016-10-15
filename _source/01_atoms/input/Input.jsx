import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

/**
 * React component
 * @class 01_atoms/input/Input
 *
 * @prop {string}  [className]   Additional class name
 * @prop {boolean} [focus]       Autofocus input field
 * @prop {string}  [placeholder] Input placeholder
 * @prop {string}  [type]        Input type
 */
export default class Input extends Component {
    componentDidUpdate() {
        if (this.props.focus) {
            findDOMNode(this.refs.inputField).focus();
        }
    }

    render() {
        const PROPS = this.props;
        const CLASS = 'a-input ' + PROPS.className;
        const INPUT_PROPS = {
            'className': 'a-input__field',
            'placeholder': PROPS.placeholder,
            'type': PROPS.type
        };

        return (
            <div className={ CLASS }>
                <input ref="inputField" { ...INPUT_PROPS } />
            </div>
        );
    }
}

Input.propTypes = {
    'className': PropTypes.string,
    'focus': PropTypes.bool,
    'placeholder': PropTypes.string,
    'type': PropTypes.string
};

Input.defaultProps = {
    'className': '',
    'focus': false,
    'placeholder': '',
    'type': 'text'
};