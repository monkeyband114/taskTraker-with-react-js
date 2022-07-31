import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [remider, setRemider] = useState(false)

    const  onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please Input Task')
            return
        }
        onAdd({text, day, remider})

        setText('')
        setDay('')
        setRemider(false)
    }
    return (
        <form className= 'add-form' onSubmit={onSubmit} >
            <div className="form-control" >
                <label>Task</label>
                <input type = 'text' placeholder="Add task" value={text} onChange = {(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Date & time</label>
                <input type = 'text' placeholder="Add Date & Time" value={day} onChange = {(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type = 'checkbox' checked = {remider} value={remider} onChange = {(e) => setRemider(e.currentTarget.checked)} />
            </div>
            <input type = 'submit'  value = 'Save Task' className="btn btn-block" />

        </form>
    )
}

export default AddTask
