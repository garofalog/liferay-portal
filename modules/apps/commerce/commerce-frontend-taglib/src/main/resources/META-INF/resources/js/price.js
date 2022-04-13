import price from 'commerce-frontend-js/components/price/entry';

export default function ({
	displayDiscountLevels,
	namespace,
	netPrice,
	price,
	standalone,
}) {
	price(`${namespace}price`, `${namespace}price`, {
		displayDiscountLevels,
		namespace,
		netPrice,
		price,
		standalone,
	});
}
