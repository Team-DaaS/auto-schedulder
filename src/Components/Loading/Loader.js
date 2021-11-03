import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Loading.css'

const Loading = ({ loading }) => {
    if (!loading) return null
    return (
        <div className="load-wrapp">
            <div className="load-3">
                <div className="line line-logo"></div>
                <div className="line line-logo"></div>
                <div className="line line-logo"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        loading: reduxState.loading
    }
};
export default connect(mapStateToProps)(Loading);
