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

import {hasPositionChanged} from '.';
import {ZOOM_EXTENT} from './constants';
import {disableHighlight, enableHighlight} from './highlight';

let mouseStartPositions = null;
let dragging = false;
let disabledNodeInstances;
let dragHandle;

function handleMouseDown(event) {
	mouseStartPositions = {
		x: event.offsetX,
		y: event.offsetY,
	};
}

function createDragHandle(startingNode, itemsTotal, nodesWrapper) {
	dragHandle = nodesWrapper
		.append('g')
		.attr('transform', startingNode.attributes.transform.value)
		.attr('class', 'dnd-handle');

	const container = dragHandle
		.append('g')
		.attr('class', 'dnd-handle-content');

	const startingNodeClone = startingNode.cloneNode(true);
	startingNodeClone.classList.remove('highlighted');
	startingNodeClone.removeAttribute('transform');

	const itemsToBeAppended = Math.min(3, itemsTotal - 1);
	const rectPlaceholder = startingNodeClone.querySelector('rect');

	for (let i = itemsToBeAppended; i > 0; i--) {
		container
			.append(() => rectPlaceholder.cloneNode())
			.attr('x', i * 3)
			.attr('y', i * 3);
	}

	container.append(() => startingNodeClone);
}

function handleMouseMove(
	event,
    d,
	startingNode,
	selectedNodeIds,
	nodesGroup,
	currentScale,
	root
) {
	if (!dragging) {
		if (
			hasPositionChanged(mouseStartPositions, {
				x: event.offsetX,
				y: event.offsetY,
			})
		) {
			disableHighlight();

			dragging = true;

			const nodesToBeDisabled = new Map();

			root.each(d => {
				if(selectedNodeIds.has(d.data.id)) {
					nodesToBeDisabled.set(d.data.id, d)
				}
			})

			for (const parentNodeToBeDisabled of nodesToBeDisabled.values()) {
				const descendants = parentNodeToBeDisabled.descendants()
				
				descendants.forEach((descendant) => {
					nodesToBeDisabled.set(descendant.data.id, descendant)
				})
			}

			disabledNodeInstances = nodesGroup
				.selectAll('.chart-item')
				.filter((d) => nodesToBeDisabled.has(d.data.id));

			
			createDragHandle(startingNode, selectedNodeIds.size, nodesGroup);

			disabledNodeInstances.classed('disabled', true);
		}

		return;
	}

	const handlerPosition = {
		x:
			(mouseStartPositions.x - event.offsetX) *
				(ZOOM_EXTENT[1] / currentScale) *
				-1 +
            d.y,
		y:
			(mouseStartPositions.y - event.offsetY) *
				(ZOOM_EXTENT[1] / currentScale) *
				-1 +
			d.x,
	};

	dragHandle.attr(
		'transform',
		`translate(${handlerPosition.x}, ${handlerPosition.y})`
	).classed('dragging', true);
}

function handleMouseUp(initialEvent, d, handleNodeClick) {
	if (!dragging) {
		return handleNodeClick(initialEvent, d);
	}

	mouseStartPositions = null;
	disabledNodeInstances.classed('disabled', false);
	dragging = false;
	dragHandle.remove();

	enableHighlight();
}

export function handleDnd(
	initialEvent,
	d,
	handleNodeClick,
	selectedNodeIds,
	svgRef,
	nodesGroup,
	currentScale,
	root
) {
	handleMouseDown(initialEvent);

    const nodesToBeDragged = selectedNodeIds.has(d.data.id) ? selectedNodeIds : new Set([d.data.id])
	const startingNodeInstance = initialEvent.currentTarget;

	const _handleMouseMove = (event) =>
		handleMouseMove(
			event,
            d,
			startingNodeInstance,
			nodesToBeDragged,
			nodesGroup,
			currentScale,
			root
		);

	svgRef.addEventListener('mousemove', _handleMouseMove);

	svgRef.addEventListener(
		'mouseup',
		() => {
			svgRef.removeEventListener('mousemove', _handleMouseMove);
			handleMouseUp(initialEvent, d, handleNodeClick, svgRef);
		},
		{once: true}
	);
}
