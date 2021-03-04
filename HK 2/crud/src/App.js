import { Button } from './components/Button';
import { CarList } from './components/CarList';
import { Header } from './components/Header';
import { useState, useEffect } from 'react';

import './index.css';
import { Form } from './components/Form';
import { AlertModal } from './components/AlertModal';
import { ConfirmationModal } from './components/ConfirmationModal';

function App() {
  const [list, setList] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
      let fetchedList = [];

      
      for(let [key, value] of Object.entries(localStorage)){
          fetchedList.push({...JSON.parse(value), key});
      }
      setList(fetchedList);

  }

  const openForm = () => {
    if(localStorage.length < 5){
      setIsFormOpen(true);
    }else{
      setAlert('Não há mais vagas');
    }
  }

  const closeForm = () => {
    setIsFormOpen(false);
    setItemToEdit(null);
  }

  const editItem = (item) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  }

  const showAlert = (alert) => {
    setAlert(alert);
  }

  const closeAlert = () => {
    setAlert(false);
    loadList();
  }
  
  const showDeleteConfirmation = (key) => {
    setItemToDelete(key);
  }

  const closeConfirmation = () => {
    setItemToDelete(null);
    loadList();
  }

  return (
    <div className="app-container">
      <Header />
      {isFormOpen ?  
      <Form 
        itemToEdit = {itemToEdit}
        showAlert = {(alert) => showAlert(alert)}
        closeForm = {closeForm}
      /> : 
      <>
        <CarList
          list = {list} 
          editItem = {(item) => editItem(item)}
          deleteItem = {(key) => showDeleteConfirmation(key)} 
        />
        <Button onClick = {openForm}/>
      </>
      }

      {alert && 
      <AlertModal 
        alert = {alert}
        closeAlert = {closeAlert}
      />}

      {itemToDelete && 
      <ConfirmationModal
        itemToDelete = {itemToDelete}
        closeConfirmation = {closeConfirmation}
      />}
    </div>
  );
}

export default App;
