import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    render() {
        if(!this.props.show){
            return null;
        }
      return <div class="modal" id="modal">
            <h2>Modal Window</h2>
            <div class="content">{this.props.children}</div>
            <div class="actions">
                <button class="toggle-button" onClick={this.onClose}>
                Ok
                </button>
            </div>
        </div>;
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};