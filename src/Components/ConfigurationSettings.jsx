import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ListGroup from 'react-bootstrap/ListGroup';

const ConfigurationSettings = (props) => {
    
            //manual_options: this.generate_optionlist(this.state.unsupplyed_ingrediants, false),
            //manual_value: this.generate_optionlist(this.state.api.data.config.manual, false),
            //pump_options: this.generate_optionlist(this.state.unsupplyed_ingrediants, true),
            //pump_value: this.generate_optionlist(this.state.api.data.config.pump, false)

    
    function get_unsupplyed_ingrediants(configuration, ingrediants) {
        const unsupplyed_ingrediants = [];
        for (const id of Object.keys(ingrediants)){
            if (!Object.values(configuration.pump).includes(id) && !configuration.manual.includes(id)){
                unsupplyed_ingrediants.push(id);
            }
        }
        return(unsupplyed_ingrediants); 
    }

    function update_settings_value(setting, value, id=0) {
        var request = "http://localhost:43560/settings/edit";
        switch(setting) {
            case "pump":
                request = request + "/pump_" + id + "?val1=" + value.value;
                break;
            case "manual": 
                if (value.length <= 0){
                    request = request + "/manual?val1=null";
                }
                else {
                    request = request + "/manual?val1=" + value.map(x => x.value).join(",");
                }
                break;
            default:
                return;
        }
        console.log(request);
        Promise.all([this.fetchAPI(request)]).then(
            ([configuration]) => {
                this.setState({
                    configuration
                });
                this.setState({
                    unsupplyed_ingrediants: this.get_unsupplyed_ingrediants(this.state.configuration, this.state.ingrediants),
                });
                this.setState({
                    manual_options: this.generate_optionlist(this.state.unsupplyed_ingrediants, false),
                    manual_value: this.generate_optionlist(this.state.configuration.manual, false),
                    pump_options: this.generate_optionlist(this.state.unsupplyed_ingrediants, true),
                    pump_value: this.generate_optionlist(this.state.configuration.pump, false)
                });
            },
            (error) => {
                console.log("error fetching resources:");
                console.log(error);
            })
    }

    generate_optionlist(data, add_null) {
        const result = [];
        data.forEach((key, i) => result.push({ value: key, label: this.state.ingrediants[key] }));
        if (add_null){
            result.push({ value: "null", label: "Leer" });
        }
        console.log(result);
        return result;
    }

    render() {
        return (
            <>
                <h4>Pumps</h4>
                    <Card body>
                        <ListGroup variant="flush">
                            {
                            [...Array(10)].map((e, i) => 
                                <ListGroup.Item>
                                    Pump {i}:
                                    <Select options={this.state.pump_options} value={this.state.pump_value[i]} onChange={value => this.update_settings_value("pump", value, i)} />
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                <h4>Manual Ingrediants</h4>
                <Select options={this.state.manual_options} value={this.state.manual_value} onChange={value => this.update_settings_value("manual", value)} isMulti />
            </>
        )
    }
}

//export default ConfigurationSettings