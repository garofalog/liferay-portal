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

import com.liferay.commerce.account.model.CommerceAccount;
import com.liferay.commerce.constants.CommercePortletKeys;
import com.liferay.commerce.constants.CommerceWebKeys;
import com.liferay.commerce.context.CommerceContext;
import com.liferay.commerce.frontend.taglib.internal.model.CurrentCommerceAccountModel;
import com.liferay.commerce.frontend.taglib.internal.model.CurrentCommerceOrderModel;
import com.liferay.commerce.frontend.taglib.internal.model.WorkflowStatusModel;
import com.liferay.commerce.frontend.taglib.internal.servlet.ServletContextUtil;
import com.liferay.commerce.model.CommerceOrder;
import com.liferay.commerce.service.CommerceOrderTypeLocalService;
import com.liferay.petra.portlet.url.builder.PortletURLBuilder;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.LiferayWindowState;
import com.liferay.portal.kernel.portlet.PortletURLFactoryUtil;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.Constants;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.kernel.webserver.WebServerServletTokenUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import com.liferay.portal.template.react.renderer.ComponentDescriptor;
import com.liferay.portal.template.react.renderer.ReactRenderer;
import com.liferay.taglib.util.IncludeTag;

import java.util.Map;

import javax.portlet.PortletRequest;
import javax.portlet.PortletURL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.PageContext;

/**
 * @author Fabio Diego Mastrorilli
 */
public class AccountSelectorTag extends IncludeTag {

	@Override
	public void setPageContext(PageContext pageContext) {
		super.setPageContext(pageContext);

		_commerceOrderTypeLocalService =
			ServletContextUtil.getCommerceOrderTypeLocalService();

		setServletContext(ServletContextUtil.getServletContext());
	}

	@Override
	protected void cleanUp() {
		super.cleanUp();

		_commerceOrderTypeLocalService = null;
		_jsonFactory = null;
		_reactRenderer = null;
	}

	@Override
	protected void setAttributes(HttpServletRequest httpServletRequest) {
		try {
			ThemeDisplay themeDisplay =
				(ThemeDisplay)httpServletRequest.getAttribute(
					WebKeys.THEME_DISPLAY);

			HttpServletRequest parentHttpServletRequest = getRequest();

			CommerceContext commerceContext =
				(CommerceContext)parentHttpServletRequest.getAttribute(
					CommerceWebKeys.COMMERCE_CONTEXT);

			JSONSerializer jsonSerializer = _jsonFactory.createJSONSerializer();
			String[] accountEntryAllowedTypes =
				commerceContext.getAccountEntryAllowedTypes();

			int commerceOrderTypesCount =
				_commerceOrderTypeLocalService.getCommerceOrderTypesCount(
					themeDisplay.getCompanyId(), true);
			boolean showOrderTypeModal = false;

			if (commerceOrderTypesCount > 1) {
				showOrderTypeModal = true;
			}

			long commerceChannelId = commerceContext.getCommerceChannelId();

			CommerceAccount commerceAccount =
				commerceContext.getCommerceAccount();
			CurrentCommerceAccountModel currentCommerceAccountModel = null;

			if (commerceAccount != null) {
				String thumbnailUrl = null;

				if (commerceAccount.getLogoId() == 0) {
					thumbnailUrl =
						themeDisplay.getPathImage() +
							"/organization_logo?img_id=0";
				}
				else {
					thumbnailUrl = StringBundler.concat(
						themeDisplay.getPathImage(),
						"/organization_logo?img_id=",
						commerceAccount.getLogoId(), "&t=",
						WebServerServletTokenUtil.getToken(
							commerceAccount.getLogoId()));
				}

				currentCommerceAccountModel = new CurrentCommerceAccountModel(
					commerceAccount.getCommerceAccountId(), thumbnailUrl,
					commerceAccount.getName());
			}

			CommerceOrder commerceOrder = commerceContext.getCommerceOrder();

			CurrentCommerceOrderModel currentCommerceOrderModel = null;

			if (commerceOrder != null) {
				String workflowStatusInfoLabel =
					WorkflowConstants.getStatusLabel(commerceOrder.getStatus());

				WorkflowStatusModel workflowStatusModel =
					new WorkflowStatusModel(
						commerceOrder.getStatus(), workflowStatusInfoLabel,
						LanguageUtil.get(
							themeDisplay.getLocale(), workflowStatusInfoLabel));

				currentCommerceOrderModel = new CurrentCommerceOrderModel(
					commerceOrder.getCommerceOrderId(), workflowStatusModel);
			}

			Map<String, Object> data = HashMapBuilder.<String, Object>put(
				"accountEntryAllowedTypes",
				jsonSerializer.serializeDeep(accountEntryAllowedTypes)
			).put(
				"commerceChannelId", commerceChannelId
			).put(
				"createNewOrderURL", _getAddCommerceOrderURL(themeDisplay)
			).put(
				"currentCommerceAccount", currentCommerceAccountModel
			).put(
				"currentCommerceOrder", currentCommerceOrderModel
			).put(
				"selectOrderURL", _getEditOrderURL(themeDisplay)
			).put(
				"setCurrentAccountURL",
				PortalUtil.getPortalURL(parentHttpServletRequest) +
					PortalUtil.getPathContext() +
						"/o/commerce-ui/set-current-account"
			).put(
				"showOrderTypeModal", _getEditOrderURL(themeDisplay)
			).put(
				"showOrderTypeModal", showOrderTypeModal
			).build();

			String randomKey =
				PortalUtil.generateRandomKey(httpServletRequest, "taglib") +
					StringPool.UNDERLINE;

			String componentId = randomKey + "account_selector";

			_reactRenderer.renderReact(
				new ComponentDescriptor(
					"commerce-frontend-js/components/account_selector" +
						"/AccountSelector",
					componentId),
				data, httpServletRequest);
		}
		catch (PortalException portalException) {
			_log.error(portalException);
		}

	}

