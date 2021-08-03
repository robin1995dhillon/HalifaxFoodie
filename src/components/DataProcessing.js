import Axios from 'axios';
import React ,{ useState, useEffect } from "react";
import ReactWordcloud from 'react-wordcloud';

function DataProcessing() {
    const [messageList, setMessageList] = useState([]);      
        const getwords =async()=> {
        
      await Axios.get(`https://rl0880mmcc.execute-api.us-east-1.amazonaws.com/default/DataProcessing_Python`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("inside if block");
                    console.log(response.data);
                    setMessageList(response.data); 
                }
                else {
                    console.log(response);
                    console.log("inside else blocksas");
                    
                }},
                (error) => {
                    console.log(error);
                });
    };
useEffect(() => {
    getwords();
},[])
    
    console.log("log is:",messageList);
    
    return(
        <div>
            <h1>Word Cloud</h1>
            <ReactWordcloud words={messageList}  height={5000} width={5000} fontSizes= {[200, 500]}/>
            
        </div>
    )
}

export default DataProcessing;