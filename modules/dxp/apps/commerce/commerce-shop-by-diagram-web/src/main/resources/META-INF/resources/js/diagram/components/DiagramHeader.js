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
import ClayDropDown from '@clayui/drop-down';
import ClayManagementToolbar from '@clayui/management-toolbar';
import ClaySlider from '@clayui/slider';
import classNames from 'classnames';
import React, {useState} from 'react';

import { PINS_RADIUS_MAX, PINS_RADIUS_MIN, PINS_RADIUS_OPTIONS, PINS_RADIUS_STEP } from '../utilities/constants';

function DiagramHeader({pinsRadius, updatePinsRadius}) {
	const [active, setActive] = useState(false);

	const smallActive = pinsRadius === PINS_RADIUS_OPTIONS.small;
	const mediumActive = pinsRadius === PINS_RADIUS_OPTIONS.medium;
	const largeActive = pinsRadius === PINS_RADIUS_OPTIONS.large;

	return (
		<ClayManagementToolbar className="py-2">
			<ClayManagementToolbar.ItemList>
				<ClayManagementToolbar.Item>
					<label className="mr-1">
						{Liferay.Language.get('circle-diameter')}
					</label>
					<ClayDropDown
						active={active}
						className="my-auto"
						onActiveChange={setActive}
						trigger={
							<ClayButton displayType="secondary">
								{Liferay.Language.get('default-diameter')}
							</ClayButton>
						}
					>
						<ClayDropDown.ItemList>
							<ClayDropDown.Group
								header={Liferay.Language.get('standard')}
							>
								<ClayDropDown.Item 
									active={smallActive}
									onClick={() => updatePinsRadius(PINS_RADIUS_OPTIONS.small)}
								>
									{Liferay.Language.get('small')}
								</ClayDropDown.Item>
								<ClayDropDown.Item 
									active={mediumActive}
									onClick={() => updatePinsRadius(PINS_RADIUS_OPTIONS.medium)}
								>
									{Liferay.Language.get('medium')}
								</ClayDropDown.Item>
								<ClayDropDown.Item 
									active={largeActive}
									onClick={() => updatePinsRadius(PINS_RADIUS_OPTIONS.large)}
								>
									{Liferay.Language.get('large')}
								</ClayDropDown.Item>

								<ClayDropDown.Item >
									<div className="form-group">
										<label htmlFor="custom-radius-slider">{Liferay.Language.get('custom')}</label>
											
										<div className={classNames('slider-wrapper', {disabled: smallActive || mediumActive || largeActive})}>
											<ClaySlider
												id="custom-radius-slider"
												max={PINS_RADIUS_MAX}
												min={PINS_RADIUS_MIN}
												onValueChange={updatePinsRadius}
												showTooltip={false}
												step={PINS_RADIUS_STEP}
												value={pinsRadius}
											/>
										</div>
									</div>
								</ClayDropDown.Item>
							</ClayDropDown.Group>
						</ClayDropDown.ItemList>
					</ClayDropDown>
				</ClayManagementToolbar.Item>
			</ClayManagementToolbar.ItemList>
		</ClayManagementToolbar>
	);
}

export default DiagramHeader;
