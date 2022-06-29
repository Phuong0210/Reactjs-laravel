import axios from 'axios';
import React, { Component } from 'react';
import {useEffect, useState} from "react";
function CarList(){
  const [cars, setCars] = useState([]);
  const getCars= ()=>{
    axios.get('http://127.0.0.1:8000/api/cars')
    .then(function(response){
      setCars(response.data)
    })
    .catch(function (error){
      console.log(error)
    })
    .then(function(){

    });
  }
  useEffect(()=>{
    getCars()
  },[])
    return (
        <div>
          <div className="container">
            
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8"><h2>Car<b>Details</b></h2></div>
                  <div className="col-sm-4">
                    <a href="{{ route('cars.create') }}">   <button type="button" className="btn btn-info add-new"><i className="fa fa-plus" /> Add New</button></a>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead style={{width: '300px'}}>
                  <tr>
                    <th>ID</th>
                    <th style={{width: '110px'}}>Image</th>
                    <th>Description</th>
                    <th>Model</th>
                    <th style={{width: '120px'}}>Produced_on</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!!cars
                  ?
                  cars.map((car,index)=>
                  <tr key={index}>
                  <td>{car.id}</td>
                  <td><img src={`http://127.0.0.1:8000/image/${car.image}`} className="card-img-top" alt="..." width="100px" /></td>
                  <td>{car.description}</td>
                  <td>{car.model}</td>
                  <td>{car.produced_on}</td>
                  <td>
                    <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons"></i></a>
                    <a href="{{ route('cars.edit',$car->id) }}" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons"></i></a>
                    <a href className="delete" title="Delete" name="delete" data-toggle="tooltip">
                      <button type="submit" onclick="return confirm('Bạn có chắc chắn là muốn xóa sản phẩm này!!?')"><i className="material-icons"></i></button></a>
                  </td>
                </tr>)
                :
                 
                 <tr><td>No data</td></tr> }
                </tbody>
              </table>
            </div> 
            </div>
        </div>
      );
    }

export default CarList;