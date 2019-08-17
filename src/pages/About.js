import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setHello } from '../store/actions';

const About = ({ hello, setHello }) => {
    console.log("hello: ",hello, "setHello: ", setHello)
    return(
        <div>
            <h1>About</h1> 
            <Link to='/' >Home</Link>
            <br />
            { hello }
            <br />
            <button type="button" onClick={() => setHello(++hello)}>click number</button>    
        </div>
    ) 
}

const mapStateToProps = state => ({   // обращения к state, чтобы его можно было видеть в props
    hello: state.hello
})

const mapDispatchToProps = { setHello }  // импортируем  action

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(About);