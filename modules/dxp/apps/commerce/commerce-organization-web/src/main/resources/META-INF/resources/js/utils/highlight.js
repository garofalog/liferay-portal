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

let highlightedLinks;
let highlightedNodes;

export function highlight(node, nodesGroup, linksGroup) {
	const ancestorIds = node.ancestors().map((d) => d.data.id);

	highlightedNodes = nodesGroup
		.selectAll('.chart-item')
		.filter((d) => ancestorIds.includes(d.data.id));

	highlightedLinks = linksGroup
		.selectAll('.chart-link')
		.filter((d) => ancestorIds.includes(d.target.data.id));

	highlightedLinks.each((_node, _index, nodeInstances) => {
		nodeInstances.forEach(nodeInstance => {
			nodeInstance.parentElement.append(nodeInstance);
		});
	});

	highlightedLinks.classed('highlighted', true);
	highlightedNodes.classed('highlighted', true);
}

export function removeHighlight() {
	if (highlightedLinks && highlightedNodes) {
		highlightedLinks.classed('highlighted', false);
		highlightedNodes.classed('highlighted', false);

		highlightedLinks = null;
		highlightedNodes = null;
	}
}
