import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { plusNumber } from '../store/actions';
import { minusNumber } from '../store/actions';

const About = ({ numbers, plusNumber, minusNumber }) => {
    return(
        <div>
            <h1>About</h1> 
            <Link to='/' >Home</Link>
            <br />
            { numbers }
            <br />
            <button type="button" onClick={() => plusNumber()}>click number + 1</button>    
            <button type="button" onClick={() => minusNumber()}>click number - 1</button>    
        </div>
    ) 
}

const mapStateToProps = state => ({   // обращения к state, чтобы его можно было видеть в props
    numbers: state.numbers
})

const mapDispatchToProps = { plusNumber, minusNumber }  // импортируем  action

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(About);