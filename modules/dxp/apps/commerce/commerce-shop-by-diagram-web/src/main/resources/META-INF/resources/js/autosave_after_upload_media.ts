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

import { useLiferayState } from '@liferay/frontend-js-state-web';

// import {State} from '@liferay/frontend-js-state-web';

const userSelector = State.selector('imageSelectorCoverImage', (get) => {
	const fileEntryId = get('fileEntryId');

	return `${fileEntryId}`;
});
console.log(userSelector)

import {Selector} from 'frontend-js-state-web';

export default function() {
    const itemSelectorAdded = Liferay.State.subscribe({
        get: ({get}) => {
            const fileEntryId = get('fileEntryId');

             return `${fileEntryId}`;
        },
        key: 'imageSelectorCoverImage',
    });

    console.log(itemSelectorAdded)

}