import React, {useState} from 'react';
import ClayTable from '@clayui/table';
import PropTypes from 'prop-types';
import ClayInput from '@clayui/form'
import ClayButton from '@clayui/button';
import classnames from 'classnames';
import ClaySelect from '@clayui/form';

const PinsList = ({
    cPins,
    imageSettings
}) => {
    const [value, setValue] = useState("one");
    console.log(cPins)

    const productQuantityChange = () => {
        console.log('changed value')
    }

    const diagramStyle = {
        height: `${imageSettings.height}`,
    };


    return (
        <div className={classnames(imageSettings.listWidth, 'pins-list col-4 col-xs-12')} style={diagramStyle}>
            <h3>Products</h3>
            
            <div style={diagramStyle}>
                <ClayTable>
                    <ClayTable.Head>
                        <ClayTable.Row>
                            <ClayTable.Cell headingCell>
                                {"Check"}
                            </ClayTable.Cell>
                            <ClayTable.Cell headingCell>{"Position"}</ClayTable.Cell>
                            <ClayTable.Cell headingCell>{"Product Name / SKU"}</ClayTable.Cell>
                            <ClayTable.Cell headingCell>{"Quantity"}</ClayTable.Cell>
                            <ClayTable.Cell headingCell>{"Price"}</ClayTable.Cell>
                        </ClayTable.Row>
                    </ClayTable.Head>

                    {Array.from(cPins).forEach((pin) => {

                        <ClayTable.Body>
                            <ClayTable.Row>
                                <ClayTable.Cell headingTitle>
                                    <ClayInput type="checkbox" />
                                </ClayTable.Cell>
                                <ClayTable.Cell>
                                    <strong>{pin.label}</strong>
                                    <p>{pin.sku}</p>
                                </ClayTable.Cell>
                                <ClayTable.Cell>
                                    <ClaySelect
                                        aria-label="Quantity"
                                        className="ml-3 mr-3"
                                        id="quantity-select"
                                        onChange={productQuantityChange}
                                        value={value}
                                    >
                                        {/* {options.map((value) => (
                                        <ClaySelect.Option
                                            key={value}
                                            label={`${value * 100}%`}
                                            value={value}
                                        />
                                    ))} */}
                                    </ClaySelect>
                                </ClayTable.Cell>
                                <ClayTable.Cell>

                                    {pin.currency}<strong>{pin.reguar_price}</strong>

                                    {pin.discounted_price && (
                                        <p>{pin.discounted_price}</p>
                                    )}

                                </ClayTable.Cell>
                            </ClayTable.Row>
                            <ClayTable.Row>
                                <ClayTable.Cell headingTitle>{"White and Purple"}</ClayTable.Cell>
                                <ClayTable.Cell>{"Europe"}</ClayTable.Cell>
                                <ClayTable.Cell>{"Spain"}</ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Body>
                    })}

                </ClayTable>
            </div>
            <ClayButton type="primary">Add To Cart Selected Product</ClayButton>
        </div>
    )
}

export default PinsList;