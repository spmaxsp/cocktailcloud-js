import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ListGroup from 'react-bootstrap/ListGroup';

import { useSettings } from './api/settingsFetchHooks';

const ConfigurationSettings = (props) => {
    
    const { data, loading, error, refreshSettings, editSettings, addManualIngredient, removeManualIngredient, editPump } = useSettings();

    const manual_callback = (e) => {
        let new_ids = e.map((option) => option.value);
        let old_ids = data.config.manual.map((option) => option.id);
        let add_ids = new_ids.filter((id) => !old_ids.includes(id));
        let remove_ids = old_ids.filter((id) => !new_ids.includes(id));
        add_ids.forEach((id) => addManualIngredient(id));
        remove_ids.forEach((id) => removeManualIngredient(id));
    }

    if (!data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        let pump_list = data.config.pump;
        let manual_list = data.config.manual;
        let unsupplied_list = data.config.unsupplied;

        const manual_optionlist = 
            unsupplied_list.map((option) => {
                return { value: option.id, label: option.name }
            });

        const pump_optionlist = manual_optionlist.concat({ value: "null", label: " - " });

        const manual_selectlist =
            manual_list.map((option) => {
                return { value: option.id, label: option.name }
            });

        return(
            <>
                <h4>Pumps</h4>
                    <Card body>
                        <ListGroup variant="flush">
                            {
                                Object.keys(pump_list).map((key) => ( 
                                    <ListGroup.Item>
                                        Pump {key}:
                                        <Select options={pump_optionlist} value={{ value: pump_list[key]["id"], label: pump_list[key]["name"] }} onChange={(e) => editPump(key, e.value)} />
                                    </ListGroup.Item>
                                    ))
                            }
                        </ListGroup>
                    </Card>
                <h4>Manual Ingrediants</h4>
                <Select options={manual_optionlist} value={manual_selectlist} onChange={manual_callback} isMulti />
            </>
        )
    }
}

export default ConfigurationSettings