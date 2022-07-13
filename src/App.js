import React from 'react';
import './App.css';
//import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CarList from './CRUD/CarList';
 //import AddCar from './pages/AddCar';
//import EditCar from './pages/UpdateCar';
//import routes from './routes';
//import CarList from './pages/CarList';
import List from './Home/test';
function App() {
    return (
       
        <List></List>
         
      );
}
// react-router-dom chỉ cho định tuyến giữa các component nội bộ bên trong component đang định nghĩa chứ ko liên kết ra bên ngoài,
// nếu muốn liên kết ra ngoài thì dùng  thẻ a=href chứ ko dùng thẻ Link
// xem thêm về định tuyến react-router-dom tại
// https://www.youtube.com/watch?v=5jYlY4y5Dfs


export default App;