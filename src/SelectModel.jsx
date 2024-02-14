import { useState } from "react";
import TMModelLoad from "./TMModelLoad";
import TextArea from "./TextArea";

function SelectModel(){
    
    const [showModel, setShowModel] = useState(false);
    const handleClickModelButton = () => {
        setShowModel(!showModel);
    }

    function get_path_to_model(id){
        const path_to_model = "src/assets/models/model" + id + "/model.json"
        return path_to_model
    }

    
    function get_path_to_metadata(id){
        const path_to_metadata = "src/assets/models/model" + id + "/metadata.json"
        return path_to_metadata
    }


    return (
        <div id="select-model-buttons-div">
            <button id="model1-button" onClick={handleClickModelButton}>Load Model 1</button>
            {showModel && <TMModelLoad path_to_model={get_path_to_model(2)} path_to_metadata={get_path_to_metadata(2)}/>}
            <TextArea/>
        </div>
    )
}

export default SelectModel