	private String _getAddCommerceOrderURL(ThemeDisplay themeDisplay)
		throws PortalException {

		int commerceOrderTypesCount =
			_commerceOrderTypeLocalService.getCommerceOrderTypesCount(
				themeDisplay.getCompanyId(), true);

		if (commerceOrderTypesCount > 1) {
			return PortletURLBuilder.create(
				_getPortletURL(
					themeDisplay.getRequest(),
					CommercePortletKeys.COMMERCE_OPEN_ORDER_CONTENT)
			).setMVCRenderCommandName(
				"/commerce_order_content/view_commerce_order_order_type_modal"
			).setWindowState(
				LiferayWindowState.POP_UP
			).buildString();
		}

		long plid = PortalUtil.getPlidFromPortletId(
			themeDisplay.getScopeGroupId(),
			CommercePortletKeys.COMMERCE_OPEN_ORDER_CONTENT);

		if (plid > 0) {
			return PortletURLBuilder.create(
				_getPortletURL(
					themeDisplay.getRequest(),
					CommercePortletKeys.COMMERCE_OPEN_ORDER_CONTENT)
			).setActionName(
				"/commerce_open_order_content/edit_commerce_order"
			).setCMD(
				Constants.ADD
			).buildString();
		}

		return StringPool.BLANK;
	}

	private String _getEditOrderURL(ThemeDisplay themeDisplay)
		throws PortalException {

		long plid = PortalUtil.getPlidFromPortletId(
			themeDisplay.getScopeGroupId(),
			CommercePortletKeys.COMMERCE_OPEN_ORDER_CONTENT);

		if (plid > 0) {
			return PortletURLBuilder.create(
				_getPortletURL(
					themeDisplay.getRequest(),
					CommercePortletKeys.COMMERCE_OPEN_ORDER_CONTENT)
			).setActionName(
				"/commerce_open_order_content/edit_commerce_order"
			).setCMD(
				"setCurrent"
			).setParameter(
				"commerceOrderId", "{id}"
			).buildString();
		}

		return StringPool.BLANK;
	}

	private PortletURL _getPortletURL(
			HttpServletRequest httpServletRequest, String portletId)
		throws PortalException {

		long groupId = PortalUtil.getScopeGroupId(httpServletRequest);

		long plid = PortalUtil.getPlidFromPortletId(groupId, portletId);

		if (plid > 0) {
			return PortletURLFactoryUtil.create(
				httpServletRequest, portletId, plid,
				PortletRequest.ACTION_PHASE);
		}

		return PortletURLFactoryUtil.create(
			httpServletRequest, portletId, PortletRequest.ACTION_PHASE);
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AccountSelectorTag.class);

	private CommerceOrderTypeLocalService _commerceOrderTypeLocalService;
	private JSONFactory _jsonFactory;
	private ReactRenderer _reactRenderer;

}