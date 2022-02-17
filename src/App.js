import React from 'react'
import './App.css';
import {useState} from 'react'
import {Button, TextField } from '@material-ui/core'

function App() {
  const gotItem = JSON.parse(localStorage.getItem('jobs'))
  const [job,setJob] = useState()
  const [jobs,setJobs] = useState(()=> {
    return gotItem ?? []
  })
  
  const handleDelete = (item) => {
    setJobs(prev => {
      const newItem = [...prev]
      newItem.splice(item,1)
      localStorage.setItem('jobs',JSON.stringify(newItem))
      return newItem
      })
  }
  const handle = () => {
    setJobs(prev=>{
      if(!job) {
        return [...prev]
      } else {
        const newJob = [...prev, job]
      setJob('')
      const savedJob = JSON.stringify(newJob)
      localStorage.setItem('jobs',savedJob)
      return newJob
      }
    })
  }
  const clearBtn = () => {
    localStorage.removeItem('jobs')
    setJobs([])
  }
  const handleFinish = (item) => {
    const lis = document.querySelector(".my-li-"+item)
    console.log(lis);
    lis.classList.add('done')
    lis.classList.remove('my-li')
  }
 
  return (
    <div className="App">
        <h1>My ToDo List</h1>
      <div className='container'>
        <div className='container-input'>
          <TextField id="outlined-basic" label="Have something to do?" placeholder='Exp: read' variant="outlined" value={job} onChange={(e)=> { setJob(e.target.value)}}/>
        </div>
        <div className='container-btn'>
          <Button color='primary' variant="outlined" onClick={handle}>Add</Button>
        </div>
        <div className='container-btn'>
          <Button color='secondary' variant="outlined" onClick={clearBtn}>Clear All</Button>
        </div>
        </div>
        <div className='list'>
          <ul>
              {jobs.map((job,index)=>{
                return (
                  <div key={index} className='box'>
                  <li className={"my-li-"+index}>{job}</li>
                  <div>
                  <Button color="primary" variant="outlined" onClick={(job)=>{handleDelete(index)}}>Delete</Button>
                  <Button className='finishBtn' color="primary" variant="contained" onClick={(job)=>{handleFinish(index)}}>Done</Button>
                  </div>
                  </div>
                )
              })}
          </ul>
      </div>
    </div>
  )
}

export default App;
