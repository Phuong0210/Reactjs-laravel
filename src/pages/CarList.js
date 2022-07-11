
import axios from 'axios';
import   EditCar from './UpdateCar';
import AddCar from './AddCar';
import React from 'react';
//import { Link} from "react-router-dom";
//import {Button } from "react-bootstrap";
import {useEffect, useState} from "react";
const CarList=()=>{
   
  const [cars,setCars]=useState([{
      id:"",
      model:"",
      description:"",
      produced_on:"",
      image:""
  }]);  //cars là 1 mảng các đối tượng
  const [noDataFound,setNoDataFound]=useState("");
  const [search, setSearch] = useState();
  //gọi hàm này khi CarList được render lần đầu (chú ý tham số thứ 2 là mảng rỗng). Hàm này như hàm lifecycle componentDidMount()
  useEffect(() => {
      getCars();
      //console.log("hello carlist");
    },[]);

  //cập nhật lại state cars
  const getCars=()=>{
      axios.get('http://127.0.0.1:8000/api/cars').then((res)=>{
          console.log(res.data);
          if(res.status===200){
              setCars(res.data.data?res.data.data:[]); //c là biến tự đặt tên gì cũng đc, ko có nó thì in ra cars=[]
              console.log(res.data.data?res.data.data:[]);
              console.log(cars);//vì cars lúc này chỉ render 
          };
          if(res.data.status==="failed" && res.data.success===false){
              setNoDataFound(res.data.message);
              console.log(noDataFound);
          };
      }).catch((error)=>{
          console.log(error);
      });
  };

   //bắt đầu làm cho EditCar.js
   const [editmodal, setEditModal] = useState(false);
    
   const [editCarData,setEditCarData]=useState({
       id:"",
       model:"",
       description:"",
       produced_on:"",
       image:""
   });  //editCarData là 1 mảng các đối tượng lưu dữ liệu đối tượng Car được edit
   //hàm này nhận biến car ở sự kiện onClick() của nút Sửa
   const toggleEditModal = (car) => {
       setEditModal(!editmodal);
       if (editmodal===false) setEditCarData(car);  //phải có kiểm tra điều kiện form edit được mở thì mới cập nhật không thì sẽ lỗi không nhận ra editCarData.manufacturer.id khi đóng form
       console.log(editCarData);
   }
   //tham số car này là tham số đầu vào
   const deleteCar=(id)=> {
       axios.delete('http://127.0.0.1:8000/api/cars/' + id)  //tham số truyền vào là id
       .then((res) => {
       console.log("Car removed deleted");
       getCars();
       }).catch((error) => {
       console.log(error)
       })
   }//đóng delete
   const handleSearch = async (e,search) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/show?search=${search}`);
    // const carList = await res.data;
 
    setCars(res.data.data);

}
    return (
        <div>
         
          <div className="container">
           <div class="search">
           <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} />
            <button class="search-2" type='button' onClick={(e) => handleSearch(e,search)}>Search</button>
            </div>
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8"><h2>Car<b>Details</b></h2></div>
                  <div className="col-sm-4">
                  <AddCar getCars={getCars}/>
                  </div>
                  {/* <Link to="/cars/add"><Button color="primary">Add car page</Button></Link> */}

        
                </div>
                <EditCar cars={cars} setCars={setCars} getCars={ getCars} toggleEditModal={ toggleEditModal } editmodal={ editmodal } editCarData={editCarData} setEditCarData={setEditCarData}/> 
              </div>
              <table className="table table-bordered">
                <thead style={{width: '1000px'}}>
                  <tr>
                    <th>ID</th>
                    <th style={{width: '110px'}}>Image</th>
                    <th>Description</th>
                    <th>Model</th>
                    <th style={{width: '120px'}}>Produced_on</th>
                    <th style={{width: '150px'}}>Actions</th>
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
                  
                  <button type="button" className="btn btn-success" onClick={()=>toggleEditModal(car)}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={()=>{ if(window.confirm('Bạn có chắc chắn xóa?')) deleteCar(car.id)} }>Delete</button>
                    {/* <a href="/#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons"></i></a>
                    <a href="/#" className="delete" title="Delete" name="delete" data-toggle="tooltip">
                      <button type="submit" onClick="return confirm('Bạn có chắc chắn là muốn xóa sản phẩm này!!?')"><i className="material-icons"></i></button></a> */}
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