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

import ClayButton from '@clayui/button';
import ClayModal from '@clayui/modal';
import ClayTable from '@clayui/table';
import PropTypes from 'prop-types';
import React from 'react';

import CellPreview from './CellPreview';
import ImportProcessModal from './ImportProcessModal';

const ImportModal = ({
	closeModal,
	dbFields,
	fileContent,
	fileFields,
	formDataQuerySelector,
	formSubmitURL,
	observer,
	portletNamespace,
	setFileContent,
	setStartImport,
	startImport,
}) => {
	const handleEditCell = (newValue, cellIndex, rowIndex) => {
		const newRow = fileContent[rowIndex];
		const newFileContent = fileContent;
		Object.entries(newRow).forEach(([key], index) => {
			if (cellIndex === index) {
				newRow[key] = newValue;
			}
		});

		newFileContent.splice(rowIndex, 1, newRow);
		setFileContent(newFileContent);
	};

	return (
		<ClayModal observer={observer} size={startImport ? 'lg' : 'md'}>
			{!startImport && (
				<>
					<ClayModal.Header>
						{Liferay.Language.get('preview')}
					</ClayModal.Header>

					<ClayModal.Body>
						<ClayTable>
							<ClayTable.Head>
								<ClayTable.Row>
									{Array.from(fileFields).map(
										(element, index) => {
											return (
												<ClayTable.Cell
													headingCell
													key={index}
												>
													{element}
												</ClayTable.Cell>
											);
										}
									)}
								</ClayTable.Row>
							</ClayTable.Head>

							<ClayTable.Body>
								{fileContent.map((row, index) => {
									return (
										<ClayTable.Row key={index}>
											{Object.values(row).map(
												(cell, cellIndex) => {
													return (
														<CellPreview
															cell={cell}
															cellIndex={
																cellIndex
															}
															fileRows={
																fileContent
															}
															handleEditCell={
																handleEditCell
															}
															key={cellIndex}
															rowIndex={index}
														/>
													);
												}
											)}
										</ClayTable.Row>
									);
								})}
							</ClayTable.Body>
						</ClayTable>
					</ClayModal.Body>

					<ClayModal.Footer
						last={
							<ClayButton.Group spaced>
								<ClayButton
									displayType="secondary"
									onClick={closeModal}
								>
									{Liferay.Language.get('cancel')}
								</ClayButton>

								<ClayButton
									disabled={
										dbFields.length === 0 ||
										fileContent.length === 0
									}
									displayType="primary"
									onClick={() => setStartImport(true)}
									type="submit"
								>
									{Liferay.Language.get('start-import')}
								</ClayButton>
							</ClayButton.Group>
						}
					/>
				</>
			)}

			{startImport && (
				<ImportProcessModal
					closeModal={closeModal}
					formDataQuerySelector={formDataQuerySelector}
					formSubmitURL={formSubmitURL}
					namespace={portletNamespace}
					observer={observer}
				/>
			)}
		</ClayModal>
	);
};

ImportModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	formSubmitURL: PropTypes.string.isRequired,
	observer: PropTypes.object,
};

export default ImportModal;
