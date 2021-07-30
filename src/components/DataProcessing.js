import Axios from 'axios';
import React ,{ useState, useEffect } from "react";
import ReactWordcloud from 'react-wordcloud';

function DataProcessing() {
    const [messageList, setMessageList] = useState([]);
       let size = [500,300];
       const options={colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        rotations:1,
        rotationAngles: [0],
        enableTooltip:true,
        fontSizes: [20, 50],
        fontFamily:"impact",
        fontStyle:"normal",
        fontWeight:"normal",
        width:5000,
        height:1000,
        padding:100000000,spiral:"archimedean", transitionDuration:1000};
        
        const getwords =async()=> {
        
      await Axios.get(`/default/DataProcessing_Python`)
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