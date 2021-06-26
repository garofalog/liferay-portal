/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import './Occurrence.scss';

import React from 'react';

import PanelNavigator from './PanelNavigator';

import type {ImpactValue, Result} from 'axe-core';

interface ICodeBlock extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function CodeBlock({children, ...otherProps}: ICodeBlock) {
	return (
		<div
			className="a11y-panel__sidebar--occurrence-panel-code-block"
			role="textbox"
			{...otherProps}
		>
			<div className="a11y-panel__sidebar--occurrence-panel-code-text p-2">
				{children}
			</div>
		</div>
	);
}

type OccurrenceProps = {
	navigationState?: {
		occurrenceIndex: number;
		occurrenceName: string;
		violationIndex: number;
	};
	previous?: () => void;
	violations: Array<Result>;
};

function Occurrence({navigationState, previous, violations}: OccurrenceProps) {
	if (!navigationState) {
		return null;
	}

	const {occurrenceIndex, occurrenceName, violationIndex} = navigationState;

	const currentViolation = violations[violationIndex];

	const {helpUrl, tags} = currentViolation;

	const {html, impact, target} = currentViolation.nodes[occurrenceIndex];

	return (
		<>
			<PanelNavigator
				helpUrl={helpUrl}
				impact={impact as ImpactValue}
				onBack={() => {
					if (previous) {
						previous();
					}
				}}
				tags={tags}
				title={occurrenceName}
			/>
			<div className="a11y-panel__sidebar--occurrence-description-wrapper">
				<p className="text-secondary">
					{Liferay.Language.get(
						'open-developer-tools-in-the-browser-to-see-the-selected-occurrence'
					)}
				</p>
				<div className="my-3">
					<strong>{Liferay.Language.get('target')}</strong>
				</div>
				<CodeBlock aria-label={Liferay.Language.get('target-selector')}>
					{target}
				</CodeBlock>
				<div className="my-3">
					<strong>{Liferay.Language.get('code')}</strong>
				</div>
				<CodeBlock
					aria-label={Liferay.Language.get('code-of-the-element')}
				>
					{html}
				</CodeBlock>
			</div>
		</>
	);
}

export default Occurrence;
