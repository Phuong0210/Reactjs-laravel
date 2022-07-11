
import axios from 'axios';
import React, { useEffect, useState } from "react";
// import { Table } from 'reactstrap';
// import { StyleListCar } from './../css/StyleListCar.css';
import AddCar from './AddCar';
import EditCar from './EditCar.js';
const CarList = (props) => {
    const [cars, setCars] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const getCars = () => {

        // Make a request for a user with a given ID
        axios.get('http://127.0.0.1:8000/api/cars')
            .then(function (response) {
                // handle success
                console.log(response);
                setCars(response.data.data)
                setIsLoaded(true)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }


    //bắt đầu làm cho EditCar.js
    const [editmodal, setEditModal] = useState(false);

    const [editCarData, setEditCarData] = useState({
        id:"",
        model:"",
        description:"",
        produced_on:"",
        image:""
    });  //editCarData là 1 mảng các đối tượng lưu dữ liệu đối tượng Car được edit
    //hàm này nhận biến car ở sự kiện onClick() của nút Sửa
    const toggleEditModal = (car) => {
        setEditModal(!editmodal);
        if (editmodal === false) setEditCarData(car);  //phải có kiểm tra điều kiện form edit được mở thì mới cập nhật không thì sẽ lỗi không nhận ra editCarData.manufacturer.id khi đóng form
        console.log(editCarData);
    }

    //tham số car này là tham số đầu vào
    const deleteCar = (id) => {
        axios.delete('http://127.0.0.1:8000/api/cars/' + id)  //tham số truyền vào là id
            .then((res) => {
                console.log("Car removed deleted");
                getCars();
            }).catch((error) => {
                console.log(error)
            })
    }//đóng delete

    useEffect(() => {
        if (!isLoaded) getCars();
    }, [isLoaded])
    // search-----------
   
    

    return (
        <div className="table-responsive">
            <input
                size="lg"
                placeholder="Search by title, e.g. Bird"
                mb="1rem"
                name="search"
                // value={search}
                // onChange={({ target }) => setQuery(target.value)}
                type="search"
                width={{ base: "90vw", md: "600px" }}
                bg="white"
               
            />
            <button type='submit'  className="">Search !!!</button>
            {/* <Button type="submit" color="primary"> Search </Button> */}
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-xs-5">
                        
                            {/* <AddCar onAdded={setIsLoaded}/> */}
                            <AddCar onAdded={setIsLoaded}></AddCar>
                            {/* <AddCar getCars={getCars} /> */}
                            {/* <Link to="/cars/add"><Button color="primary">Add car page</Button></Link> */}

                            <EditCar cars={cars} setCars={setCars} getCars={getCars} toggleEditModal={toggleEditModal} editmodal={editmodal} editCarData={editCarData} setEditCarData={setEditCarData} />
                        </div>

                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Model</th>
                            <th>Description</th>
                            <th>Produced_on</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cars.length !== 0
                            ?
                            cars.map((car, index) =>

                                <tr key={index}>
                                    <td>{car.id}</td>
                                    <td><a href="#">
                                        <img width="100px"
                                            height="100px" className="avatar" src={`http://127.0.0.1:8000/image/${car.image}`} alt="Avatar" /></a></td>
                                    <td>{car.model}</td>
                                    <td>{car.description}</td>
                                    <td>{car.produced_on}</td>

                                    <td>
                                        <button title="EDIT"
                                            data-toggle="tooltip" onClick={() => toggleEditModal(car)}>
                                            <i className="material-icons">&#xE8B8;</i>

                                        </button>
                                        <button type="submit"
                                            className="settings"
                                            title="delete"
                                            data-toggle="tooltip"
                                            onClick={() => { if (window.confirm('Bạn có chắc chắn xóa?')) deleteCar(car.id) }}
                                        > <i
                                            className="material-icons">&#xE5C9;</i>
                                        </button>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td>{'No data in database'}</td>

                            </tr>}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default CarList;