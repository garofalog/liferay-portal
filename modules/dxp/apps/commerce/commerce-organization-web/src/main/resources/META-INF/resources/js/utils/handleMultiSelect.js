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

let items = null;

export function parseSelectableItem(selectedNodes, nodesGroup) {
    const unselectableItemIds = new Set();

    selectedNodes.forEach(element => {

        const descendants = element.descendants();
        descendants.shift();
        
        const ancestors = element.ancestors();
        ancestors.shift();

        [
            ...ancestors,
            ...descendants
        ].forEach(descendant => {
            unselectableItemIds.add(descendant.data.id)
        })
    });

    items = nodesGroup.selectAll('.chart-item');
    
    items.each((d, index, nodeList) => {
        if(unselectableItemIds.has(d.data.id) || d.data.type === 'user') {
            nodeList[index].classList.add('unselectable');
            d.data.selectable = false;
        } else {
            nodeList[index].classList.add('selectable');
            d.data.selectable = true;
        }
    })
}

export function resetSelectableItem() {
    if(items) {
        items.each((_d, index, nodeList) => {
            nodeList[index].classList.remove('unselectable');
            nodeList[index].__data__.selectable = undefined;
        })
    }

    items = null;
}