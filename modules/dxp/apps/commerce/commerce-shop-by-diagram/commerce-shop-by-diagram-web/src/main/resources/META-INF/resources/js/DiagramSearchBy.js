import React, {useState} from 'react';
import { ClaySelect } from '@clayui/form';
import ClayLink from '@clayui/link';
const DiagramSearchBy = ({}) => {

    const [typeSearch, setTypeSearch] = useState()
    const [yearSearch, setYearSearch] = useState()
    const [makeSearch, setMakeSearch] = useState()
    const [modelSearch, setModelSearch] = useState()
    const [submodelSearch, setSubmodelSearch] = useState()
    const [engineSearch, setEngineSearch] = useState()

    const handleTypeChange = () => {
        console.log('ciao')
    }

    const options = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5];


    return (
        <div className="row diagram-container diagram-search-by d-flex align-items-center justify-content-center bg-white mb-4">
            <div className="col-12 title align-items-center d-flex align-middle">
                <h3>Search By</h3>
            </div>

            <hr/>

            <div className="col-2 col-sm-4 col-xs-6 mb-1">
                <label className="ml-3">Type</label>
                <ClaySelect
                    aria-label="Search By Type"
                    className="ml-3 mr-3"
                    id="quantity-select"
                    onChange={handleTypeChange}
                    value={typeSearch}
                >
                    {options.map((value) => (
                        <ClaySelect.Option
                            key={value}
                            label={`${value * 100}%`}
                            value={value}
                        />
                    ))}
                </ClaySelect>
            </div>

            <div className="col-2 col-sm-4 col-xs-6 mb-1">
                <label className="ml-3">Year</label>
                <ClaySelect
                    aria-label="Search By Year"
                    className="ml-3 mr-3"
                    id="quantity-select"
                    onChange={handleTypeChange}
                    value={yearSearch}
                >
                    {options.map((value) => (
                        <ClaySelect.Option
                            key={value}
                            label={`${value * 100}%`}
                            value={value}
                        />
                    ))}
                </ClaySelect>
            </div>

            <div className="col-2 col-sm-4 col-xs-6 mb-1">
                <label className="ml-3">Make</label>
                <ClaySelect
                    aria-label="Search By Make"
                    className="ml-3 mr-3"
                    id="quantity-select"
                    onChange={handleTypeChange}
                    value={makeSearch}
                >
                    {options.map((value) => (
                        <ClaySelect.Option
                            key={value}
                            label={`${value * 100}%`}
                            value={value}
                        />
                    ))}
                </ClaySelect>
            </div>

            <div className="col-2 col-sm-4 col-xs-6 mb-1">   
                <label className="ml-3">Model</label>
                <ClaySelect
                    aria-label="Search By Model"
                    className="ml-3 mr-3"
                    id="quantity-select"
                    onChange={handleTypeChange}
                    value={modelSearch}
                >
                    {options.map((value) => (
                        <ClaySelect.Option
                            key={value}
                            label={`${value * 100}%`}
                            value={value}
                        />
                    ))}
                </ClaySelect>
            </div>

            <div className="col-2 col-sm-4 col-xs-6 mb-1">
                <label className="ml-3">Submodel</label>
                <ClaySelect
                    aria-label="Search By Submodel"
                    className="ml-3 mr-3"
                    id="quantity-select"
                    onChange={handleTypeChange}
                    value={submodelSearch}
                >
                    {options.map((value) => (
                        <ClaySelect.Option
                            key={value}
                            label={`${value * 100}%`}
                            value={value}
                        />
                    ))}
                </ClaySelect>
            </div>

            <div className="col-2 col-sm-4 col-xs-6 mb-1">
                <label className="ml-3">Engine</label>
                <ClaySelect
                    aria-label="Search By Engine"
                    className="ml-3 mr-3"
                    id="quantity-select"
                    onChange={handleTypeChange}
                    value={engineSearch}
                >
                    {options.map((value) => (
                        <ClaySelect.Option
                            key={value}
                            label={`${value * 100}%`}
                            value={value}
                        />
                    ))}
                </ClaySelect>
            </div>
            <div className="col-12 mt-1">
                <ClayLink borderless className="ml-3" displayType="primary" href="#link-styles"><strong>{'Clear'}</strong></ClayLink>

            </div>

        </div>

    );
};

export default DiagramSearchBy;