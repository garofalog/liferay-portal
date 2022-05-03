import DropDown from 'commerce-frontend-js/components/dropdown/entry';

import {debounce} from 'commerce-frontend-js';
import {OPEN_MODAL} from '../../utilities/eventsDefinitions';

export default function ({
	namespace,
	myWorkflowTasksPortletNamespace,
	assignToURL,
	assignToMeURL,
	dropDownItems,submitCheck,
	actionId,
	formId,
	spritemapIcon,
}) {
	const assignToMe = document.querySelector(
			`${namespace}assign-to-me-modal-opener`
		),
		assignTo = document.querySelector(`${namespace}assign-to-modal-opener`),
		modalOpener = document.querySelector('#erc-edit-modal-opener'),
		actionIdElement = document.getElementById(actionId),
		toggleDropdownButton = document.getElementById(
			`${namespace}toggleDropdown`
		),
		commerceHeader = document.querySelector('.commerce-header'),
		pageHeader = document.querySelector('.page-header');
		formWrapper = document.getElementById(formId)

	function openModal(event) {
		event.preventDefault();
		Liferay.fire(OPEN_MODAL, {id: 'erc-edit-modal'});
	}

	function assignToMeModalOpener(event) {
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

	function assignToModalOpener(event) {
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

	function formSubmit(event) {
		event.preventDefault();
		if (!formWrapper) {
			throw new Error('Form with id: ' + formId + ' not found!');

			submitForm(formWrapper);
		}
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

	assignToMe.addEventListener('click', assignToMeModalOpener);

	assignTo.addEventListener('click', assignToModalOpener);

	toggleDropdownButton.addEventListener('click', toggleDropdown);

	if(formId !== '' && submitCheck){
		actionIdElement.addEventListener('click', formSubmit);

	}

	DropDown('dropdown-header', 'dropdown-header-container', {
		items: dropDownItems,
		spritemap: spritemapIcon,
	});

	if (pageHeader) {
		pageHeader.classList.add('sticky-header-menu');
		updateMenuDistanceFromTop();
		window.addEventListener('resize', debouncedUpdateMenuDistanceFromTop, {
			once: true,
		});
	}

	return {
		dispose() {
			modalOpener.removeEventListener('click', openModal);

			assignToMe.removeEventListener('click', assignToMeModalOpener);

			assignTo.removeEventListener('click', assignToModalOpener);

			toggleDropdownButton.removeEventListener('click', toggleDropdown);

			actionIdElement.removeEventListener('click', formSubmit);

			if(formId !== '' && submitCheck){
				actionIdElement.removeEventListener('click', formSubmit);
			}
			if (pageHeader) {
				window.removeEventListener(
					'resize',
					debouncedUpdateMenuDistanceFromTop,
					{once: true}
				);
			}
		},
	};
}
