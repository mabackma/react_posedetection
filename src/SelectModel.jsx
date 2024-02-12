import { useState } from "react";
import TMModelLoad from "./TMModelLoad";
import TextArea from "./TextArea";

function SelectModel(){
    
    const [showModel1, setShowModel1] = useState(false);
    const handleClickModel1Button = () => {
        setShowModel1(!showModel1);
    }


    const path_to_model1 = "src/assets/model1/model.json"
    const path_to_metadata1 = "src/assets/model1/metadata.json"


    return (
        <div id="select-model-buttons-div">
            <button id="model1-button" onClick={handleClickModel1Button}>Load Model 1</button>
            {showModel1 && <TMModelLoad path_to_model={path_to_model1} path_to_metadata={path_to_metadata1}/>}
            <TextArea/>
        </div>
    )
}

export default SelectModel