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

package com.liferay.commerce.product.options.web.internal.display.context;

import com.liferay.commerce.frontend.model.HeaderActionModel;
import com.liferay.commerce.product.configuration.CPOptionConfiguration;
import com.liferay.commerce.product.constants.CPConstants;
import com.liferay.commerce.product.display.context.util.CPRequestHelper;
import com.liferay.commerce.product.model.CPOption;
import com.liferay.commerce.product.servlet.taglib.ui.CPDefinitionScreenNavigationConstants;
import com.liferay.commerce.product.util.DDMFormFieldTypeUtil;
import com.liferay.dynamic.data.mapping.form.field.type.DDMFormFieldType;
import com.liferay.dynamic.data.mapping.form.field.type.DDMFormFieldTypeServicesTracker;
import com.liferay.frontend.taglib.clay.data.set.servlet.taglib.util.ClayDataSetActionDropdownItem;
import com.liferay.frontend.taglib.clay.servlet.taglib.util.CreationMenu;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationProvider;
import com.liferay.portal.kernel.portlet.LiferayPortletResponse;
import com.liferay.portal.kernel.portlet.LiferayWindowState;
import com.liferay.portal.kernel.settings.SystemSettingsLocator;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.ResourceBundleUtil;
import com.liferay.portal.kernel.util.Validator;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import javax.portlet.ActionRequest;
import javax.portlet.PortletURL;
import javax.portlet.RenderResponse;
import javax.portlet.RenderURL;
import javax.portlet.WindowStateException;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Marco Leo
 */
public class CPOptionDisplayContext {

	public CPOptionDisplayContext(
			ConfigurationProvider configurationProvider, CPOption cpOption,
			DDMFormFieldTypeServicesTracker ddmFormFieldTypeServicesTracker,
			HttpServletRequest httpServletRequest)
		throws PortalException {

		_configurationProvider = configurationProvider;
		_cpOption = cpOption;
		_ddmFormFieldTypeServicesTracker = ddmFormFieldTypeServicesTracker;
		cpRequestHelper = new CPRequestHelper(httpServletRequest);
	}

	public CPOption getCPOption() {
		return _cpOption;
	}

	public long getCPOptionId() {
		if (_cpOption == null) {
			return 0;
		}

		return _cpOption.getCPOptionId();
	}

	public CreationMenu getCreationMenu() throws Exception {
		CreationMenu creationMenu = new CreationMenu();

		LiferayPortletResponse liferayPortletResponse =
			cpRequestHelper.getLiferayPortletResponse();

		RenderURL renderURL = liferayPortletResponse.createRenderURL();

		renderURL.setParameter("mvcRenderCommandName", "addCPOption");
		renderURL.setParameter("backURL", cpRequestHelper.getCurrentURL());
		renderURL.setWindowState(LiferayWindowState.POP_UP);

		creationMenu.addDropdownItem(
			dropdownItem -> {
				dropdownItem.setHref(renderURL.toString());
				dropdownItem.setLabel("add-option-template");
				dropdownItem.setTarget("modal");
			});

		return creationMenu;
	}

	public String getDDMFormFieldTypeLabel(
		DDMFormFieldType ddmFormFieldType, Locale locale) {

		Map<String, Object> ddmFormFieldTypeProperties =
			_ddmFormFieldTypeServicesTracker.getDDMFormFieldTypeProperties(
				ddmFormFieldType.getName());

		String label = MapUtil.getString(
			ddmFormFieldTypeProperties, "ddm.form.field.type.label");

		try {
			ResourceBundle resourceBundle = ResourceBundleUtil.getBundle(
				"content.Language", locale, ddmFormFieldType.getClass());

			if (Validator.isNotNull(label)) {
				return LanguageUtil.get(resourceBundle, label);
			}
		}
		catch (MissingResourceException missingResourceException) {
			if (_log.isWarnEnabled()) {
				_log.warn(missingResourceException, missingResourceException);
			}
		}

		return ddmFormFieldType.getName();
	}

	public List<DDMFormFieldType> getDDMFormFieldTypes()
		throws PortalException {

		List<DDMFormFieldType> ddmFormFieldTypes =
			_ddmFormFieldTypeServicesTracker.getDDMFormFieldTypes();

		CPOptionConfiguration cpOptionConfiguration =
			_configurationProvider.getConfiguration(
				CPOptionConfiguration.class,
				new SystemSettingsLocator(CPConstants.CP_OPTION_SERVICE_NAME));

		String[] ddmFormFieldTypesAllowed =
			cpOptionConfiguration.ddmFormFieldTypesAllowed();

		return DDMFormFieldTypeUtil.getDDMFormFieldTypesAllowed(
			ddmFormFieldTypes, ddmFormFieldTypesAllowed);
	}

	public List<HeaderActionModel> getHeaderActionModels()
		throws PortalException {

		List<HeaderActionModel> headerActionModels = new ArrayList<>();

		RenderResponse renderResponse = cpRequestHelper.getRenderResponse();

		RenderURL cancelURL = renderResponse.createRenderURL();

		HeaderActionModel cancelHeaderActionModel = new HeaderActionModel(
			null, cancelURL.toString(), null, "cancel");

		headerActionModels.add(cancelHeaderActionModel);

		String publishButtonLabel = "publish";

		String additionalClasses = "btn-primary";

		HeaderActionModel publishHeaderActionModel = new HeaderActionModel(
			additionalClasses, renderResponse.getNamespace() + "fm", null, null,
			publishButtonLabel);

		headerActionModels.add(publishHeaderActionModel);

		return headerActionModels;
	}

