import React ,{useState} from 'react'


function FeedBack() {
    const [restaurant, setRestaurant] = useState('HF');
    const handleChange = (event) => {       
        setRestaurant(event.target.value)
        console.log('The food item selected is: ',restaurant)
      }   
      const handleSubmit = (event) => {       
       
        console.log('The food item selected is: ',event)
        alert("Your Order is placed succesfully")
      }   
    
      return(
        <div>  
            <h1>welcome to feedback page</h1>
            <form onSubmit={handleSubmit}>
            <label><h4>Restaurant:</h4>
          
            <select name='rest' id='rest' onChange={handleChange}>            
                <option value="HF">HF Restaurant</option>
                <option value="NS">NS Restaurant</option>
            </select>
            </label>
            <br/><br/>
            <textarea rows="4" cols="60" id="feedback" name="feedback" /><br/>
            <input type="submit" value="Submit" />  
            </form>      
            </div>
);}

export default FeedBack
