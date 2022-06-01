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

package com.liferay.commerce.frontend.taglib.servlet.taglib;

import com.liferay.commerce.constants.CommerceWebKeys;
import com.liferay.commerce.context.CommerceContext;
import com.liferay.commerce.currency.model.CommerceCurrency;
import com.liferay.commerce.frontend.model.ProductSettingsModel;
import com.liferay.commerce.frontend.taglib.internal.servlet.ServletContextUtil;
import com.liferay.commerce.frontend.util.ProductHelper;
import com.liferay.commerce.inventory.engine.CommerceInventoryEngine;
import com.liferay.commerce.model.CommerceOrder;
import com.liferay.commerce.model.CommerceOrderItem;
import com.liferay.commerce.order.CommerceOrderHttpHelper;
import com.liferay.commerce.product.catalog.CPCatalogEntry;
import com.liferay.commerce.product.catalog.CPSku;
import com.liferay.commerce.product.content.util.CPContentHelper;
import com.liferay.commerce.service.CommerceOrderItemLocalService;
import com.liferay.commerce.util.CommerceUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.template.react.renderer.ComponentDescriptor;
import com.liferay.portal.template.react.renderer.ReactRenderer;
import com.liferay.taglib.util.IncludeTag;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author Fabio Diego Mastrorilli
 * @author Gianmarco Brunialti Masera
 * @author Ivica Cardic
 * @author Alessio Antonio Rendina
 */
public class AddToCartTag extends IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		try {
			HttpServletRequest httpServletRequest = getRequest();

			CommerceContext commerceContext =
				(CommerceContext)httpServletRequest.getAttribute(
					CommerceWebKeys.COMMERCE_CONTEXT);

			_commerceAccountId = CommerceUtil.getCommerceAccountId(
				commerceContext);

			CommerceOrder commerceOrder = commerceContext.getCommerceOrder();

			CPSku cpSku = null;
			boolean hasChildCPDefinitions = false;

			if (_cpCatalogEntry != null) {
				cpSku = _cpContentHelper.getDefaultCPSku(_cpCatalogEntry);
				hasChildCPDefinitions = _cpContentHelper.hasChildCPDefinitions(
					_cpCatalogEntry.getCPDefinitionId());
			}

			String sku = null;

			if ((cpSku != null) && !hasChildCPDefinitions) {
				_cpInstanceId = cpSku.getCPInstanceId();
				_disabled =
					!cpSku.isPurchasable() ||
					((_commerceAccountId <= 0) &&
					 !_commerceOrderHttpHelper.isGuestCheckoutEnabled(
						 httpServletRequest));
				sku = cpSku.getSku();

				if (commerceOrder != null) {
					List<CommerceOrderItem> commerceOrderItems =
						_commerceOrderItemLocalService.getCommerceOrderItems(
							commerceOrder.getCommerceOrderId(),
							cpSku.getCPInstanceId(), 0, 1);

					if (!commerceOrderItems.isEmpty()) {
						_inCart = true;
					}
				}
			}

			if (sku != null) {
				_stockQuantity = _commerceInventoryEngine.getStockQuantity(
					PortalUtil.getCompanyId(httpServletRequest),
					commerceContext.getCommerceChannelGroupId(), sku);

				_productSettingsModel = _productHelper.getProductSettingsModel(
					cpSku.getCPInstanceId());

				if (!_disabled) {
					_disabled =
						(!_productSettingsModel.isBackOrders() &&
						 (_stockQuantity <= 0)) ||
						!cpSku.isPublished() || !cpSku.isPurchasable();
				}
			}

			Map<String, Object> data = HashMapBuilder.<String, Object>put(
				"accountId", _commerceAccountId
			).put(
				"cartId",
				() -> {
					if (commerceOrder != null) {
						return commerceOrder.getCommerceOrderId();
					}

					return 0;
				}
			).put(
				"channel",
				() -> {
					CommerceCurrency commerceCurrency =
						commerceContext.getCommerceCurrency();

					return JSONUtil.put(
						"currencyCode", commerceCurrency.getCode()
					).put(
						"groupId", commerceContext.getCommerceChannelGroupId()
					).put(
						"id", commerceContext.getCommerceChannelId()
					);
				}
			).put(
				"cpInstance",
				JSONUtil.put(
					"inCart", _inCart
				).put(
					"skuId", _cpInstanceId
				).put(
					"skuOptions",
					() -> {
						if (Validator.isBlank(_skuOptions)) {
							return JSONFactoryUtil.createJSONArray();
						}

						return JSONFactoryUtil.createJSONArray(_skuOptions);
					}
				).put(
					"stockQuantity", _stockQuantity
				)
			).put(
				"disabled", _disabled
			).put(
				"settings",
				JSONUtil.put(
					"alignment", _alignment
				).put(
					"iconOnly", _iconOnly
				).put(
					"iconOnly", _iconOnly
				).put(
					"inline", _inline
				).put(
					"namespace", _namespace
				).put(
					"productConfiguration",
					JSONUtil.put(
						"allowBackOrder", _productSettingsModel.isBackOrders()
					).put(
						"allowedOrderQuantities",
						_productSettingsModel.getAllowedQuantities()
					).put(
						"maxOrderQuantity",
						_productSettingsModel.getMaxQuantity()
					).put(
						"minOrderQuantity",
						_productSettingsModel.getMinQuantity()
					).put(
						"multipleOrderQuantity",
						_productSettingsModel.getMultipleQuantity()
					)
				).put(
					"size", _size
				)
			).build();

