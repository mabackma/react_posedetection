import { useState } from "react";
import TMModelLoad from "./TMModelLoad";

// Takes model id as parameter
function SelectModelButton(model){
    
    const {model_id} = model;
    
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
        <div id="select-model-button-div">
            <button id="model-button" onClick={handleClickModelButton}>Load Model {model_id}</button>
            {showModel && <TMModelLoad path_to_model={get_path_to_model(model_id)} path_to_metadata={get_path_to_metadata(model_id)}/>}         
        </div>
    )
}

export default SelectModelButton