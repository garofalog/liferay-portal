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
import com.liferay.commerce.frontend.taglib.internal.servlet.ServletContextUtil;
import com.liferay.commerce.product.catalog.CPCatalogEntry;
import com.liferay.commerce.product.catalog.CPSku;
import com.liferay.commerce.product.content.util.CPContentHelper;
import com.liferay.commerce.util.CommerceUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.template.react.renderer.ComponentDescriptor;
import com.liferay.portal.template.react.renderer.ReactRenderer;
import com.liferay.taglib.util.IncludeTag;

import java.io.IOException;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;

/**
 * @author Gianmarco Brunialti Masera
 */
public class AddToWishListTag extends IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		try {
			HttpServletRequest httpServletRequest = getRequest();

			_commerceAccountId = CommerceUtil.getCommerceAccountId(
				(CommerceContext)httpServletRequest.getAttribute(
					CommerceWebKeys.COMMERCE_CONTEXT));

			CPSku cpSku = _cpContentHelper.getDefaultCPSku(_cpCatalogEntry);

			ThemeDisplay themeDisplay =
				(ThemeDisplay)httpServletRequest.getAttribute(
					WebKeys.THEME_DISPLAY);

			_inWishList = _cpContentHelper.isInWishList(
				cpSku, _cpCatalogEntry, themeDisplay);

			if (cpSku != null) {
				_skuId = cpSku.getCPInstanceId();
			}

			String randomKey =
				PortalUtil.generateRandomKey(httpServletRequest, "taglib") +
					StringPool.UNDERLINE;

			String addToWishListId = randomKey + "add_to_wish_list";

			Map<String, Object> data = HashMapBuilder.<String, Object>put(
				"accountId", _commerceAccountId
			).put(
				"addToWishListId", addToWishListId
			).put(
				"cpDefinitionId", _cpCatalogEntry.getCPDefinitionId()
			).put(
				"isInWishList", _inWishList
			).put(
				"large", _large
			).put(
				"skuId", _skuId
			).build();

			HttpServletResponse httpServletResponse =
				(HttpServletResponse)pageContext.getResponse();

			_writePlaceholder(addToWishListId, httpServletRequest);

			_reactRenderer.renderReact(
				new ComponentDescriptor(
					"commerce-frontend-js/components/add_to_wish_list" +
						"/AddToWishList",
					addToWishListId),
				data, httpServletRequest, httpServletResponse.getWriter());
		}
		catch (Exception exception) {
			_log.error(exception);

			return SKIP_BODY;
		}

		return SKIP_BODY;
	}

	public CPCatalogEntry getCPCatalogEntry() {
		return _cpCatalogEntry;
	}

	public boolean isLarge() {
		return _large;
	}

	@Override
	public void setAttributes(HttpServletRequest httpServletRequest) {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		setNamespacedAttribute(
			httpServletRequest, "commerceAccountId", _commerceAccountId);
		setNamespacedAttribute(
			httpServletRequest, "cpCatalogEntry", _cpCatalogEntry);
		setNamespacedAttribute(httpServletRequest, "inWishList", _inWishList);
		setNamespacedAttribute(httpServletRequest, "large", _large);
		setNamespacedAttribute(httpServletRequest, "skuId", _skuId);
	}

	public void setCPCatalogEntry(CPCatalogEntry cpCatalogEntry) {
		_cpCatalogEntry = cpCatalogEntry;
	}

	public void setLarge(boolean large) {
		_large = large;
	}

	@Override
	public void setPageContext(PageContext pageContext) {
		super.setPageContext(pageContext);

		setServletContext(ServletContextUtil.getServletContext());

		_cpContentHelper = ServletContextUtil.getCPContentHelper();
		_reactRenderer = ServletContextUtil.getReactRenderer();
	}

	public void setSkuId(long skuId) {
		_skuId = skuId;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_commerceAccountId = 0;
		_cpCatalogEntry = null;
		_cpContentHelper = null;
		_inWishList = false;
		_large = false;
		_reactRenderer = null;
		_skuId = 0;
	}

	private void _writePlaceholder(
			String addToWishListId, HttpServletRequest httpServletRequest)
		throws IOException {

		String buttonCssClasses = "btn-outline-borderless btn btn-secondary";

		if (GetterUtil.getBoolean(_large)) {
			buttonCssClasses = buttonCssClasses.concat(" btn-lg");
		}
		else {
			buttonCssClasses = buttonCssClasses.concat(" btn-sm");
		}

		JspWriter jspWriter = pageContext.getOut();

		jspWriter.write("<div class=\"add-to-wish-list\" id=\"");
		jspWriter.write(addToWishListId);
		jspWriter.write("\">");
		jspWriter.write("<button class=\"");
		jspWriter.write(buttonCssClasses);
		jspWriter.write(" skeleton\" type=\"button\">");
		jspWriter.write("<span class=\"text-truncate-inline\">");
		jspWriter.write("<span class=\"font-weight-normal text-truncate\">");
		jspWriter.write(LanguageUtil.get(httpServletRequest, "add-to-list"));
		jspWriter.write("</span></span><span class=\"wish-list-icon\">");
		jspWriter.write("<svg class=\"lexicon-icon lexicon-icon-heart\"");
		jspWriter.write(" role=\"presentation\"></svg></span></button></div>");
	}

	private static final String _ATTRIBUTE_NAMESPACE =
		"liferay-commerce:add-to-wish-list:";

	private static final Log _log = LogFactoryUtil.getLog(
		AddToWishListTag.class);

	private long _commerceAccountId;
	private CPCatalogEntry _cpCatalogEntry;
	private CPContentHelper _cpContentHelper;
	private boolean _inWishList;
	private boolean _large;
	private ReactRenderer _reactRenderer;
	private long _skuId;

}