			HttpServletResponse httpServletResponse =
				(HttpServletResponse)pageContext.getResponse();

			String randomKey =
				PortalUtil.generateRandomKey(httpServletRequest, "taglib") +
					StringPool.UNDERLINE;

			String componentId = randomKey + "add_to_cart";

			_reactRenderer.renderReact(
				new ComponentDescriptor(
					"commerce-frontend-js/components/add_to_cart/AddToCart",
					componentId),
				data, httpServletRequest, httpServletResponse.getWriter());
		}
		catch (Exception exception) {
			_log.error(exception);

			return SKIP_BODY;
		}

		return SKIP_BODY;
	}

	public String getAlignment() {
		return _alignment;
	}

	public CPCatalogEntry getCPCatalogEntry() {
		return _cpCatalogEntry;
	}

	public long getCPInstanceId() {
		return _cpInstanceId;
	}

	public boolean getIconOnly() {
		return _iconOnly;
	}

	public boolean getInline() {
		return _inline;
	}

	public String getNamespace() {
		return _namespace;
	}

	public String getSize() {
		return _size;
	}

	public String getSkuOptions() {
		return _skuOptions;
	}

	public void setAlignment(String alignment) {
		_alignment = alignment;
	}

	public void setCPCatalogEntry(CPCatalogEntry cpCatalogEntry) {
		_cpCatalogEntry = cpCatalogEntry;
	}

	public void setCPInstanceId(long cpInstanceId) {
		_cpInstanceId = cpInstanceId;
	}

	public void setIconOnly(boolean iconOnly) {
		_iconOnly = iconOnly;
	}

	public void setInline(boolean inline) {
		_inline = inline;
	}

	public void setNamespace(String namespace) {
		_namespace = namespace;
	}

	@Override
	public void setPageContext(PageContext pageContext) {
		super.setPageContext(pageContext);

		setServletContext(ServletContextUtil.getServletContext());

		_commerceOrderHttpHelper =
			ServletContextUtil.getCommerceOrderHttpHelper();
		_commerceInventoryEngine =
			ServletContextUtil.getCommerceInventoryEngine();
		_commerceOrderItemLocalService =
			ServletContextUtil.getCommerceOrderItemLocalService();
		_cpContentHelper = ServletContextUtil.getCPContentHelper();
		_productHelper = ServletContextUtil.getProductHelper();
		_reactRenderer = ServletContextUtil.getReactRenderer();
	}

	public void setSize(String size) {
		_size = size;
	}

	public void setSkuOptions(String skuOptions) {
		_skuOptions = skuOptions;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_alignment = "center";
		_commerceAccountId = 0;
		_commerceInventoryEngine = null;
		_commerceOrderHttpHelper = null;
		_commerceOrderItemLocalService = null;
		_cpCatalogEntry = null;
		_cpContentHelper = null;
		_cpInstanceId = 0;
		_disabled = false;
		_iconOnly = false;
		_inCart = false;
		_inline = false;
		_namespace = StringPool.BLANK;
		_productHelper = null;
		_productSettingsModel = null;
		_reactRenderer = null;
		_size = "md";
		_skuOptions = null;
		_stockQuantity = 0;
	}

	private static final Log _log = LogFactoryUtil.getLog(AddToCartTag.class);

	private String _alignment = "center";
	private long _commerceAccountId;
	private CommerceInventoryEngine _commerceInventoryEngine;
	private CommerceOrderHttpHelper _commerceOrderHttpHelper;
	private CommerceOrderItemLocalService _commerceOrderItemLocalService;
	private CPCatalogEntry _cpCatalogEntry;
	private CPContentHelper _cpContentHelper;
	private long _cpInstanceId;
	private boolean _disabled;
	private boolean _iconOnly;
	private boolean _inCart;
	private boolean _inline;
	private String _namespace = StringPool.BLANK;
	private ProductHelper _productHelper;
	private ProductSettingsModel _productSettingsModel;
	private ReactRenderer _reactRenderer;
	private String _size = "md";
	private String _skuOptions;
	private int _stockQuantity;

}