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
import {ClaySelect} from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayLink from '@clayui/link';
import React, {useState} from 'react';
const DiagramSearchBy = ({
	
}) => {
	const [typeSearch, setTypeSearch] = useState();
	const [yearSearch, setYearSearch] = useState();
	const [makeSearch, setMakeSearch] = useState();
	const [modelSearch, setModelSearch] = useState();
	const [submodelSearch, setSubmodelSearch] = useState();
	const [engineSearch, setEngineSearch] = useState();

	const handleTypeChange = () => {
		console.log('ciao');
	};


	const options = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5];

	return (
		<div className="d-flex diagram-search-by row">

			<ClayCard className="w-100">
				<ClayCard.Body className="p-0">
					<h3 className=" card-header">Search By</h3>

					<ClayCard.Row>
						<div className="col col-xs-4 mb-1">
							<label className="ml-3">Type</label>
							<ClaySelect
								aria-label="Search By Type"

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

						<div className="col col-xs-4 mb-1">
							<label className="ml-3">Year</label>
							<ClaySelect
								aria-label="Search By Year"
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

						<div className="col col-xs-4 mb-1">
							<label className="ml-3">Make</label>
							<ClaySelect
								aria-label="Search By Make"

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

						<div className="col col-xs-4 mb-1">
							<label className="ml-3">Model</label>
							<ClaySelect
								aria-label="Search By Model"

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

						<div className="col col-xs-4 mb-1">
							<label className="ml-3">Submodel</label>
							<ClaySelect
								aria-label="Search By Submodel"

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

						<div className="col col-xs-4 mb-1">
							<label className="ml-3">Engine</label>
							<ClaySelect
								aria-label="Search By Engine"

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

					</ClayCard.Row>

					<ClayCard.Row>
						<div className="col mt-1">
							<ClayLink
								borderless
								className="ml-3"
								displayType="primary"
								href="#link-styles"
							>
								<strong>Clear</strong>
							</ClayLink>
						</div>
						<div className="col">
							<ClayButton>{"Save"}</ClayButton>

						</div>
					</ClayCard.Row>


					
				</ClayCard.Body>
			</ClayCard>
			
		
		

			
		</div>
	);
};

export default DiagramSearchBy;
