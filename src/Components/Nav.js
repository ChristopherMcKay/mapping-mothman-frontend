import React, { Component } from 'react'

export default class Nav extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid" style={{backgroundColor: 'black', color: 'white'}}>
                <div className="container">
                    <h1 className="display-4" style={{fontFamily: 'Butcherman'}}>Mapping  Mothman</h1>
                    <p className="lead">An online resource for Mothman-hunters, detectives, and people with too much time on their hands.</p>
                </div>
            </div>

        )
    }
}
