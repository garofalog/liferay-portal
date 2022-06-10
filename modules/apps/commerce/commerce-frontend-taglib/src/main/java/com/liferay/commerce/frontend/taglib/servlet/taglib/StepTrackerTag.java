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

import com.liferay.commerce.frontend.model.StepModel;
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

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author Fabio Diego Mastrorilli
 */
public class StepTrackerTag extends IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		try {
			HttpServletRequest httpServletRequest = getRequest();

			String randomKey =
				PortalUtil.generateRandomKey(httpServletRequest, "taglib") +
					StringPool.UNDERLINE;

			String stepTrackerId = randomKey + "stepTrackerId";

			ThemeDisplay themeDisplay =
				(ThemeDisplay)httpServletRequest.getAttribute(
					WebKeys.THEME_DISPLAY);

			PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();

			Map<String, Object> data = HashMapBuilder.<String, Object>put(
				"portletId", portletDisplay.getRootPortletId()
			).put(
				"spritemap", _spritemap
			).put(
				"steps", _steps
			).build();

			HttpServletResponse httpServletResponse =
				(HttpServletResponse)pageContext.getResponse();

			_reactRenderer.renderReact(
				new ComponentDescriptor(
					"commerce-frontend-js/components/step_tracker/StepTracker",
					stepTrackerId),
				data, httpServletRequest, httpServletResponse.getWriter());
		}
		catch (Exception exception) {
			_log.error(exception);

			return SKIP_BODY;
		}

		return SKIP_BODY;
	}

	public String getSpritemap() {
		return _spritemap;
	}

	public List<StepModel> getSteps() {
		return _steps;
	}

	@Override
	public void setPageContext(PageContext pageContext) {
		super.setPageContext(pageContext);

		setServletContext(ServletContextUtil.getServletContext());
	}

	public void setSpritemap(String spritemap) {
		_spritemap = spritemap;
	}

	public void setSteps(List<StepModel> steps) {
		_steps = steps;
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_reactRenderer = null;
		_spritemap = null;
		_steps = null;
	}

	@Override
	protected void setAttributes(HttpServletRequest httpServletRequest) {
		if (Validator.isNull(_spritemap)) {
			ThemeDisplay themeDisplay =
				(ThemeDisplay)httpServletRequest.getAttribute(
					WebKeys.THEME_DISPLAY);

			_spritemap = FrontendIconsUtil.getSpritemap(themeDisplay);
		}

		httpServletRequest.setAttribute(
			"liferay-commerce:step-tracker:spritemap", _spritemap);
		httpServletRequest.setAttribute(
			"liferay-commerce:step-tracker:steps", _steps);
	}

	private static final Log _log = LogFactoryUtil.getLog(StepTrackerTag.class);

	private ReactRenderer _reactRenderer;
	private String _spritemap;
	private List<StepModel> _steps;

}