import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import * as firebase from 'firebase'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
// or less ideally

 
var firebaseConfig = {
  apiKey: "AIzaSyCKZthkwc3ABhFcAlTWy9Zj-ZrzomGkW_A",
  authDomain: "taskme-8e1cc.firebaseapp.com",
  databaseURL: "https://taskme-8e1cc.firebaseio.com",
  projectId: "taskme-8e1cc",
  storageBucket: "taskme-8e1cc.appspot.com",
  messagingSenderId: "239135993363",
  appId: "1:239135993363:web:18a1afb1e1397cca2719e6",
  measurementId: "G-WBV9EC4QY2"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
class App extends Component{


  state = {
    taskName: "",
    tasks: "",
  allTasks: ["sdj"]
}
  async componentWillMount() {

 this.showTasks()
  }

   addTask = () => {
    db.collection('tasks/').doc(this.state.taskName).set({
      taskname: this.state.taskName,
      id: this.state.taskName
    })
    return this.showTasks()
  }
  handleChange = (event) =>{
    this.setState({
      taskName: event.target.value
    })
  }
  async showTasks() {
    var curr = []
    var ref = await db.collection('tasks').get()
    ref.docs.map(function(doc){
      curr.push(doc.data())
    })
    this.setState({
      allTasks: curr
    })
    console.log(this.state.allTasks)
    this.renderTableData()

  }

  deleteTask = async (key) => {
    console.log(key)
    this.setState({
      deleteTask: key
    })
    const res = await db.collection('tasks').doc(key).delete();
    return this.showTasks()

   }
  renderTableData() {
    return this.state.allTasks.map((element, index) => {
      
       return (
          <tr key = {element.taskName} class="align-middle">
            <td class="align-middle">
            <button  onClick={() => this.deleteTask(element.taskname)} className="btn btn-outline-danger "><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-patch-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
  <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
</svg></button>
</td>
             <td>{element.taskname}</td>

          </tr>
       )
    })
 }

 logs = () => {
   console.log(this.state)
 }

clearInput = ()=>{
  this.id.newTask.value = ""
}

  render() {
    return (
      <>
      <h3 style={{marginLeft: "3em"}}>Taskme <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar3-event" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
  <path fill-rule="evenodd" d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg></h3>
      <div className="App" onLoad={this.showTasks}>
        <div style={{marginLeft: "5em"}}>
      <textarea id="newTask"placeholder = "Enter a task" value={this.state.taskName} onChange={this.handleChange}  className="form-control" style={{maxWidth: "80em", fontSize:"1em"}}></textarea>
      <button onClick={this.addTask} style={{marginTop: "1em"}} className="btn btn-outline-primary">Add Task</button>
      </div>
<br></br>
<table className="table ">
  <thead>
    <td>Remove</td>
    <td className="bold">Today's Tasks</td>
      
  </thead>
  <tbody>
{this.renderTableData()}
  </tbody>
</table>
      </div>

      </>
    );
  }
}



export default App;
