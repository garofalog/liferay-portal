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

import launcher from '../../../src/main/resources/META-INF/resources/components/shop_by_diagram/entry';

import '../../../src/main/resources/META-INF/resources/styles/main.scss';

const props = {
        activeViewSettings: {},
        apiURL: '/dataset-display-nested-items',
        appURL: '/o/frontend-taglib-clay/app',
        bulkActions: [
            {
                href: '/side-panel/edit.html',
                icon: 'plus',
                label: 'Add',
                target: 'sidePanel',
            },
            {
                href: '/delete',
                icon: 'trash',
                label: 'Delete',
                method: 'delete',
            },
        ],
        creationMenu: {
            primaryItems: [
                {
                    href: 'modal/url',
                    label: 'Add',
                    target: 'modal',
                },
            ],
        },
        filters: [
            {
                id: 'number-test',
                inputText: '$',
                label: 'Number',
                max: 200,
                min: 20,
                operator: 'eq',
                type: 'number',

                // value: 123,
            },
            {
                id: 'order-date',
                label: 'Order Range',
                max: {
                    day: 2,
                    month: 9,
                    year: 2026,
                },
                min: {
                    day: 14,
                    month: 6,
                    year: 2020,
                },
                placeholder: 'dd/mm/yyyy',
                type: 'dateRange',

                // value: {
                // 	from: {
                // 		day: 18,
                // 		month: 7,
                // 		year: 2020,
                // 	},
                // 	to: {
                // 		day: 18,
                // 		month: 7,
                // 		year: 2025,
                // 	},
                // },
            },
        ],
        id: 'tableTest',
        nestedItemsKey: 'skuId',
        nestedItemsReferenceKey: 'testSubItems',
        pageSize: 5,
        pagination: {
            deltas: [
                {
                    label: 5,
                },
                {
                    label: 10,
                },
                {
                    label: 20,
                },
                {
                    label: 30,
                },
                {
                    label: 50,
                },
                {
                    href:
                        'http://localhost:8080/group/test-1/pending-orders?p_p_id=com_liferay_commerce_order_content_web_internal_portlet_CommerceOpenOrderContentPortlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_com_liferay_commerce_order_content_web_internal_portlet_CommerceOpenOrderContentPortlet_delta=75',
                    label: 75,
                },
            ],
            initialDelta: 10,
            initialPageNumber: 1,
            initialTotalItems: 40,
        },
        showPagination: true,
        sidePanelId: 'sidePanelTestId',
        spritemap: './assets/clay/icons.svg',
        style: 'fluid',
        views: [
            {
                contentRenderer: 'table',
                icon: 'table',
                label: 'Table',
                schema: {
                    fields: [
                        {
                            contentRenderer: 'image',
                            fieldName: 'img',
                            label: '',
                        },
                        {
                            contentRenderer: 'actionLink',
                            fieldName: 'name',
                            label: 'Name',
                            sortable: true,
                        },
                        {
                            actionId: 'edit',
                            contentRenderer: 'actionLink',
                            label: '',
                        },
                        {
                            actionId: 'delete',
                            contentRenderer: 'actionLink',
                            label: '',
                        },
                        {
                            actionId: 'alert',
                            contentRenderer: 'actionLink',
                            label: '',
                        },
                        {
                            actionId: 'select',
                            contentRenderer: 'actionLink',
                            label: '',
                        },
                        {
                            contentRenderer: 'tooltipPrice',
                            fieldName: 'price',
                            label: 'Price',
                        },
                        {
                            contentRenderer: 'quantitySelector',
                            fieldName: 'testQuantity',
                            label: 'Qt. Selector',
                        },
                    ],
                },
            },
            {
                contentRenderer: 'cards',
                icon: 'documents-and-media',
                label: 'Cards',
                schema: {
                    description: 'name',
                    href: 'productPage',
                    imgProps: 'img',
                    labels: 'status',
                    stickerProps: 'type',
                    title: 'skuId',
                },
            },
            {
                component: (props) => {
                    return (
                        <>
                            <h4 className="bg-dark mb-0 p-3 text-center text-white">
                                Hey, I&apos;m a custom template from the outside
						</h4>
                            {props.items.map((item) => (
                                <div
                                    className="bg-white p-3 text-center"
                                    key={item.skuId}
                                >
                                    <strong className="mr-3">{item.skuId}</strong>
                                    {item.name}
                                </div>
                            ))}
                        </>
                    );
                },
                icon: 'merge',
                id: 'custom-table',
                label: "Hey you don't know me",
                schema: {},
            },
        ],
    };


launcher('shop-by-diagram', 'shop-by-diagram', props);
