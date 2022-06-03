import {debounce} from 'frontend-js-web';
import {OPEN_MODAL} from '../../utilities/eventsDefinitions';

export default function ({
	namespace,
	myWorkflowTasksPortletNamespace,
	assignToURL,
	assignToMeURL,
}) {
	const assignToMe = document.querySelector(
			`${namespace}assign-to-me-modal-opener`
		),
		assignTo = document.querySelector(`${namespace}assign-to-modal-opener`),
		modalOpener = document.querySelector('#erc-edit-modal-opener'),
		toggleDropdownButton = document.getElementById(
			`${namespace}toggleDropdown`
		),
		commerceHeader = document.querySelector('.commerce-header'),
		pageHeader = document.querySelector('.page-header');

	function openModal(event) {
		event.preventDefault();
		Liferay.fire(OPEN_MODAL, {id: 'erc-edit-modal'});
	}

	function assignToModalOpener() {
		if (assignToMeURL) {
			Liferay.Util.openWindow({
				dialog: {
					destroyOnHide: true,
					height: 430,
					resizable: false,
					width: 896,
				},
				dialogIframe: {
					bodyCssClass: 'dialog-with-footer task-dialog',
				},
				id: `${myWorkflowTasksPortletNamespace}assignToDialog`,
				title: Liferay.Language.get('assign-to-me...'),
				uri: assignToMeURL,
			});
		}
		Liferay.Util.openWindow({
			dialog: {
				destroyOnHide: true,
				height: 430,
				resizable: false,
				width: 896,
			},
			dialogIframe: {
				bodyCssClass: 'dialog-with-footer task-dialog',
			},
			id: `${myWorkflowTasksPortletNamespace}assignToDialog`,
			title: Liferay.Language.get('assign-to-...'),
			uri: assignToURL,
		});
	}

	const toggleDropdown = () => {
		const dropdownElement = document.querySelector(
			`${namespace}commerce-dropdown-assigned-to`
		);

		if (dropdownElement) {
			if (dropdownElement.classList.contains('show')) {
				dropdownElement.classList.remove('show');
			}
			else {
				dropdownElement.classList.add('show');
			}
		}
	};

	function updateMenuDistanceFromTop() {
		if (!commerceHeader || !commerceHeader.getClientRects()[0]) return;
		const distanceFromTop = commerceHeader.getClientRects()[0].bottom;
		pageHeader.style.top = distanceFromTop + 'px';
	}

	const debouncedUpdateMenuDistanceFromTop = debounce(
		updateMenuDistanceFromTop,
		200
	);

	modalOpener.addEventListener('click', openModal);

	assignTo.addEventListener('click', assignToModalOpener);
	assignToMe.addEventListener('click', assignToModalOpener);

	toggleDropdownButton.addEventListener('click', toggleDropdown);

	if (pageHeader) {
		pageHeader.classList.add('sticky-header-menu');
		updateMenuDistanceFromTop();
		document.addEventListener(
			'resize',
			debouncedUpdateMenuDistanceFromTop,
			{
				once: true,
			}
		);
	}

	return {
		dispose() {
			modalOpener.removeEventListener('click', openModal);

			assignTo.removeEventListener('click', assignToModalOpener);

			toggleDropdownButton.removeEventListener('click', toggleDropdown);

			if (pageHeader) {
				document.removeEventListener(
					'resize',
					debouncedUpdateMenuDistanceFromTop,
					{once: true}
				);
			}
		},
	};
}
