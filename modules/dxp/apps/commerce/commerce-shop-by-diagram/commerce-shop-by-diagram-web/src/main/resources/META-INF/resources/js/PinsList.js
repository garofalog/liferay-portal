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

import ClayCard from '@clayui/card';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayDropDown from '@clayui/drop-down';
import ClayInput from '@clayui/form';
import ClaySelect from '@clayui/form';
import ClayTable from '@clayui/table';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const PinsList = ({
		cPins, 
		imageSettings,
		side,
	}) => {
	const [value, setValue] = useState('one');
	const [active, setActive] = useState(false);
	// const cPins = []
	console.log(cPins);


	const productQuantityChange = () => {
		console.log('changed value');
	};

	const options = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5];

	return (
		<div
			className={classnames(
				imageSettings.listWidth,
				'pins-list col col-lg-4'
			)}
			style={`height: ${imageSettings.height}`}
		>
			<ClayCard>
				<h3 className="card-header">Products</h3>
				<ClayCard.Body>
					<div className="overflow-hidden">

						<ClayTable>
							<ClayTable.Head>
								<ClayTable.Row>

									<ClayTable.Cell headingCell>
										Position
										</ClayTable.Cell>

									<ClayTable.Cell headingCell>
										{side === 'shopping-experience' ? 'Product Name / SKU' : 'SKU or Diagram'}
										</ClayTable.Cell>

									<ClayTable.Cell headingCell>
										Quantity
									</ClayTable.Cell>

									
									{side === 'shopping-experience' && (
										
										<ClayTable.Cell headingCell>
											Price
										</ ClayTable.Cell>

									)}

									{side !== 'shopping-experience' && (

										<ClayTable.Cell headingCell>
											
											Actions

										</ClayTable.Cell>

									)}

								</ClayTable.Row>
							</ClayTable.Head>
							<ClayTable.Body>

								{Array.from(cPins).map((pin, i) => {
									console.log(pin)
									
									return (

										<ClayTable.Row key={i}>

											<ClayTable.Cell alt="Position">
												<div>
												<p><strong>{pin.id}</strong></p>

												</div>
											</ClayTable.Cell>

											<ClayTable.Cell>
												<div>
													<strong>{pin.label}</strong>
													<p>{pin.sku}</p>
												</div>
											</ClayTable.Cell>

											<ClayTable.Cell headingTitle>
												{/* <ClayInput type="checkbox" /> */}
											</ClayTable.Cell> */}

											<ClayTable.Cell>
												{/* <ClaySelect
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
												</ClaySelect> */}

											</ClayTable.Cell>

											{side === 'shopping-experience' && (
												<ClayTable.Cell>
													<div>
													{pin.currency}
												<strong>{pin.reguar_price}</strong>

												{pin.discounted_price && (
													<p>{pin.discounted_price}</p>
												)}

													</div>
												</ClayTable.Cell>
											)}

											{side !== 'shopping-experience' && (
												<ClayTable.Cell>
													<ClayDropDown
														trigger={<ClayButtonWithIcon type="secondary" symbol="ellipsis-v" />}
														active={active}
														onActiveChange={setActive}
													>
														<ClayDropDown.ItemList>
																{[
																	{ href: '#one', label: 'one' },
																	{ href: '#two', label: 'two' },
																	{ href: '#three', label: 'three' },
																].map((item, i) => (
																	<ClayDropDown.Item href={item.href} key={i}>
																		{item.label}
																	</ClayDropDown.Item>
																))}
														</ClayDropDown.ItemList>
													</ClayDropDown>
												</ClayTable.Cell>
											)}

										</ClayTable.Row>

									)
								})}

							</ClayTable.Body>
						</ClayTable>

					</div>
					
					<ClayButton type="primary">Add To Cart Selected Product</ClayButton>
				</ClayCard.Body>
			</ClayCard>
	
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
