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
import React, {useEffect, useState} from 'react';

import CellPreview from './CellPreview';

const ImportPreviewModal = ({
	closeModal,
	csvHeaders,
	fieldsSelections,
	fileContent,
	handleEditCell,
	setStartImport,
}) => {
	const fileFieldsToMap = fieldsSelections
		? Object.keys(fieldsSelections)
		: {};
	const [fileContentPreview, setFileContentPreview] = useState([]);

	const fieldsIndexes = (csvHeaders, fieldsSelections) => {
		const fieldsIndex = [];
		Object.keys(fieldsSelections).filter((element, index) => {
			if (
				csvHeaders &&
				Object.keys(fieldsSelections).indexOf(element) > -1
			) {
				fieldsIndex.push(index);
			}
		});

		Object.values(fieldsSelections).filter((element) => {
			if (
				!csvHeaders &&
				Object.values(fieldsSelections).indexOf(element.toString()) > -1
			) {
				fieldsIndex.push(parseInt(element, 10));
			}
		});

		return fieldsIndex;
	};

	const previewContent = (fieldsIndex, fileContent) => {
		return fileContent.slice(0,10).map((row) => {
			return row.filter((element, index) => {
				if (fieldsIndex.includes(index)) {
					return element;
				}
			});
		})
	};

	useEffect(() => {
		if (Object.keys(fieldsSelections)?.length > 0) {
			const fieldsIndex = fieldsIndexes(csvHeaders, fieldsSelections);
			const previewLimitedToTenContent = previewContent(fieldsIndex, fileContent);
			setFileContentPreview(previewLimitedToTenContent);
		}
	}, [fieldsSelections, fileContent, csvHeaders]);

	return (
		<>
			<ClayModal.Header>
				{Liferay.Language.get('preview')}
			</ClayModal.Header>

			<ClayModal.Body className="p-2">
				<ClayTable borderless hover={false}>
					<ClayTable.Head>
						<ClayTable.Row>
							{Array.from(fileFieldsToMap).map(
								(element, index) => {
									return (
										<ClayTable.Cell headingCell key={index}>
											{element.charAt(0).toUpperCase() +
												element.slice(1)}
										</ClayTable.Cell>
									);
								}
							)}
						</ClayTable.Row>
					</ClayTable.Head>

					<ClayTable.Body className="inline-scroller w-100">
						{fileContentPreview?.map((row, index) => {
							return (
								<ClayTable.Row key={index}>
									{Object.values(row).map(
										(cell, cellIndex) => {
											return (
												<CellPreview
													cell={cell}
													cellIndex={cellIndex}
													fileRows={
														fileContentPreview
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
							data-testid="start-import"
							disabled={
								fieldsSelections?.length === 0 &&
								fileContentPreview?.length === 0
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
	);
};

export default ImportPreviewModal;
