import {OPEN_MODAL} from 'commerce-frontend-js/utilities/eventsDefinitions';

export default function ({
	linkId,
	actionTargetId,
	actionTargetIdValidator,
	actionLabelValidator,
}) {
	const link = document.getElementById(linkId);

	function openModal(event) {
		event.preventDefault();
		Liferay.fire(OPEN_MODAL, {
			id: actionTargetId,
		});
	}

	if (link && actionLabelValidator && actionTargetIdValidator) {
		link.addEventListener('click', openModal);
	}

	return {
		dispose() {
			if (link && actionLabelValidator && actionTargetIdValidator) {
				link.removeEventListener('click', openModal);
			}
		},
	};
}
