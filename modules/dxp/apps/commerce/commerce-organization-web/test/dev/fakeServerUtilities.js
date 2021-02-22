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

const tree = [
	{
		id: 1,
		name: 'Liferay World',
		organizations: [
			{
				id: 2,
				name: 'Liferay Italy',
			},
			{
				id: 3,
				name: 'Liferay Spain',
			},
			{
				id: 4,
				name: 'Liferay Ireland',
			}
		]
	},
	{
		accounts: [
			{
				id: 11,
				name: 'Car Dealer'
			}
		],
		id: 5,
		name: 'Riuvo',
		users: [
			{
				id: 111,
				name: 'Fabio Mastrorilli'
			},
			{
				id: 113,
				name: 'Andrea Censi'
			},
		]
	}
];

const definitions = {
	accounts: {
		11: {
			id: 11,
			name: 'Car Dealer',
			users: [
				{
					id: 113,
					name: 'Luca Pellizon'
				}
			]
		},
	},
	organizations: {
		2: {
			id: 11,
			name: 'Liferay Italy',
			users: [
				{
					id: 111,
					name: 'Fabio Mastrorilli'
				},
				{
					id: 112,
					name: 'Andrea Censi'
				},
			]
		},
		3: {
			id: 12,
			name: 'Liferay Spain',
			users: [
				{
					id: 114,
					name: 'Julien Castelain'
				}
			]
		},
		4: {
			id: 13,
			name: 'Liferay Ireland',
		},
	},
	users: {
		111: {
			id: 111,
			name: 'Fabio Mastrorilli'
		},
		112: {
			id: 112,
			name: 'Andrea Censi'
		},
		113: {
			id: 113,
			name: 'Luca Pellizon'
		},
		114: {
			id: 114,
			name: 'Julien Castelain'
		}
	}
}

function defineServerResponses(app) {
	app.get('/get-account/', (_, res) => {
		res.json(Object.values(definitions.accounts));
	});

	app.get('/get-account/:id', (req, res) => {
		res.json(definitions.accounts[req.params.id]);
	});

	app.get('/get-organization/', (_, res) => {
		res.json(tree)
	});

	app.get('/get-organization/:id', (req, res) => {
		res.json(definitions.organizations[req.params.id]);
	});

	let timeoutOn = false;
	let processEnded = false;
	let success = false;

	app.delete('/o/fake-bulk-action/v1.0/products/0/batch', (_, res) => {
		if (!timeoutOn) {
			timeoutOn = true;
			success = !success;
			setTimeout(() => {
				timeoutOn = false;
				processEnded = true;
			}, 2000);
		}

		return res.json({
			className:
				'com.liferay.headless.commerce.admin.catalog.dto.v1_0.Product',
			contentType: 'JSON',
			errorMessage: '',
			executeStatus: 'INITIAL',
			id: 110,
			operation: 'DELETE',
		});
	});

	app.get('/o/fake-batch-engine/v1.0/import-task/:id', (req, res) => {
		if (processEnded && !timeoutOn) {
			processEnded = false;

			return res.json({
				className:
					'com.liferay.headless.commerce.admin.order.dto.v1_0.Order',
				contentType: 'JSON',
				endTime: '2020-06-08T15:08:02Z',
				errorMessage: 'Error: chocoPenguins are not defined',
				executeStatus: success ? 'COMPLETED' : 'FAILED',
				id: req.params.id,
				operation: 'DELETE',
				startTime: '2020-06-08T15:08:01Z',
			});
		}

		return res.json({
			className:
				'com.liferay.headless.commerce.admin.catalog.dto.v1_0.Product',
			contentType: 'JSON',
			endTime: '2020-06-08T15:13:34Z',
			errorMessage: '',
			executeStatus: 'STARTED',
			id: req.params.id,
			operation: 'DELETE',
			startTime: '2020-06-08T15:13:34Z',
		});
	});
}

module.exports = {
	defineServerResponses,
};
