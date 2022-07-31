import PropTypes from 'prop-types'
import Button from './Button'
import App from '../App'

const Header = ({title, onAdd, showAdd}) => {
    
   
    return (
        <header className='header'>
            <h1 >{title}</h1>
            <Button  color= {showAdd ? 'blue' : 'purple'} text ={showAdd ? 'close' : 'Add'} onClick = {onAdd}/>
             
        </header>
    )
}


Header.defaultProps ={
    title : 'TASK-TRACKER',
}

Header.propTypes = {
    title : PropTypes.string,
    
}

// const HeadingStyle = {
//      color: 'orange',
//      backgroundColor:'grey'
// }

export default Header