	public List<ClayDataSetActionDropdownItem>
			getOptionClayDataSetActionDropdownItems()
		throws PortalException {

		RenderResponse renderResponse = cpRequestHelper.getRenderResponse();

		RenderURL portletURL = renderResponse.createRenderURL();

		portletURL.setParameter("mvcRenderCommandName", "editOption");
		portletURL.setParameter("redirect", cpRequestHelper.getCurrentURL());
		portletURL.setParameter("cpOptionId", "{id}");
		portletURL.setParameter(
			"screenNavigationCategoryKey",
			CPDefinitionScreenNavigationConstants.CATEGORY_KEY_DETAILS);

		List<ClayDataSetActionDropdownItem> clayDataSetActionDropdownItems =
			getClayDataSetActionDropdownItems(portletURL.toString(), false);

		clayDataSetActionDropdownItems.add(
			new ClayDataSetActionDropdownItem(
				_getManagePriceListPermissionsURL(), null, "permissions",
				LanguageUtil.get(cpRequestHelper.getRequest(), "permissions"),
				"get", "permissions", "modal-permissions"));

		return clayDataSetActionDropdownItems;
	}

	public CreationMenu getOptionValueCreationMenu(long cpOptionId)
		throws Exception {

		CreationMenu creationMenu = new CreationMenu();

		LiferayPortletResponse liferayPortletResponse =
			cpRequestHelper.getLiferayPortletResponse();

		RenderURL renderURL = liferayPortletResponse.createRenderURL();

		renderURL.setParameter("mvcRenderCommandName", "addCPOptionValue");
		renderURL.setParameter("backURL", cpRequestHelper.getCurrentURL());
		renderURL.setParameter("cpOptionId", String.valueOf(cpOptionId));
		renderURL.setWindowState(LiferayWindowState.POP_UP);

		creationMenu.addDropdownItem(
			dropdownItem -> {
				dropdownItem.setHref(renderURL.toString());
				dropdownItem.setLabel("add-option-value-template");
				dropdownItem.setTarget("modal");
			});

		return creationMenu;
	}

	public boolean hasValues(CPOption cpOption) {
		if (_hasDDMFormFieldTypeProperties(
				cpOption.getDDMFormFieldTypeName()) &&
			_isListFieldTypeDataDomain(cpOption.getDDMFormFieldTypeName())) {

			return true;
		}

		return false;
	}

	protected List<ClayDataSetActionDropdownItem>
		getClayDataSetActionDropdownItems(
			String portletURL, boolean sidePanel) {

		List<ClayDataSetActionDropdownItem> clayDataSetActionDropdownItems =
			new ArrayList<>();

		ClayDataSetActionDropdownItem clayDataSetActionDropdownItem =
			new ClayDataSetActionDropdownItem(
				portletURL, "pencil", "edit",
				LanguageUtil.get(cpRequestHelper.getRequest(), "edit"), "get",
				null, null);

		if (sidePanel) {
			clayDataSetActionDropdownItem.setTarget("sidePanel");
		}

		clayDataSetActionDropdownItems.add(clayDataSetActionDropdownItem);

		clayDataSetActionDropdownItems.add(
			new ClayDataSetActionDropdownItem(
				null, "trash", "delete",
				LanguageUtil.get(cpRequestHelper.getRequest(), "delete"),
				"delete", "delete", "headless"));

		return clayDataSetActionDropdownItems;
	}

	protected final CPRequestHelper cpRequestHelper;

	private String _getManagePriceListPermissionsURL() throws PortalException {
		PortletURL portletURL = PortalUtil.getControlPanelPortletURL(
			cpRequestHelper.getRequest(),
			"com_liferay_portlet_configuration_web_portlet_" +
				"PortletConfigurationPortlet",
			ActionRequest.RENDER_PHASE);

		portletURL.setParameter("mvcPath", "/edit_permissions.jsp");
		portletURL.setParameter("redirect", cpRequestHelper.getCurrentURL());
		portletURL.setParameter("modelResource", CPOption.class.getName());
		portletURL.setParameter("modelResourceDescription", "{name}");
		portletURL.setParameter("resourcePrimKey", "{id}");

		try {
			portletURL.setWindowState(LiferayWindowState.POP_UP);
		}
		catch (WindowStateException windowStateException) {
			throw new PortalException(windowStateException);
		}

		return portletURL.toString();
	}

	private boolean _hasDDMFormFieldTypeProperties(
		String ddmFormFieldTypeName) {

		if (_ddmFormFieldTypeServicesTracker.getDDMFormFieldTypeProperties(
				ddmFormFieldTypeName) == null) {

			return false;
		}

		return true;
	}

	private boolean _isListFieldTypeDataDomain(String ddmFormFieldTypeName) {
		Map<String, Object> properties =
			_ddmFormFieldTypeServicesTracker.getDDMFormFieldTypeProperties(
				ddmFormFieldTypeName);

		String fieldTypeDataDomain = MapUtil.getString(
			properties, "ddm.form.field.type.data.domain");

		if (Validator.isNotNull(fieldTypeDataDomain) &&
			fieldTypeDataDomain.equals("list")) {

			return true;
		}

		return false;
	}

	private static final Log _log = LogFactoryUtil.getLog(
		CPOptionDisplayContext.class);

	private final ConfigurationProvider _configurationProvider;
	private CPOption _cpOption;
	private final DDMFormFieldTypeServicesTracker
		_ddmFormFieldTypeServicesTracker;

}