import {fetch} from 'frontend-js-web';

export default function ({namespace, actionURL}) {
	const couponCodeIconRemove = window.document.getElementById(
		`${namespace}couponCodeIconRemove`
	);

	const applyCouponCodeButton = document.getElementById(
		`${namespace}applyCouponCodeButton`
	);

	function couponCodeIconRemoveHandler(event) {
		fetch(actionURL, {
			method: 'post',
		})
			.then((res) => {
				return res.json();
			})
			.then((payload) => {
				if (payload.success) {
					window.location.reload();
				}
				else {
					new Liferay.Notification({
						closeable: true,
						delay: {
							hide: 5000,
							show: 0,
						},
						duration: 500,
						message: Liferay.Language.get(
							'please-enter-a-valid-coupon-code'
						),
						render: true,
						title: Liferay.Language.get('danger'),
						type: 'danger',
					});
				}
			});
	}

	function applyCouponCodeButtonHandler(event) {
		const applyCouponActionURL =
			actionURL + document.getElementById(`${namespace}couponCode`).value;

		fetch(applyCouponActionURL, {
			method: 'post',
		})
			.then((res) => {
				return res.json();
			})
			.then((payload) => {
				if (payload.success) {
					window.location.reload();
				}
				else {
					new Liferay.Notification({
						closeable: true,
						delay: {
							hide: 5000,
							show: 0,
						},
						duration: 500,
						message: Liferay.Language.get(
							'please-enter-a-valid-coupon-code'
						),
						render: true,
						title: Liferay.Language.get('danger'),
						type: 'danger',
					});
				}
			});
	}

	applyCouponCodeButton.addEventListener(
		'click',
		applyCouponCodeButtonHandler,
		{
			once: true,
		}
	);

	couponCodeIconRemove.addEventListener(
		'click',
		couponCodeIconRemoveHandler,
		{once: true}
	);

	return {
		dispose() {
			applyCouponCodeButton.removeEventListener(
				'click',
				applyCouponCodeButtonHandler
			);

			couponCodeIconRemove.removeEventListener(
				'click',
				couponCodeIconRemoveHandler
			);
		},
	};
}
