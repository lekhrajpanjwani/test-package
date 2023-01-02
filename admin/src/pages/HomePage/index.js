/*
 *
 * HomePage
 *
 */

// import React from 'react';
import React, { memo, useState, useEffect } from "react";
import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import todoRequests from "../../api/todo"
// import { nanoid } from "nanoid";
import { Button } from '@strapi/design-system';
import { EmptyStateLayout } from '@strapi/design-system';
import { Layout, BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import Plus from "@strapi/icons/Plus";
import { Illo } from '../../components/Illo';
import TodoModal from "../../components/TodoModal";
import TodoCount from "../../components/TodoCount";
import TodoTable from "../../components/TodoTable";


const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async() => {
    if(isLoading === false) setIsLoading(true);
    const todo = await todoRequests.getAllTodos();
    setTodoData(todo);
    setIsLoading(false);
  }

  useEffect(async () => {
    await fetchData();
  }, []);

  async function addTodo(data) {
    // setTodoData([...todoData, {...data, id: nanoid(), isDone: false}]);
    await todoRequests.addTodo(data);
    await fetchData();
  }
  
  async function toggleTodo(data) {
    alert("Add toggle in API");
    await todoRequests.toggleTodo(data.id)
    await fetchData();
  }

  async function deleteTodo(data){
    alert("Add delete todo in API");
    await todoRequests.deleteTodo(data.id);
    await fetchData();
  }

  async function editTodo(id, data){
    alert("Add edit todo in API");
    await todoRequests.editTodo(id, data);
    await fetchData();
  }

  if(isLoading) return <LoadingIndicatorPage/>;

  return (
    <Layout>
      <BaseHeaderLayout
      title="todo plugin"
      subtitle="all your tool in one place"
      as="h2" />

      <ContentLayout>
      {
        todoData.length === 0 
        ? <EmptyStateLayout
        icon={<Illo/>}
        content="you do not have todos yet...."
        action={<Button onClick={()=> setShowModal(true)}
        variant="secondary"
        startIcon={<Plus/>}>Add your first todo</Button>}
        />
        : <>
          <TodoCount count={todoData.length}/>
          <TodoTable
          todoData={todoData}
          setShowModal={setShowModal}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          />
        </>
      }
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo}/>}
    </Layout>

  );
};

export default HomePage;
