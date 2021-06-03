/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import ClayButton from '@clayui/button';
import ClayInput from '@clayui/form';

import ClaySelect from '@clayui/form';
import ClayTable from '@clayui/table';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const PinsList = ({
		cPins, 
		imageSettings
	}) => {
	const [value, setValue] = useState('one');
	// const cPins = []
	console.log(cPins);


	const productQuantityChange = () => {
		console.log('changed value');
	};

	const diagramStyle = {
		height: `${imageSettings.height}`,
	};

	const options = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5];

	return (
		<div
			className={classnames(
				imageSettings.listWidth,
				'pins-list col-12 col-lg-4'
			)}
			// style={diagramStyle}
		>
			<div className="bg-white row" 
			// style={diagramStyle}
			>
			
				<div className="align-items-center align-middle col-12 d-flex title">
					<h3>Products</h3>
				</div>

				<div className="align-items-center align-middle col-12 d-flex title">
					<ClayTable>
						<ClayTable.Head>
							<ClayTable.Row>
								
								<ClayTable.Cell headingCell>
									Check
								</ClayTable.Cell>
								
								<ClayTable.Cell headingCell>
									Position
								</ClayTable.Cell>
								
								<ClayTable.Cell headingCell>
									Product Name / SKU
								</ClayTable.Cell>
								
								<ClayTable.Cell headingCell>
									SKU or Diagram
								</ClayTable.Cell>
								
								<ClayTable.Cell headingCell>
										Quantity
								</ClayTable.Cell>
								
								<ClayTable.Cell headingCell>Price</ClayTable.Cell>
								
								<ClayTable.Cell alt="actions">
									(Actions)
								</ClayTable.Cell>

							</ClayTable.Row>
						</ClayTable.Head>
						<ClayTable.Body>

						{Array.from(cPins).map((pin, i) => {
							console.log(pin)
							return (
								
								<ClayTable.Row>
									
									{/* <ClayTable.Cell>
										<p><strong>{pin.id}</strong></p>
									</ClayTable.Cell> */}

									<ClayTable.Cell>
										<strong>{pin.label}</strong>
										<p>{pin.sku}</p>
									</ClayTable.Cell>

									<ClayTable.Cell headingTitle>
										<ClayInput type="checkbox" />
									</ClayTable.Cell> */}
									{/* 									
									<ClayTable.Cell>
										<ClaySelect
											aria-label="Quantity"
											className="ml-3 mr-3"
											id="quantity-select"
											onChange={productQuantityChange}
											value={value}
										>
											{options.map((value) => (
												<ClaySelect.Option
													key={value}
													label={`${value * 100}%`}
													value={pin.quantity}
												/>
											))}
										</ClaySelect>
									
									</ClayTable.Cell> */}

									<ClayTable.Cell>
										{pin.currency}
										<strong>{pin.reguar_price}</strong>

										{pin.discounted_price && (
											<p>{pin.discounted_price}</p>
										)}
									</ClayTable.Cell>

									<ClayTable.Cell>
										actions
									</ClayTable.Cell>
							</ClayTable.Row>
								
						)})}
						
						</ClayTable.Body>
					</ClayTable>
				</div>

			</div>
			<ClayButton type="primary">Add To Cart Selected Product</ClayButton>
		</div>
	);
};

PinsList.default = {
	cPins: []
};

PinsList.propTypes = {
	cPins: PropTypes.arrayOf(
		PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			draggable: PropTypes.bool,
			fill: PropTypes.string,
			id: PropTypes.number,
			label: PropTypes.string,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			r: PropTypes.number,
			sku: PropTypes.string,
		})
	),
};

export default PinsList;
