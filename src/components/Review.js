import React from 'react'
import {Form,Button,Card} from 'react-bootstrap';
import axios from 'axios';



class Review extends React.Component{

    state ={
        files: null,
        recipe: ''
    };
    
    handleUpload = async()=>{
        const formData = new FormData();
        formData.append("file", this.state.files);
        var filename = this.state.files
        console.log('in file upload')
        console.log(filename)
        const response = await axios.post("http://localhost:2000/upload", formData).then(result => {
            console.log("done");
        });
        }

    onChangeHandler = (event) =>{
        console.log(event.target.files[0])
        this.setState({files: event.target.files[0]})
    }

    getSimilarity = (event) => {
        axios.get('http://localhost:2000/similarity').then((result) => {
          this.setState({recipe: result.data.similarFile})
          console.log('state changed')
          console.log(this.state.recipe)
        })
      }
    

    render(){
        return(<div className="container">
            <Card>
        <Form controlId="form1" >                 
                    <Form.Group controlId="formUpload">
                    <Form.Label style={{width:'150px',margintop:'500px'}}>Upload file</Form.Label>
                    <Form.Control type="file" placeholder="upload file" style={{width:'500px'}} onChange={this.onChangeHandler} required/>
                    </Form.Group>
                    <Button variant="outline-success" type="button" size="lg" onClick={this.handleUpload}>Submit</Button>
                    <Button variant="outline-success" type="button" size="lg" onClick={this.getSimilarity}> Check Similarity</Button>
                    </Form>
                    </Card>
            <Card>
            <Form.Label style={{width:'150px',margintop:'500px'}}>{this.state.recipe}</Form.Label>
            </Card>
    </div>
        )
    }
}

export default Review;
