import React, { useState } from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import axios from 'axios';


function AddCar ({getCars}) {
    const [show, setShow] = useState(false);
    const [car, setCar] = useState({
        model: "",
        description: "",
        image:"",
        produced_on:"",
        file:null
      });
      const tooggle = () => {
        setShow(!show);
    }
      const onRedirect=()=>{
        setCar({});  //set lại state car là đói tượng rỗng
        tooggle();
       getCars({});
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log(car)
        setCar(() => ({
          ...car,
          [name]: value
    }));
    }
    const handleInputImage = (e) => {
        setCar(()=>({
            ...car,
            file: e.target.files && e.target.files.length ? URL.createObjectURL(e.target.files[0]) : car.file,
            image: e.target.files && e.target.files.length ? e.target.files[0].name : car.image
        }));
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(car)
    
    }

     const OnSave = (event)=>{
        event.preventDefault();
        const fileInput = document.querySelector('#fileUpload');
        const formData = new FormData();
        formData.append('model',car.model);
        formData.append('description',car.description);
        formData.append('image',fileInput.files[0]);
        formData.append('produced_on',car.produced_on);
        axios.post('http://127.0.0.1:8000/api/cars',formData)
        .then(function(response){
            console.log(response);
            onRedirect();
        })
        .catch(function(error){
            console.log(error);
        })
     }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add a new car
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD A NEW CAR</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Model</Form.Label>
                            <Form.Control name='model' id='model' type="text"  onChange ={handleInputChange} placeholder="Enter model" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' id='description'   type="text" onChange ={handleInputChange} placeholder="Enter description" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Produced_on</Form.Label>
                            <Form.Control name='produced_on' id='produced_on'  type="date" onChange ={handleInputChange} placeholder="Enter produced_on" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" id='fileUpload'  onChange ={handleInputImage} placeholder="Enter image" />
                            <img alt='ts' src={car.file} style={{with:'10em'}}></img>
                        </Form.Group>

                        <Form.Group className="mb-3 text-center" controlId="formBasicEmail">

                            <Button type="submit" className="m-3" onClick ={OnSave}  >
                                Add to cart
                            </Button>

                            <Button variant="secondary" className="m-3 ml-5" onClick={handleClose}>
                                Close
                            </Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>

            </Modal>
        </>
    );
}

export default AddCar;
