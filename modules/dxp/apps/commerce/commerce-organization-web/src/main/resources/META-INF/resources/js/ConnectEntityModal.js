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
import ClayModal, {useModal} from '@clayui/modal';
import React, {useMemo} from 'react';

function AddOrganizationsContent() {
	return (
		<>
			<ClayModal.Header>
				{Liferay.Language.get('add-organizations')}
			</ClayModal.Header>
			<ClayModal.Body>
				<h1>{'Hello world!'}</h1>
			</ClayModal.Body>
		</>
	);
}
function AddUsersContent() {
	return (
		<>
			<ClayModal.Header>
				{Liferay.Language.get('add-users')}
			</ClayModal.Header>
			<ClayModal.Body>
				<h1>{'Hello world!'}</h1>
			</ClayModal.Body>
		</>
	);
}
function AddAccountsContent() {
	return (
		<>
			<ClayModal.Header>
				{Liferay.Language.get('add-accounts')}
			</ClayModal.Header>
			<ClayModal.Body>
				<h1>{'Hello world!'}</h1>
			</ClayModal.Body>
		</>
	);
}

const modalContents = {
	account: AddAccountsContent,
	organization: AddOrganizationsContent,
	user: AddUsersContent,
};

function ConnectEntityModal({
	newEntityType,
	parentNode,
	updateModalEntityType,
	updateModalParentNode,
}) {
	const closeModal = () => {
		updateModalParentNode(null);
	};

	const {observer, onClose} = useModal({
		onClose: closeModal,
	});

	const ModalContent = useMemo(() => {
		return modalContents[newEntityType];
	}, [newEntityType]);

	return (
		!!parentNode && (
			<ClayModal observer={observer} size="md">
				<ModalContent />
				<ClayModal.Footer
					first={
						<ClayButton.Group spaced>
							<ClayButton displayType="secondary">
								{Liferay.Language.get('cancel')}
							</ClayButton>
							<ClayButton onClick={onClose}>
								{Liferay.Language.get('cancel')}
							</ClayButton>
						</ClayButton.Group>
					}
				/>
			</ClayModal>
		)
	);
}

export default ConnectEntityModal;
