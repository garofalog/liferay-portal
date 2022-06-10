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

import com.liferay.commerce.frontend.taglib.internal.servlet.ServletContextUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.frontend.icons.FrontendIconsUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.theme.PortletDisplay;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.template.react.renderer.ComponentDescriptor;
import com.liferay.portal.template.react.renderer.ReactRenderer;
import com.liferay.taglib.util.IncludeTag;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author Fabio Diego Mastrorilli
 */
public class ModalTag extends IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		try {
			HttpServletRequest httpServletRequest = getRequest();

			String randomKey =
				PortalUtil.generateRandomKey(httpServletRequest, "taglib") +
					StringPool.UNDERLINE;

			String modalId = randomKey + "modal-root";

			ThemeDisplay themeDisplay =
				(ThemeDisplay)httpServletRequest.getAttribute(
					WebKeys.THEME_DISPLAY);

			PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();

			Map<String, Object> data = HashMapBuilder.<String, Object>put(
				"id", _id
			).put(
				"onClose", _refreshPageOnClose
			).put(
				"portletId", portletDisplay.getRootPortletId()
			).put(
				"size", _size
			).put(
				"spritemap", _spritemap
			).put(
				"title", _title
			).put(
				"url", _url
			).build();

			HttpServletResponse httpServletResponse =
				(HttpServletResponse)pageContext.getResponse();

			_reactRenderer.renderReact(
				new ComponentDescriptor(
					"commerce-frontend-js/components/modal/Modal", modalId),
				data, httpServletRequest, httpServletResponse.getWriter());
		}
		catch (Exception exception) {
			_log.error(exception);

			return SKIP_BODY;
		}

		return SKIP_BODY;
	}

	public String getId() {
		return _id;
	}

	public String getSize() {
		return _size;
	}

	public String getSpritemap() {
		return _spritemap;
	}

	public String getTitle() {
		return _title;
	}

	public String getUrl() {
		return _url;
	}

	public boolean isRefreshPageOnClose() {
		return _refreshPageOnClose;
	}

	public void setId(String id) {
		_id = id;
	}

	@Override
	public void setPageContext(PageContext pageContext) {
		super.setPageContext(pageContext);

		setServletContext(ServletContextUtil.getServletContext());
		_reactRenderer = ServletContextUtil.getReactRenderer();
	}

	public void setRefreshPageOnClose(boolean refreshPageOnClose) {
		_refreshPageOnClose = refreshPageOnClose;
	}

	public void setSize(String size) {
		_size = size;
	}

	public void setSpritemap(String spritemap) {
		_spritemap = spritemap;
	}

	public void setTitle(String title) {
		_title = title;
	}

	public void setUrl(String url) {
		_url = url;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_id = StringPool.BLANK;
		_reactRenderer = null;
		_refreshPageOnClose = false;
		_size = StringPool.BLANK;
		_spritemap = StringPool.BLANK;
		_title = StringPool.BLANK;
		_url = StringPool.BLANK;
	}

	@Override
	protected void setAttributes(HttpServletRequest httpServletRequest) {
		httpServletRequest = getRequest();

		if (Validator.isNull(_spritemap)) {
			ThemeDisplay themeDisplay =
				(ThemeDisplay)httpServletRequest.getAttribute(
					WebKeys.THEME_DISPLAY);

			_spritemap = FrontendIconsUtil.getSpritemap(themeDisplay);
		}

		httpServletRequest.setAttribute("liferay-commerce:modal:id", _id);
		httpServletRequest.setAttribute(
			"liferay-commerce:modal:refreshPageOnClose", _refreshPageOnClose);
		httpServletRequest.setAttribute("liferay-commerce:modal:size", _size);
		httpServletRequest.setAttribute(
			"liferay-commerce:modal:spritemap", _spritemap);
		httpServletRequest.setAttribute("liferay-commerce:modal:title", _title);
		httpServletRequest.setAttribute("liferay-commerce:modal:url", _url);
	}

	private static final Log _log = LogFactoryUtil.getLog(ModalTag.class);

	private String _id = StringPool.BLANK;
	private ReactRenderer _reactRenderer;
	private boolean _refreshPageOnClose;
	private String _size = StringPool.BLANK;
	private String _spritemap = StringPool.BLANK;
	private String _title = StringPool.BLANK;
	private String _url = StringPool.BLANK;

}